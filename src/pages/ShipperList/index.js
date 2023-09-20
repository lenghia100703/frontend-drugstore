import classNames from 'classnames/bind';
import ObjectItem from '../../components/ObjectItem';

import styles from './ShipperList.module.scss';

const cx = classNames.bind(styles);

const CUSTOMER_LIST = [
    {
        username: 'lenghia1007',
        password: '10072003',
        fullname: 'Lê Vũ Minh Nghĩa',
        email: 'abc123@gmail.com',
    },
];

function ShipperList() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Shipper List</h1>
            <div className={cx('body')}>
                <div className={cx('table-address-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-1', 'col')}>STT</div>
                        <div className={cx('col-2', 'col')}>Username</div>
                        <div className={cx('col-3', 'col')}>Password</div>
                        <div className={cx('col-4', 'col')}>Fullname</div>
                        <div className={cx('col-5', 'col')}>Email</div>
                        <div className={cx('col-6', 'col')}>Actions</div>
                    </div>
                </div>
                <div className={cx('table-address-body')}>
                    {CUSTOMER_LIST.map((item, index) => (
                        <ObjectItem data={item} key={index} count={index} onClick={() => true} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShipperList;
