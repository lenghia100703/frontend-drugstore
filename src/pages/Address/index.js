import classNames from 'classnames/bind';
import { useEffect } from 'react';
import request from '../../api/axios';

import styles from './Address.module.scss';

const cx = classNames.bind(styles);

function Address() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        console.log(userData);
        request.get(`user/${userData.userId}`).then((res) => {
            console.log(res.data);
        });
    }, [userData]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Address</h3>
            </div>
            <div className={cx('table-address')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows')}>
                        <div className={cx('col-2')}>Address</div>
                        <div className={cx('col-3')}>Phone</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    <div className={cx('rows')}>
                        <div className={cx('col-2')}>{userData.address}</div>
                        <div className={cx('col-3')}>{userData.phoneNumber}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Address;
