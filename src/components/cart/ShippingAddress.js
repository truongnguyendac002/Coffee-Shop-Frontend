import React, { useState, useEffect } from 'react';
import { Button, Radio, Modal, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import summaryApi from '../../common';
import { useSelector } from 'react-redux';
import fetchWithAuth from '../../helps/fetchWithAuth';

const ShippingAddress = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState({});
    const [errors, setErrors] = useState({});

    const [addresses, setAddresses] = useState([]);

    const user = useSelector((state) => state?.user?.user);

    useEffect(() => {
        const addressesData = localStorage.getItem("shipping-address");
        if (addressesData) {
            setAddresses(JSON.parse(addressesData));
        }
    }, []);

    const handleSelectAddress = (id) => {
        setSelectedAddress(id);
    };

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
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingAddress({});
        setErrors({});
    };

    const handleDeleteAddress = (id) => {
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        const fetchDeleteAddress = async () => {
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
        }
        fetchDeleteAddress();
    };


    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">1. Shipping, arrives between Mon, May 16—Tue, May 24</h2>
            <div className="flex justify-between">
                <div className="mb-4">
                    <p className="text-sm text-gray-600">Shipping address</p>
                    <p className="text-base font-medium mb-4">Where should we deliver your order?</p>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddingAddress}>
                        Add a new address
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {addresses.map((address) => (
                    <div key={address.id} className={`p-4 border rounded-md flex justify-between items-start space-x-4 ${selectedAddress === address.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                        <Radio.Group onChange={() => handleSelectAddress(address.id)} value={selectedAddress}>
                            <Radio value={address.id} />
                        </Radio.Group>
                        <div className="flex-1" onClick={() => handleSelectAddress(address.id)}>
                            <h3 className="font-semibold">{address.receiverName}</h3>
                            <p className="text-gray-700">{address.location}</p>
                            <p className="text-gray-500">Phone: {address.receiverPhone}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button type="link" icon={<EditOutlined />} className="text-gray-500" onClick={() => showModal(address)}>
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
