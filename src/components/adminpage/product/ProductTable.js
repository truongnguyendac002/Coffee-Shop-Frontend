import { useState, useRef } from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Space,
    Table,
    Popconfirm,
    Modal,
    Form,
    Select,
} from 'antd';
import Highlighter from 'react-highlight-words';
import fetchWithAuth from '../../../helps/fetchWithAuth';
import summaryApi from '../../../common';

const { Option } = Select;

const ProductTable = ({ products, setProducts, categories, brands, setCategories, setBrands }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newBrandName, setNewBrandName] = useState('');
    const searchInput = useRef(null);

    const [currentProduct, setCurrentProduct] = useState(null);

    const [form] = Form.useForm();

    console.log("render");
    console.log(currentProduct);
    console.log(isModalVisible);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
        setSearchText('');
    };
    const closeModel = () => {
        console.log("closeModel 1");
        console.log(currentProduct);
        console.log(isModalVisible);
        setCurrentProduct(null);
        setIsModalVisible(false);
        form.resetFields();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleDelete = async (id) => {
        const response = await fetchWithAuth(summaryApi.deleteProduct.url + id, {
            method: summaryApi.deleteProduct.method,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.respCode === '000') {
            setProducts(products.filter((product) => product.id !== id));
        } else {
            console.log(data);
        }
    };

    const showModal = (product=null) => {
        setCurrentProduct(product);   
        setIsModalVisible(true);
        if (product) {
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                category: product.category?.id,
                brand: product.brand?.id,
            });
        } else {
            form.resetFields(); // Xóa toàn bộ giá trị nếu là "Add New Product"
        }    
    }
    const handleUpdateProduct = (values) => {
        const fetchUpdateProduct = async () => {
            const response = await fetchWithAuth(summaryApi.updateProduct.url + currentProduct.id, {
                method: summaryApi.updateProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: values.name,
                    Description: values.description,
                    BrandId: values.brand,
                    CategoryId: values.category,
                }),
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                const updatedProducts = products.map((product) => {
                    if (product.id === currentProduct.id) {
                        return data.data;
                    }
                    return product;
                });
                setProducts(updatedProducts);
                form.resetFields();
                // setIsModalVisible(false);
                closeModel();
            } else {
                console.log(data);
            }
        };
        fetchUpdateProduct();
    };

    const handleAddProduct = (values) => {
        const fetchAddProduct = async () => {
            console.log(values);
            const response = await fetchWithAuth(summaryApi.addProduct.url, {
                method: summaryApi.addProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: values.name,
                    Description: values.description,
                    BrandId: values.brand,
                    CategoryId: values.category,
                }),
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                setProducts([...products, data.data]);
                form.resetFields();
                // setIsModalVisible(false);
                closeModel();
            } else {
                console.log(data);
            }
        };
        fetchAddProduct();
    };


    const handleAddCategory = () => {
        const fetchAddCategory = async () => {
            const response = await fetchWithAuth(summaryApi.addCategory.url, {
                method: summaryApi.addCategory.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName }),
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                setCategories([...categories, data.data]);
                setNewCategoryName('');
                setIsCategoryModalVisible(false);
            } else {
                console.log(data);
            }
        };
        fetchAddCategory();
    };


    const handleAddBrand = () => {
        const fetchAddBrand = async () => {
            const response = await fetchWithAuth(summaryApi.addBrand.url, {
                method: summaryApi.addBrand.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newBrandName }),
            });
            const data = await response.json();
            if (data.respCode === '000' && data.data) {
                setBrands([...brands, data.data]);
                setNewBrandName('');
                setIsBrandModalVisible(false);
            } else {
                console.log(data);
            }
        }
        fetchAddBrand();
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            key: 'categoryName',
            render: (text, record) => record.category?.name || 'N/A',
        },
        {
            title: 'Brand',
            dataIndex: ['brand', 'name'],
            key: 'brandName',
            render: (text, record) => record.brand?.name || 'N/A',
        },
        {
            title: 'Description',
            dataIndex: ['description'],
            key: 'descriptionName',
            render: (text, record) => record.description || 'N/A',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => showModal(record)}>
                        Edit
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
                className="mb-4"
            >
                Add New Product
            </Button>
            <Table rowKey="id" columns={columns} dataSource={products} />
            <Modal
                title={currentProduct ? "Update Product" : "Add New Product"}  // Change title based on action
                open={isModalVisible}
                onCancel={() => closeModel()}
                footer={null}
            >
                <Form form={form} onFinish={currentProduct?handleAddProduct:handleUpdateProduct} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please enter the product name!' }]}
                        initialValue={currentProduct?.name}  
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Product Description"
                        initialValue={currentProduct?.description} 

                    >
                        <Input placeholder="Enter product description" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                        initialValue={currentProduct?.category?.id} 

                    >
                        <Select
                            placeholder="Select a category"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Button
                                        type="text"
                                        className="w-full text-left"
                                        onClick={() => setIsCategoryModalVisible(true)}
                                    >
                                        + Add New Category
                                    </Button>
                                </>
                            )}
                        >
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="brand"
                        label="Brand"
                        rules={[{ required: true, message: 'Please select a brand!' }]}
                        initialValue={currentProduct?.brand?.id}
                    >
                        <Select
                            placeholder="Select a brand"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Button
                                        type="text"
                                        className="w-full text-left"
                                        onClick={() => setIsBrandModalVisible(true)}
                                    >
                                        + Add New Brand
                                    </Button>
                                </>
                            )}
                        >
                            {brands.map((brand) => (
                                <Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                
                    <Button type="primary" htmlType="submit" className="w-full">
                        {currentProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                </Form>
            </Modal>

            {/* Modal for adding category */}
            <Modal
                title="Add New Category"
                open={isCategoryModalVisible}
                onCancel={() => setIsCategoryModalVisible(false)}
                footer={null}
            >
                <Input
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                    type="primary"
                    onClick={handleAddCategory}
                    className="mt-2"
                    disabled={!newCategoryName.trim()}
                >
                    Add Category
                </Button>
            </Modal>

            {/* Modal for adding brand */}
            <Modal
                title="Add New Brand"
                open={isBrandModalVisible}
                onCancel={() => setIsBrandModalVisible(false)}
                footer={null}
            >
                <Input
                    placeholder="Enter brand name"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                />
                <Button
                    type="primary"
                    onClick={handleAddBrand}
                    className="mt-2"
                    disabled={!newBrandName.trim()}
                >
                    Add Brand
                </Button>
            </Modal>
        </div>
    );
};

export default ProductTable;
