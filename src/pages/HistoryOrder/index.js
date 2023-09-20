import classNames from 'classnames/bind';

import styles from './HistoryOrder.module.scss';
import HistoryItem from '../../components/HistoryItem';

const cx = classNames.bind(styles);

const DATA_ORDER = [
    {
        id: '14141-1231241',
        orderedTime: '24/09/2022 11:45',
        deliveredTime: '14/10/2022 12:40',
        nameshop: 'Nhà Thuốc EcoPharmaceuticals',
        countOfProduct: 2,
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
        address: '33 Lê Ngã, P. Phú Trung, Tân Phú, TP. HCM',
        shipper: 'Tạ Đức Mạnh',
        status: true,
    },
    {
        id: '14141-1231241',
        orderedTime: '24/09/2022 11:45',
        deliveredTime: '14/10/2022 12:40',
        nameshop: 'Nhà Thuốc EcoPharmaceuticals',
        countOfProduct: 2,
        listOfProducts: [
            {
                nameproduct: 'Thuốc đau đầu',
                countOfItems: 2,
                totalCost: 73000,
            },
            {
                nameproduct: 'Men tiêu hóa',
                countOfItems: 2,
                totalCost: 100000,
            },
        ],
        address: '33 Lê Ngã, P. Phú Trung, Tân Phú, TP. HCM',
        shipper: 'Tiên Minh Hòa',
        status: true,
    },
    {
        id: '14141-1231241',
        orderedTime: '24/09/2022 11:45',
        deliveredTime: '14/10/2022 12:40',
        nameshop: 'Nhà Thuốc EcoPharmaceuticals',
        countOfProduct: 2,
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
            {
                nameproduct: 'Thuốc ho',
                countOfItems: 1,
                totalCost: 100000,
            },
        ],
        address: '33 Lê Ngã, P. Phú Trung, Tân Phú, TP. HCM',
        shipper: 'Nguyễn Đức Minh',
        status: true,
    },
];

function HistoryOrder() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>History Order</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Order ID</div>
                        <div className={cx('col-3', 'col')}>Time</div>
                        <div className={cx('col-4', 'col')}>Place</div>
                        <div className={cx('col-5', 'col')}>Shipper</div>
                        <div className={cx('col-6', 'col')}>Total amount</div>
                        <div className={cx('col-7', 'col')}>Status</div>
                        <div className={cx('col-8', 'col')}>Detail</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {DATA_ORDER.map((item, index) => (
                        <HistoryItem data={item} key={index} count={index} onClick={() => true} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HistoryOrder;
