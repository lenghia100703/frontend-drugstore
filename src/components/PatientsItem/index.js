import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import request from '../../api/axios';

import styles from './PatientsItem.module.scss';

const cx = classNames.bind(styles);

function PatientsItem({ data, count }) {
    const [nameCustomer, setNameCustomer] = useState('');
    const [confirmed, setConfirmed] = useState(data.confirmed);
    const userList = JSON.parse(localStorage.getItem('userList'));
    useEffect(() => {
        for (let i = 0; i < userList.length; i++) {
            if (data.customerId === userList[i].userId) {
                setNameCustomer(userList[i]);
            }
        }
    }, []);

    const handleConfirm = () => {
        setConfirmed(true);
        request
            .put(`booking/update`, {
                confirmed,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className={cx('rows-2')} key={count}>
            <div className={cx('col-1', 'col')}>{count + 1}</div>
            <div className={cx('col-2', 'col')}>{data.customerId}</div>
            <div className={cx('col-3', 'col')}>{data.startDate}</div>
            <div className={cx('col-4', 'col')}>
                {confirmed ? (
                    <div className={cx('complete')}>Confirmed</div>
                ) : (
                    <div className={cx('incomplete')}>Not confirmed</div>
                )}
            </div>
            <div className={cx('col-5', 'col')}>
                <button className={cx('add-btn')} onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default PatientsItem;
