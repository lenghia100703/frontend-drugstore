import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ShipItem.module.scss';
import BillModal from '../BillModal';

const cx = classNames.bind(styles);

function ShipItem({ data, count }) {
    const [isOpen, setIsOpen] = useState(false);

    const [totalCost, setTotalCost] = useState(0);
    const [countOfItems, setCountOfItems] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
    };

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
            <div className={cx('col-2', 'col')}>{data.id}</div>
            <div className={cx('col-3', 'col')}>{data.phoneCustomer}</div>
            {data.myListOrder && <div className={cx('col-9', 'col')}>{data.deliveredTime}</div>}
            <Link to={'/nha-thuoc-ecopharmaceuticals'} className={cx('col-4', 'col')}>
                <div style={{ fontWeight: 700 }}>{data.nameshop}</div>
                <div>{data.address}</div>
            </Link>
            <div className={cx('col-5', 'col')}>
                <div style={{ fontWeight: 700 }}>{data.nameCustomer}</div>
                <div>{data.addressCustomer}</div>
            </div>
            <div className={cx('col-6', 'col')}>
                <div>{totalCost}đ</div>
                <div>{countOfItems} items</div>
            </div>
            <div className={cx('col-7', 'col')}>
                {data.status ? (
                    data.myListOrder ? (
                        <div className={cx('incomplete')}>Delivered</div>
                    ) : (
                        <div className={cx('incomplete')}>Received</div>
                    )
                ) : data.myListOrder ? (
                    <div className={cx('complete')}>Not delivery</div>
                ) : (
                    <div className={cx('complete')}>Not received</div>
                )}
            </div>
            <div className={cx('col-8', 'col')}>
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleOpen}>
                    View detail
                </span>
            </div>
            {!data.myListOrder && (
                <div className={cx('col-9', 'col')}>
                    <button className={cx('add-btn')}>Confirm</button>
                </div>
            )}

            {isOpen && <BillModal onOpen={setIsOpen} data={data} />}
        </div>
    );
}

export default ShipItem;
