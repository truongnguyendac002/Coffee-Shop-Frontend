import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import Password from "antd/es/input/Password";

const Info = ({ visible, data, onClose, onSave }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            const defaultData = {
                name: data.name || "",
                phone: data.phone || "",
                password: "",
                confirmPassword: "",
            };
            form.setFieldsValue(defaultData);

        }
    }, [data, form]);

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                onSave(values);
                onClose();
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    return (
        <Modal
            open={visible}
            title="Edit Account Info"
            onCancel={onClose}
            onOk={handleSave}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter your name" },
                    ]}
                >
                    <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        { required: true, message: "Please enter your phone number" },
                    ]}

                >
                    <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"

                >
                    <Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match!"));
                            },
                        }),
                    ]}

                >
                    <Password placeholder="Confirm Password" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Info;