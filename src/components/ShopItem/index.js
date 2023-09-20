import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ShopItem.module.scss';

const cx = classNames.bind(styles);

function ShopItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('inner')} to={`/medical-shop/${data.medicalShopId}`}>
                <div className={cx('img')}>
                    <img src={data.medicalShopUrlImage} className={cx('shop-img')} />
                </div>
                <div className={cx('title')}>
                    <div className={cx('name-shop')}>{data.medicalShopName}</div>
                    <div className={cx('shop-address')}>
                        <span>{data.detailAddress}</span>
                    </div>
                    <span className={cx('kind-shop')}>{data.kindshop}</span>
                </div>
            </Link>
        </div>
    );
}

export default ShopItem;
