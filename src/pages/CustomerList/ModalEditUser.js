import { Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { useState } from 'react';
import { notification } from 'antd';
import request from '../../api/axios';

const ModalEdituser = (props) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Update profile failed',
            description: type === "success" ?
                'Update profile successful' : 'Please check all fields again!',
            duration: 1.5
        });
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const { Option } = Select;
    const data = props.userList[props.index]
    const handleOk = () => {
        props.setIsModalOpen(false);
        form.resetFields()
    };
    const handleCancel = () => {
        props.setIsModalOpen(false);
        form.resetFields()
    };
    const updateUser = (value) => {
        const json = JSON.stringify(value);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const formData = new FormData();
        formData.append('userDTO', blob)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            }
        }
        request.post("user/update", formData, config).then((res) => {
            openNotificationWithIcon("success")
            props.setChange(!props.change)
            form.resetFields()

        })
            .catch(() => {
                openNotificationWithIcon("error")
            })
    }
    const onFinish = (values) => {
        let userDTO = {
            userId: data?.userId,
            ...values,
            roleNames: typeof values.roleNames === "string" ? [values.roleNames] : values.roleNames,
        }
        updateUser(userDTO)
        props.setIsModalOpen(false);
    };
    const confirm = (e) => {
        let userDTO = {
            ...data,
            deleted: true
        }
        updateUser(userDTO)
        props.setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Modal title="Edit user" open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={900}>
                <Form {...layout} name="basic" onFinish={onFinish} validateMessages={validateMessages} form={form}>
                    <Form.Item name="username" label="userName" initialValue={data?.userName} ><Input disabled /></Form.Item>
                    <Form.Item name='identityNumber' label="identityNumber" initialValue={data?.identityNumber}><Input /></Form.Item>
                    <Form.Item name='phoneNumber' label="phoneNumber" initialValue={data?.phoneNumber}><Input /></Form.Item>
                    <Form.Item name='email' label="email" initialValue={data?.email}><Input /></Form.Item>
                    <Form.Item name='fullName' label="fullName" initialValue={data?.fullName}><Input /></Form.Item>
                    <Form.Item name='address' label="address" initialValue={data?.address}><Input /></Form.Item>
                    <Form.Item name='streetNumber' label="streetNumber" initialValue={data?.streetNumber}><Input /></Form.Item>
                    <Form.Item name='postCode' label="postCode" initialValue={data?.postCode}><Input /></Form.Item>

                    <Form.Item name='roleNames' label="roleNames" initialValue={data?.roleNames}>
                        <Select placeholder="Please select role" >
                            <Option value="Admin">Admin</Option>
                            <Option value="NormalUser">NormalUser</Option>
                            <Option value="ShopOwner">ShopOwner</Option>
                            <Option value="Shipper">Shipper</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 10,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Popconfirm
                            title="Are you sure to delete this user?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger type="primary" style={{ marginLeft: '10px' }}>
                                Delete
                            </Button>
                        </Popconfirm>

                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalEdituser;