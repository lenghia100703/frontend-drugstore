import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import BillModal from '../BillModal';

import styles from './ListDrugOrder.module.scss';

const cx = classNames.bind(styles);

function ListDrugOrder({ data, count }) {
    const [isOpen, setIsOpen] = useState(false);

    const [totalCost, setTotalCost] = useState(0);
    const [countOfItems, setCountOfItems] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const [nameCustomer, setNameCustomer] = useState('');
    const userList = JSON.parse(localStorage.getItem('userList'));
    useEffect(() => {
        for (let i = 0; i < userList.length; i++) {
            if (data.customerId === userList[i].userId) {
                setNameCustomer(userList[i].fullName);
            } else {
                setNameCustomer('Dao Tan Hai');
            }
        }
    }, []);

    useEffect(() => {
        setTotalCost(() => {
            let totalCostTemp = 0;
            for (let i = 0; i < data.listOfProducts.length; i++) {
                totalCostTemp += data.listOfProducts[i].totalCost;
            }
            return totalCostTemp;
        });
        setCountOfItems(() => {
            let countOfItemsTemp = 0;
            for (let i = 0; i < data.listOfProducts.length; i++) {
                countOfItemsTemp += data.listOfProducts[i].countOfItems;
            }
            return countOfItemsTemp;
        });
    }, [totalCost, countOfItems]);
    return (
        <div className={cx('rows-2')}>
            <div className={cx('col-1', 'col')}>{count + 1}</div>
            <div className={cx('col-2', 'col')}>{nameCustomer}</div>
            <div className={cx('col-3', 'col')}>{data.deliverToAddress}</div>
            <div className={cx('col-4', 'col')}>
                <div>{data.totalPrice}$</div>
                <div>{countOfItems} items</div>
            </div>
            <div className={cx('col-5', 'col')}>
                {data.delivered ? (
                    data.myListOrder ? (
                        <div className={cx('incomplete')}>Delivered</div>
                    ) : (
                        <div className={cx('incomplete')}>Confirm</div>
                    )
                ) : data.myListOrder ? (
                    <div className={cx('complete')}>Not delivery</div>
                ) : (
                    <div className={cx('complete')}>Not confirm</div>
                )}
            </div>
            <div className={cx('col-6', 'col')}>
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleOpen}>
                    View detail
                </span>
            </div>
            <div className={cx('col-7', 'col')}>
                <button className={cx('add-btn')}>Confirm</button>
            </div>

            {isOpen && <BillModal onOpen={setIsOpen} data={data} />}
        </div>
    );
}

export default ListDrugOrder;
