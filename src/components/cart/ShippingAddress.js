import React, { useState, useEffect } from 'react';
import { Button, Radio, Modal, Input, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import summaryApi from '../../common';
import { useSelector } from 'react-redux';
import fetchWithAuth from '../../helps/fetchWithAuth';

const ShippingAddress = ({addresses, setAddresses}) => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState({});
    const [errors, setErrors] = useState({});

    const user = useSelector((state) => state?.user?.user);

    useEffect(() => {
        
    }, [user]);

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
        const { recieverName, recieverPhone, location } = editingAddress;
        const newErrors = {};

        if (!recieverName) newErrors.recieverName = "Receiver Name is required";
        if (!recieverPhone) newErrors.recieverPhone = "Receiver Phone is required";
        if (!location) newErrors.location = "Location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (editingAddress.id) {
                await fetchWithAuth(summaryApi.updateShippingAddress.url, {
                    method: summaryApi.updateShippingAddress.method,
                    body: JSON.stringify({ ...editingAddress, user_id: user.id }),
                });
                message.success("Address updated successfully!");
            } else {
                await fetchWithAuth(summaryApi.addShippingAddress.url, {
                    method: summaryApi.addShippingAddress.method,
                    body: JSON.stringify({ ...editingAddress, user_id: user.id }),
                });
                message.success("Address added successfully!");
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
                            <h3 className="font-semibold">{address.recieverName}</h3>
                            <p className="text-gray-700">{address.location}</p>
                            <p className="text-gray-500">Phone: {address.recieverPhone}</p>
                        </div>
                        <Button type="link" icon={<EditOutlined />} className="text-gray-500" onClick={() => showModal(address)}>
                            Edit
                        </Button>
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
                    value={editingAddress?.recieverName || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, recieverName: e.target.value }))}
                    className={`${errors.recieverName ? 'border-red-500' : ''}`}
                />
                {errors.recieverName && <p className="text-red-500 text-sm">{errors.recieverName}</p>}

                <h3 className="mt-3 font-semibold ">Receiver phone: </h3>
                <Input
                    placeholder="Receiver Phone"
                    value={editingAddress?.recieverPhone || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, recieverPhone: e.target.value }))}
                    className={` ${errors.recieverPhone ? 'border-red-500' : ''}`}
                />
                {errors.recieverPhone && <p className="text-red-500 text-sm">{errors.recieverPhone}</p>}

                <h3 className="mt-3 font-semibold ">Location: </h3>
                <Input.TextArea
                    placeholder="Location (Area and street)"
                    value={editingAddress?.location || ''}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, location: e.target.value }))}
                    className={` ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

                {/* <Checkbox
                    checked={editingAddress?.status === 'ACTIVE'}
                    onChange={(e) => setEditingAddress((prev) => ({ ...prev, status: e.target.checked ? 'ACTIVE' : 'INACTIVE' }))}
                >
                    Set as active
                </Checkbox> */}
            </Modal>
        </div>
    );
};

export default ShippingAddress;
