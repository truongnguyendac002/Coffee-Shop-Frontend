import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const Info = ({ visible, data, onClose, onSave }) => {
    console.log("data", data);

    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
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
                    

                >
                    <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                   
                >
                    <Input  placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    
                >
                    <Input placeholder="Password" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Info;