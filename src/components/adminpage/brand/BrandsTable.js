import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import fetchWithAuth from '../../../helps/fetchWithAuth';
import summaryApi from '../../../common';

const BrandTable = ({ brands, setBrands }) => {
    // const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [currentBrand, setCurrentBrand] = useState(null);

    useEffect(() => {
        // const fetchBrands = async () => {
        //     const response = await fetchWithAuth(summaryApi.getAllBrand.url, {
        //         method: summaryApi.allBrand.method,
        //     });
        //     const data = await response.json();
        //     if (data.respCode === '000' && data.data) {
        //         setBrands(data.data);
        //     } else {
        //         console.log(data);
        //     }
        // };
        // fetchBrands();
    }, []);

    const handleAddOrUpdateBrand = (values) => {
        const url = currentBrand ? `${summaryApi.updateBrand.url}/${currentBrand.id}` : summaryApi.addBrand.url;
        const method = currentBrand ? summaryApi.updateBrand.method : summaryApi.addBrand.method;
        console.log(url, method);

        const fetchAddOrUpdateBrand = async () => {
            const response = await fetchWithAuth(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: values.name }),
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                if (currentBrand) {
                    setBrands(brands.map(brand => brand.id === currentBrand.id ? data.data : brand));
                } else {
                    setBrands([...brands, data.data]);
                }
                setIsModalVisible(false);
                form.resetFields();
                setCurrentBrand(null);
            } else {
                console.log(data);
            }
        };
        fetchAddOrUpdateBrand();
    };

    const handleDeleteBrand = (id) => {
        const fetchDeleteBrand = async () => {
            const response = await fetchWithAuth(`${summaryApi.deleteBrand.url}/${id}`, {
                method: summaryApi.deleteBrand.method,
            });
            const data = await response.json();
            if (data.respCode === '000') {
                setBrands(brands.filter(brand => brand.id !== id));
            } else {
                console.log(data);
            }
        };
        fetchDeleteBrand();
    };

    const columns = [
        {
            title: 'Mã nhãn hàng',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên nhãn hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            setCurrentBrand(record);
                            form.setFieldsValue({ name: record.name });
                            setIsModalVisible(true);
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhãn hàng này không?"
                        onConfirm={() => handleDeleteBrand(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-start items-center mb-4">
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentBrand(null);
                        form.resetFields();
                        setIsModalVisible(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    icon={<PlusOutlined />}
                >
                    Thêm nhãn hàng mới
                </Button>
            </div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={brands}
                className="rounded-lg overflow-hidden"
            />

            <Modal
                title={currentBrand ? "Chỉnh sửa nhãn hàng" : "Thêm nhãn hàng mới"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className="rounded-lg"
            >
                <Form form={form} onFinish={handleAddOrUpdateBrand} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên nhãn hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhãn hàng!' }]}
                    >
                        <Input placeholder="Nhập tên nhãn hàng" className="rounded-md" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                        {currentBrand ? "Cập nhật nhãn hàng" : "Thêm nhãn hàng"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default BrandTable;
