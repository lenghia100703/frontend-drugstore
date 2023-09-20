import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './DrugStoreItem.module.scss';

const cx = classNames.bind(styles);

function DrugStoreItem({ data }) {
    return (
        <Link className={cx('wrapper')} to={`/medical-shop/${data.medicalShopId}`}>
            <div className={cx('inner')}>
                <div className={cx('img')}>
                    <img src={data.medicalShopUrlImage} className={cx('shop-img')} />
                </div>
                <div className={cx('name-shop')}>{data.medicalShopName}</div>
                <div className={cx('address-shop')}>{data.detailAddress}</div>
            </div>
        </Link>
    );
}

export default DrugStoreItem;
