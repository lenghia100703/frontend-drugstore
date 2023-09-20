import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import request from '../../api/axios';
import { Table, Button } from 'antd';
import ModalEdituser from './ModalEditUser';

import styles from './CustomerList.module.scss';

const cx = classNames.bind(styles);

function CustomerList() {
    const [userList, setUserList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [change, setChange] = useState(false)
    let height = window.innerHeight
    let width = window.innerWidth
    useEffect(() => {
        request.get('user/list').then((res) => {
            setUserList(res.data);
        });
    }, [change]);
    const columns = [
        {
            title: 'UserName',
            width: 120,
            dataIndex: 'userName',
            key: 'userName',
            fixed: 'left',
        },
        {
            title: 'identityNumber',
            width: 150,
            dataIndex: 'identityNumber',
            key: 'identityNumber',
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: '1',
            width: 150,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: '2',
            width: 150,
        },
        {
            title: 'fullName',
            dataIndex: 'fullName',
            key: '3',
            width: 150,
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: '4',
            width: 250,
        },
        {
            title: 'streetNumber',
            dataIndex: 'streetNumber',
            key: '5',
            width: 100,
        },
        {
            title: 'postCode',
            dataIndex: 'postCode',
            key: '6',
            width: 100,
        },
        {
            title: 'roleNames',
            dataIndex: 'roleNames',
            key: '7',
            width: 150,
        },
        {
            title: 'identityCardUrl',
            dataIndex: 'identityCardUrl',
            key: '8',
            width: 150,
            render: (text) => <img src={text?.substring(1, text?.length - 1)} style={{ width: '100px' }}></img>,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
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
                    dataSource={userList}
                    scroll={{
                        x: width * 0.8,
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
            <ModalEdituser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userList={userList} index={index} setChange={setChange} change={change} />
        </div>
    );
}

export default CustomerList;
