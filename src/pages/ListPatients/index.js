import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PatientsItem from '../../components/PatientsItem';

import styles from './ListPatients.module.scss';
import request from '../../api/axios';

const cx = classNames.bind(styles);

function ListPatients() {
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        request.get('booking/list/medicalshop/medical_shop2').then((res) => {
            setListOrder(res.data);
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>List of patients</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Customer</div>
                        <div className={cx('col-3', 'col')}>Time</div>
                        <div className={cx('col-4', 'col')}>Status</div>
                        <div className={cx('col-5', 'col')}>Received</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {listOrder.map((item, index) => (
                        <PatientsItem data={item} key={index} count={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListPatients;
