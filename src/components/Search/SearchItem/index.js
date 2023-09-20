import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/medical-shop/${data.medicalShopId}`} className={cx('inner')}>
                <div className={cx('inner-left')}>
                    <div className={cx('img')}>
                        <img src={data.medicalShopUrlImage} className={cx('shop-img')} />
                    </div>
                    <div className={cx('title')}>
                        <div className={cx('name-shop')}>{data.medicalShopName}</div>
                        <div className={cx('address-shop')}>{data.detailAddress}</div>
                    </div>
                </div>
                <div className={cx('inner-right')}></div>
            </Link>
        </div>
    );
}

export default SearchItem;
