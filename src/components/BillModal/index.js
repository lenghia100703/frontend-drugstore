import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './BillModal.module.scss';

const cx = classNames.bind(styles);

function BillModal({ onOpen, data }) {
    const LIST_OF_PRODUCTS = data.listOfProducts;
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        setTotalCost(() => {
            let totalCostTemp = 0;
            for (let i = 0; i < data.listOfProducts.length; i++) {
                totalCostTemp += data.listOfProducts[i].totalCost;
            }
            return totalCostTemp;
        });
    }, [totalCost]);

    const [nameCustomer, setNameCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [nameShop, setNameShop] = useState('');
    const [addressShop, setAddressShop] = useState();
    const userList = JSON.parse(localStorage.getItem('userList'));
    const shopList = JSON.parse(localStorage.getItem('shopList'));
    useEffect(() => {
        for (let i = 0; i < userList.length; i++) {
            if (data.customerId === userList[i].userId) {
                setNameCustomer(userList[i].fullName);
                setPhone(userList[i].phoneNumber);
            } else {
                setNameCustomer('Dao Tan Hai');
            }
        }
        for (let i = 0; i < shopList.length; i++) {
            if (data.medicalShopId === shopList[i].medicalShopId) {
                setNameShop(shopList[i].medicalShopName);
                setAddressShop(shopList[i].detailAddress);
            }
        }
    }, []);
    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={cx('content')}>
                    <table>
                        <tr>
                            <td colSpan={2}>{data.billId}</td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                {data.shipper ? (
                                    <>Shipper: {data.shipper}</>
                                ) : (
                                    <>
                                        Customer: {nameCustomer}, Phone: {phone}
                                    </>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold' }}>{nameShop}</div>
                                <div>{addressShop}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>Delivery Time: {data.deliveredTime}</td>
                        </tr>
                        <tr>
                            <td>No</td>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td style={{ textAlign: 'right' }}>Price</td>
                        </tr>
                        {LIST_OF_PRODUCTS.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.nameproduct}</td>
                                <td style={{ textAlign: 'center' }}>{item.countOfItems}</td>
                                <td style={{ textAlign: 'right' }}>{item.totalCost}$</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2}>Total:</td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                {data.totalPrice}$
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Shipping Fee:</td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                +1$
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Discount:</td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                -2$
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ fontWeight: 'bold' }}>
                                Total Price:
                            </td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                {data.totalPrice + 15000 - 20000}$
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BillModal;
