import { Button, Modal, Form, Input, Select } from 'antd';
import { notification } from 'antd';
import request from '../../api/axios';

const ModelShopEdit = (props) => {
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
            message: type === "success" ? "" : 'Update shop failed',
            description: type === "success" ?
                'Update shop successful' : 'Please check all fields again!',
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

    const data = props.shops[props.index]
    const handleOk = () => {
        props.setIsModalOpen(false);
        form.resetFields()
    };
    const handleCancel = () => {
        props.setIsModalOpen(false);
        form.resetFields()
    };
    const updateShop = (value) => {
        const json = JSON.stringify(value);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const formData = new FormData();
        formData.append('medicalShopDTO', blob)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            }
        }
        request.put("medical-shop/update", formData, config).then((res) => {
            openNotificationWithIcon("success")
            props.setChange(!props.change)
            form.resetFields()

        })
            .catch(() => {
                openNotificationWithIcon("error")
            })
    }
    const onFinish = (values) => {
        let medicalShopDTO = {
            medicalShopId: data?.medicalShopId,
            ...values,
        }
        console.log(data)
        console.log(medicalShopDTO)
        updateShop(medicalShopDTO)
        props.setIsModalOpen(false);
    };


    return (
        <>
            {contextHolder}
            <Modal title="Edit shop" open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={900}>
                <Form {...layout} name="basic" onFinish={onFinish} validateMessages={validateMessages} form={form}>
                    <Form.Item name="medicalShopName" label="medicalShopName" initialValue={data?.medicalShopName} ><Input disabled /></Form.Item>
                    <Form.Item name='streetNumber' label="streetNumber" initialValue={data?.streetNumber}><Input /></Form.Item>
                    <Form.Item name='postCode' label="postCode" initialValue={data?.postCode}><Input /></Form.Item>
                    <Form.Item name='detailAddress' label="detailAddress" initialValue={data?.detailAddress}><Input /></Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 10,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModelShopEdit;