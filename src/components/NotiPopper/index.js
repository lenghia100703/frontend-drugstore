import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './NotiPopper.module.scss';
import NotiItem from './NotiItem';
import { useEffect, useState } from 'react';
import request from '../../api/axios';

const cx = classNames.bind(styles);

const NOTIUSER_POPPER = [
    {
        id: '14141 - 1231241',
        time: 1,
        read: false,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/history-order',
    },
    {
        id: '64141 - 9432953',
        time: 2,
        read: true,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/history-order',
    },
    {
        id: '10350 - 1293910',
        time: 12,
        read: true,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/history-order',
    },
];

const NOTISHIPPER_POPPER = [
    {
        title: 'Đơn hàng 14141-1231241 đã giao thành công',
        id: 14141 - 1231241,
        time: 1,
        read: false,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/my-list-order',
    },
    {
        title: 'Đơn hàng 64141-9432953 đã giao thành công',
        id: 64141 - 9432953,
        time: 2,
        read: true,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/my-list-order',
    },
    {
        title: 'Đơn hàng 10350-1293910 đã giao thành công',
        id: 10350 - 1293910,
        time: 12,
        read: true,
        icon: <FontAwesomeIcon icon={faCircle} />,
        to: '/my-list-order',
    },
];

function NotiPopper({ children }) {
    const [noti, setNoti] = useState([]);
    useEffect(() => {
        request.get('notification/list/user3').then((res) => {
            setNoti(res.data);
        });
        console.log(noti);
    }, []);
    return (
        <HeadlessTippy
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <div className={cx('menu-popper')}>
                        <div className={cx('header')}>
                            <h3>Notifications</h3>
                        </div>
                        <div className={cx('menu-body')}>
                            {noti.map((item, index) => (
                                <NotiItem key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            trigger="click"
        >
            {children}
        </HeadlessTippy>
    );
}

export default NotiPopper;
