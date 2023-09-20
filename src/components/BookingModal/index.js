import classNames from 'classnames/bind';
import { useState } from 'react';
import dayjs from 'dayjs';
import styles from './BookingModal.module.scss';
import { Button, DatePicker, Form, Input, TimePicker, notification } from 'antd';
import request from '../../api/axios';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookingModal({ onOpen }) {
    const [api, contextHolder] = notification.useNotification();
    let { id } = useParams();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Booking',
            description:
                'Create booking successfuly!',
            duration: 1
        });
    };
    const onFinish = (values) => {
        openNotificationWithIcon('success')
        let data = {
            startDate: `${values.startDate.$D}-${values.startDate.$M + 1}-${values.startDate.$y} ${values.startTime.$H}:${values.startTime.$m}`,
            customerId: JSON.parse(localStorage.getItem("userData")).userId,
            medicalShopId: id,
            description: values.purpose,
            purpose: values.purpose,
            confirmed: false
        }
        request.post("booking/new", data)
        console.log(data)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            {contextHolder}
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Start Date"
                        name="startDate"
                        rules={[{ required: true, message: 'Please input your start date!' }]}
                    >
                        <DatePicker />
                    </Form.Item >
                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[{ required: true, message: 'Please input your start time!' }]}
                    >
                        <TimePicker format='HH:mm' />
                    </Form.Item >
                    <Form.Item
                        label="Purpose"
                        name="purpose"
                        rules={[{ required: true, message: 'Please input your purpose!' }]}
                    >
                        <Input />
                    </Form.Item >

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default BookingModal;
