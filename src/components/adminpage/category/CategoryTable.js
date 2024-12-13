import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Image, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import fetchWithAuth from '../../../helps/fetchWithAuth';
import summaryApi from '../../../common';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetchWithAuth(summaryApi.allCategory.url, {
                method: summaryApi.allCategory.method,
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                setCategories(data.data);
            } else {
                console.log(data);
            }
        };
        fetchCategories();
    }, []);

    const handleAddOrUpdateCategory = (values) => {
        const api = currentCategory ? summaryApi.updateCategory : summaryApi.addCategory;
        const url = currentCategory ? `${api.url}/${currentCategory.id}` : api.url;
        const method = currentCategory ? api.method : api.method;

        const fetchAddOrUpdateCategory = async () => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("description", values.description);
                if (values.image && values.image[0]) {
                    formData.append('image', values.image[0].originFileObj);
                }

                const response = await fetchWithAuth(url, {
                    method: method,
                    body: formData
                });
                const data = await response.json();
                if (data.respCode === '000' && data.data) {
                    if (currentCategory) {
                        setCategories(categories.map(category => 
                            category.id === currentCategory.id ? data.data : category
                        ));
                    } else {
                        setCategories([...categories, data.data]);
                    }
                    setIsModalVisible(false);
                    form.resetFields();
                    setCurrentCategory(null);
                    setImageUrl('');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchAddOrUpdateCategory();
    };

    const handleDeleteCategory = (id) => {
        const fetchDeleteCategory = async () => {
            const response = await fetchWithAuth(`${summaryApi.deleteCategory.url}/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                method: summaryApi.deleteCategory.method,
            });
            const data = await response.json();
            if (data.respCode === '000') {
                setCategories(categories.filter(category => category.id !== id));
            }
        };
        fetchDeleteCategory();
    };

    const columns = [
        {
            title: 'Mã danh mục',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ảnh bìa',
            key: 'image',
            render: (_, record) => (
                <Image
                    src={record.defaultImageUrl}
                    alt={record.name}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                />
            ),
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            setCurrentCategory(record);
                            form.setFieldsValue({
                                name: record.name,
                                description: record.description,
                            });
                            setImageUrl(record.defaultImageUrl);
                            setIsModalVisible(true);
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này không?"
                        onConfirm={() => handleDeleteCategory(record.id)}
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
                        setCurrentCategory(null);
                        form.resetFields();
                        setImageUrl('');
                        setIsModalVisible(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    icon={<PlusOutlined />}
                >
                    Thêm danh mục mới
                </Button>
            </div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={categories}
                className="rounded-lg overflow-hidden"
            />

            <Modal
                title={currentCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setCurrentCategory(null);
                    setImageUrl('');
                    form.resetFields();
                }}
                footer={null}
                className="rounded-lg"
            >
                <Form form={form} onFinish={handleAddOrUpdateCategory} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input placeholder="Nhập tên danh mục" className="rounded-md" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <Input.TextArea
                            placeholder="Nhập mô tả danh mục"
                            className="rounded-md"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Ảnh bìa"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            {!imageUrl && <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                            </div>}
                        </Upload>
                    </Form.Item>

                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Preview"
                            style={{ width: '100%', marginBottom: 16 }}
                        />
                    )}

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                        {currentCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryTable;