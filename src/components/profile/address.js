import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import summaryApi from '../../common';
import { useSelector } from 'react-redux';
import fetchWithAuth from '../../helps/fetchWithAuth';

const ShippingAddress = ({ setLoading }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState({});
    const [errors, setErrors] = useState({});
    const [addresses, setAddresses] = useState([]);

    const user = useSelector((state) => state?.user?.user);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const response = await fetchWithAuth(summaryApi.getAddressByUser.url, {
                    method: summaryApi.getAddressByUser.method,
                });
                const responseData = await response.json();

                if (responseData.respCode === "000" && responseData.data) {
                    const addresses = responseData.data;
                    localStorage.setItem("shipping-address", JSON.stringify(addresses));
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
            finally {
                setLoading(false);
            }
        };
        const addressesData = localStorage.getItem("shipping-address");
        if (addressesData) {
            setAddresses(JSON.parse(addressesData));
        }
        else {
            fetchAddresses();
            setLoading(false);

        }
    }, [setLoading]);


    const handleAddingAddress = () => {
        setEditingAddress({});
        setErrors({});
        setIsModalVisible(true);
    };

    const showModal = (address) => {
        setEditingAddress(address);
        setErrors({});
        setIsModalVisible(true);
    };

    const handleSaveAddress = async () => {
        const { receiverName, receiverPhone, location } = editingAddress;
        const newErrors = {};

        if (!receiverName) newErrors.receiverName = "Receiver Name is required";
        if (!receiverPhone) newErrors.receiverPhone = "Receiver Phone is required";
        if (!location) newErrors.location = "Location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const fetchUpdateAddress = async (requestMethod) => {
                setLoading(true);
                try {
                    const response = await fetchWithAuth(
                        summaryApi.updateShippingAddress.url,
                        {
                            method: requestMethod,
                            body: JSON.stringify({
                                id: editingAddress.id,
                                receiver_name: editingAddress.receiverName,
                                receiver_phone: editingAddress.receiverPhone,
                                location: editingAddress.location,
                                user_id: user.id,
                                status: "ACTIVE",
                            }),
                        }
                    );
                    const responseData = await response.json();
                    if (responseData.respCode === "000") {
                        return responseData.data;
                    }
                    else {
                        message.error("Failed to process address.", responseData);
                    }
                } catch (error) {
                    message.error("Error when process address:", error);
                }finally{
                setLoading(false);

                }
                return null;
            }

            if (editingAddress.id) {
                const updatedAddress = await fetchUpdateAddress(summaryApi.updateShippingAddress.method);
                if (updatedAddress) {
                    const updatedAddresses = addresses.map((address) => address.id === updatedAddress.id ? updatedAddress : address);
                    setAddresses(updatedAddresses);
                    localStorage.setItem("shipping-address", JSON.stringify(updatedAddresses));
                    message.success("Address updated successfully!");
                }
            } else {
                const newAddress = await fetchUpdateAddress(summaryApi.addShippingAddress.method);
                if (newAddress) {
                    const updatedAddresses = [...addresses, newAddress];
                    setAddresses(updatedAddresses);
                    localStorage.setItem("shipping-address", JSON.stringify(updatedAddresses));
                    message.success("Address added successfully!");
                }
            }

            setIsModalVisible(false);
            setEditingAddress({});
            setErrors({});
        } catch (error) {
            console.error("Error saving address:", error);
            message.error("Failed to save address.");
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingAddress({});
        setErrors({});
    };

    const handleDeleteAddress = (id) => {
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        const fetchDeleteAddress = async () => {
            setLoading(true);
            try {
                const response = await fetchWithAuth(
                    summaryApi.deleteShippingAddress.url + id,
                    {
                        method: summaryApi.deleteShippingAddress.method,
                    }
                );
                const responseData = await response.json();
                if (responseData.respCode === "000") {
                    setAddresses(updatedAddresses);
                    localStorage.setItem("shipping-address", JSON.stringify(updatedAddresses));
                    message.success("Address deleted successfully!");
                }
                else {
                    console.error("Failed to process address:", responseData);
                }
            } catch (error) {
                console.error("Error deleting address:", error);
            }
            setLoading(false);

        }
        fetchDeleteAddress();
    };


    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your address list</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="mb-4">
                    {addresses.length === 0 ? (
                        <p className="text-sm text-gray-600">Do you want to add new address?</p>
                    ) : (
                        <p className="text-sm text-gray-600">Manage your addresses here!</p>
                    )}
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddingAddress}
                    className="w-full sm:w-auto"
                >
                    Add a new address
                </Button>
            </div>

            <div className="space-y-4">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className={`p-4 border rounded-md flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4`}
                    >
                        <div className="flex-1">
                            <h3>
                                <span className="font-semibold">Name: </span> {address.receiverName}
                            </h3>
                            <p>
                                <span className="font-semibold">Location: </span> {address.location}
                            </p>
                            <p>
                                <span className="font-semibold">Phone: </span> {address.receiverPhone}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                className="text-gray-500"
                                onClick={() => showModal(address)}
                            >
                                Edit
                            </Button>
                            <Popconfirm
                                title="Are you sure to delete this address?"
                                onConfirm={() => handleDeleteAddress(address.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" icon={<DeleteOutlined />} className="text-red-500">
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title={editingAddress?.id ? "Edit Address" : "Add New Address"}
                open={isModalVisible}
                onOk={handleSaveAddress}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSaveAddress}>
                        Save
                    </Button>,
                ]}
            >
                <h3 className="mt-3 font-semibold ">Receiver name: </h3>
                <Input
                    placeholder="Receiver Name"
                    value={editingAddress?.receiverName || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, receiverName: e.target.value }))}
                    className={`${errors.receiverName ? 'border-red-500' : ''}`}
                />
                {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName}</p>}

                <h3 className="mt-3 font-semibold ">Receiver phone: </h3>
                <Input
                    placeholder="Receiver Phone"
                    value={editingAddress?.receiverPhone || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, receiverPhone: e.target.value }))}
                    className={` ${errors.receiverPhone ? 'border-red-500' : ''}`}
                />
                {errors.receiverPhone && <p className="text-red-500 text-sm">{errors.receiverPhone}</p>}

                <h3 className="mt-3 font-semibold ">Location: </h3>
                <Input.TextArea
                    placeholder="Location (Area and street)"
                    value={editingAddress?.location || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, location: e.target.value }))}
                    className={` ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

            </Modal>
        </div>
    );
};

export default ShippingAddress;
