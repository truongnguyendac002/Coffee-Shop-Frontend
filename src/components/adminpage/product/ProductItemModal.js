import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, Form, Input, InputNumber, Select } from 'antd';
import fetchWithAuth from '../../../helps/fetchWithAuth';
import summaryApi from '../../../common';

const AddItemModal = ({ visible, onClose, onSave, types, onAddType, editingItem }) => {
    const [form] = Form.useForm();
    const [isAddingType, setIsAddingType] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');

    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue({
                price: editingItem.price,
                stock: editingItem.stock,
                discount: editingItem.discount,
                type: editingItem.type?.name,
            });
        } else {
            form.resetFields();
        }
    }, [editingItem, form]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values, editingItem?.id);
            form.resetFields();
        });
    };

    const handleAddType = async () => {
        if (newTypeName.trim()) {
            try {
                const response = await fetchWithAuth(summaryApi.addType.url, {
                    method: summaryApi.addType.method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newTypeName }),
                });
                const result = await response.json();
                if (response && result.respCode === '000') {
                    onAddType(result.data);
                    setNewTypeName('');
                    setIsAddingType(false);
                } else {
                    console.error('Failed to add type:', result.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error adding type:', error);
            }
        }
    };

    return (
        <Modal
            title={editingItem ? "Cập nhật item" : "Thêm mới item"}
            open={visible}
            onCancel={onClose}
            onOk={handleSave}
            okText={editingItem ? "Cập nhật" : "Lưu"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Vui lòng nhập giảm giá' }]}
                >
                    <InputNumber min={0} max={100} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
                >
                    <Select
                        placeholder="Chọn loại sản phẩm"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Button
                                    type="text"
                                    style={{ width: '100%', textAlign: 'left' }}
                                    onClick={() => setIsAddingType(true)}
                                >
                                    + Thêm loại mới
                                </Button>
                            </>
                        )}
                    >
                        {types.map((type) => (
                            <Select.Option key={type.id} value={type.name}>
                                {type.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>

            {isAddingType && (
                <Modal
                    title="Thêm loại mới"
                    open={isAddingType}
                    onCancel={() => setIsAddingType(false)}
                    onOk={handleAddType}
                    okText="Lưu"
                    cancelText="Hủy"
                >
                    <Input
                        placeholder="Nhập tên loại mới"
                        value={newTypeName}
                        onChange={(e) => setNewTypeName(e.target.value)}
                    />
                </Modal>
            )}
        </Modal>
    );
};


const ProductItemsModal = ({ product, visible, onClose }) => {
    const [productItems, setProductItems] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const fetchProductItems = async () => {
            setLoading(true);
            try {
                const response = await fetchWithAuth(
                    summaryApi.productItem.url + product.id,
                    {
                        method: summaryApi.productItem.method,
                    }
                );
                const data = await response.json();
                if (data && data.respCode === '000') {
                    setProductItems(data.data);
                }
            } catch (error) {
                console.error('Error fetching product items:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await fetchWithAuth(summaryApi.getAllType.url, {
                    method: summaryApi.getAllType.method,
                });
                const data = await response.json();
                if (data && data.respCode === '000') {
                    setTypes(data.data);
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        if (product && visible) {
            fetchProductItems();
            fetchTypes();
        }
    }, [product, visible]);

    const handleAddNewItem = (newItem) => {
        const { price, stock, discount, type } = newItem;
        console.log(newItem);
        const selectedType = types.find((t) => t.name === type); // Tìm đối tượng type đầy đủ
        if (!selectedType) {
            console.error('Type không hợp lệ:', type);
            return;
        }

        const fetchAddItem = async () => {
            try {
                const response = await fetchWithAuth(summaryApi.addProductItem.url, {
                    method: summaryApi.addProductItem.method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ProductId: product.id,
                        Price: price,
                        Stock: stock,
                        Discount: discount,
                        TypeId: selectedType.id,
                    }),
                });
                const data = await response.json();
                if (data && data.respCode === '000') {
                    setProductItems((prevItems) => [...prevItems, data.data]);
                    setIsAdding(false);

                }
                else {
                    console.error('Failed to add new item:', data || 'Failed to add new item: Unknown error');
                }
            } catch (error) {
                console.error('Error adding new item:', error);
            }
        };
        fetchAddItem();
    };
    const handleSaveItem = (item, itemId) => {
        if (itemId) {
            // Update existing item
            const fetchUpdateItem = async () => {
                try {
                    const response = await fetchWithAuth(
                        `${summaryApi.updateProductItem.url}${itemId}`,
                        {
                            method: summaryApi.updateProductItem.method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                Price: item.price,
                                Stock: item.stock,
                                Discount: item.discount,
                                TypeId: types.find((t) => t.name === item.type)?.id,
                                ProductId: product.id,
                             }),
                        }
                    );
                    const data = await response.json();
                    if (data && data.respCode === '000') {
                        setProductItems((prevItems) =>
                            prevItems.map((i) => (i.id === itemId ? data.data : i))
                        );
                        setEditingItem(null);
                        setIsAdding(false);
                    }
                } catch (error) {
                    console.error('Error updating item:', error);
                }
            };
            fetchUpdateItem();
        } else {
            handleAddNewItem(item);
        }
    };


    const handleAddType = (type) => {
        setTypes((prevTypes) => [...prevTypes, type]);
    };

    const handleDeleteItem = (item) => {
        const fetchDeleteItem = async () => {
            try {
                const response = await fetchWithAuth(
                    summaryApi.deleteProductItem.url + item.id,
                    {
                        method: summaryApi.deleteProductItem.method,
                    }
                );
                const data = await response.json();
                if (data && data.respCode === '000') {
                    setProductItems((prevItems) =>
                        prevItems.filter((i) => i.id !== item.id)
                    );
                } else {
                    console.error('Failed to delete item:', data || 'Unknown error');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        };
        fetchDeleteItem();
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Type',
            dataIndex: ['type', 'name'],
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => {
                            setEditingItem(record);
                            setIsAdding(true);
                        }}
                        className='mr-2'
                    >
                        Update
                    </Button>

                    <Button onClick={() => handleDeleteItem(record)} type="primary" danger>
                        Delete
                    </Button>
                </>
            ),
        }
    ];

    return (
        <>
            <Modal
                title={`Product Items - ${product?.name}`}
                open={visible}
                onCancel={onClose}
                footer={[
                    <Button key="add" type="primary" onClick={() => setIsAdding(true)}>
                        Thêm mới item
                    </Button>,
                ]}
                width={800}
            >
                <Table
                    rowKey="id"
                    dataSource={productItems}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                />
            </Modal>
            <AddItemModal
                visible={isAdding}
                onClose={() => {
                    setEditingItem(null);
                    setIsAdding(false);
                }}
                onSave={handleSaveItem}
                types={types}
                onAddType={handleAddType}
                editingItem={editingItem}
            />
        </>
    );
};

export default ProductItemsModal;