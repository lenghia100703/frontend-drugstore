import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import styles from './ShopList.module.scss';
import request from '../../api/axios';
import ModelShopEdit from './ModalShopEdit';
const cx = classNames.bind(styles);

function ShopList() {
    const [shops, setShops] = useState([])
    let height = window.innerHeight
    let width = window.innerWidth
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [change, setChange] = useState(false)
    useEffect(() => {
        request.get("medical-shop/list").then((res) => {
            setShops(res.data)
        })
    }, [change])
    const columns = [
        {
            title: 'medicalShopName',
            width: 120,
            dataIndex: 'medicalShopName',
            key: 'medicalShopName',
            fixed: 'left',
        },
        {
            title: 'streetNumber',
            width: 100,
            dataIndex: 'streetNumber',
            key: 'streetNumber',
        },
        {
            title: 'postCode',
            dataIndex: 'postCode',
            key: '1',
            width: 100,
        },
        {
            title: 'detailAddress',
            dataIndex: 'detailAddress',
            key: '2',
            width: 250,
        },
        {
            title: 'medicalShopUrlImage',
            dataIndex: 'medicalShopUrlImage',
            key: '8',
            width: 150,
            render: (text) => <img src={text} style={{ width: '100px' }}></img>,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: () => <Button danger onClick={() => setIsModalOpen(true)}>
                EDIT
            </Button>,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Users</h1>
            <div className={cx('body')}>
                <Table
                    columns={columns}
                    dataSource={shops}
                    scroll={{
                        x: width * 0.95,
                        y: height * 0.6,
                    }}
                    pagination={{ position: ["none"] }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setIndex(rowIndex)
                            },
                        };
                    }}
                />
            </div>
            <ModelShopEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} shops={shops} index={index} setChange={setChange} change={change} />
        </div>
    );
}

export default ShopList;


