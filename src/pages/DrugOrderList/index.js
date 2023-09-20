import classNames from 'classnames/bind';
import styles from './DrugOrderList.module.scss';
import ListDrugOrder from '../../components/ListDrugOrder';
import request from '../../api/axios';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DrugOrderList() {
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        request.get('bill/list').then((res) => {
            setListOrder(res.data);
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>List Drug Order</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Customer</div>
                        <div className={cx('col-3', 'col')}>Address of customer</div>
                        <div className={cx('col-4', 'col')}>Total</div>
                        <div className={cx('col-5', 'col')}>Status</div>
                        <div className={cx('col-6', 'col')}>Detail</div>
                        <div className={cx('col-7', 'col')}>Receive</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {listOrder.map((item, index) => (
                        <ListDrugOrder data={item} key={index} count={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DrugOrderList;
