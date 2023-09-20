import styles from './Booking.module.scss';
import classNames from 'classnames/bind';
import { Space, Table, Button } from 'antd';
import request from '../../api/axios';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Booking = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        let uId = JSON.parse(localStorage.getItem("userData")).userId
        request.get(`/booking/list/customer/${uId}`)
            .then(res => {
                setData(res.data)
            })
    }, [])

    const columns = [
        {
            title: 'Start DateTime',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary'>Join</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>List Bookings</h1>
            <div className={cx('body')}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Booking