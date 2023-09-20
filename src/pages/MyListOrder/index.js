import classNames from 'classnames/bind';

import styles from './MyListOrder.module.scss';
import ShipItem from '../../components/ShipItem';

const cx = classNames.bind(styles);

const MY_LIST_ORDER = [
    {
        id: '14141-1231241',
        orderedTime: '24/09/2022 11:45',
        deliveredTime: '14/10/2022 12:40',
        nameshop: 'Nhà Thuốc EcoPharmaceuticals',
        address: '33 Lê Ngã, P. Phú Trung, Tân Phú, TP. HCM',
        nameCustomer: 'Tạ Đức Mạnh',
        phoneCustomer: '01234567',
        addressCustomer: '60 Lê Ngã, P. Phú Trung, Tân Phú, HN',
        listOfProducts: [
            {
                nameproduct: 'Thuốc đau đầu',
                countOfItems: 2,
                totalCost: 73000,
            },
            {
                nameproduct: 'Men tiêu hóa',
                countOfItems: 1,
                totalCost: 60000,
            },
        ],
        status: true,
        myListOrder: true,
    },
];

function MyListOrder() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh sách các đơn hàng của tôi</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Order ID</div>
                        <div className={cx('col-3', 'col')}>Phone</div>
                        <div className={cx('col-9', 'col')}>Delivery Time</div>
                        <div className={cx('col-4', 'col')}>Address of shop</div>
                        <div className={cx('col-5', 'col')}>Address of customer</div>
                        <div className={cx('col-6', 'col')}>Total</div>
                        <div className={cx('col-7', 'col')}>Status</div>
                        <div className={cx('col-8', 'col')}>View detail</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {MY_LIST_ORDER.map((item, index) => (
                        <ShipItem data={item} key={index} count={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyListOrder;
