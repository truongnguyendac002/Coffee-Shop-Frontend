import React, { useState } from 'react';
import { Button, Radio, Modal, Input, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const ShippingAddress = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);

    // const [addresses, setAddresses] = useState([
    const [addresses] = useState([
        {
            id: 1,
            name: 'Imran Khan',
            phone: '123456789',
            address: 'Museum of Rajas, Sylhet Sadar, Sylhet 3100.',
            city: 'Sylhet',
            isDefault: false,
        },
        {
            id: 2,
            name: 'Imran Khan',
            phone: '987654321',
            address: 'Al Hamra City (10th Floor), Hazrat Shahjalal Road, Sylhet, Bangladesh',
            city: 'Sylhet',
            isDefault: true,
        },
    ]);

    const handleSelectAddress = (id) => {
        setSelectedAddress(id);
    };

    const handleAddingAddress = () => {
        setEditingAddress(null);
        setIsModalVisible(true);
    };

    const showModal = (address) => {
        setEditingAddress(address);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setEditingAddress(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingAddress(null);
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
                    <div
                        key={address.id}
                        className={`p-4 border rounded-md flex justify-between items-start space-x-4 ${selectedAddress === address.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                            }`}
                    >
                        <Radio.Group onChange={() => handleSelectAddress(address.id)} value={selectedAddress}>
                            <Radio value={address.id} />
                        </Radio.Group>
                        <div className="flex-1" onClick={() => handleSelectAddress(address.id)}>
                            <h3 className="font-semibold">{address.name}</h3>
                            <p className="text-gray-700">{address.address}</p>
                            <div className="flex text-sm text-gray-500 mt-2">
                                <span>{address.city}</span>
                                {address.isDefault && <span className="mx-2">| Default Address</span>}
                            </div>
                        </div>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            className="text-gray-500"
                            onClick={() => showModal(address)}
                        >
                            Edit
                        </Button>
                    </div>
                ))}
            </div>

            <Modal
                title={editingAddress ? "Edit Address" : "Add New Address"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Save
                    </Button>,
                ]}
            >
                <Input placeholder="Name" value={editingAddress?.name || ''} className="mb-3" />
                <Input placeholder="Phone" value={editingAddress?.phone || ''} className="mb-3" />
                <Input.TextArea placeholder="Address (Area and street)" value={editingAddress?.address || ''} className="mb-3" />
                <Input placeholder="City/District/Town" value={editingAddress?.city || ''} className="mb-3" />
                <Checkbox checked={editingAddress?.isDefault}>Set as default address</Checkbox>
            </Modal>
        </div>
    );
};

export default ShippingAddress;
