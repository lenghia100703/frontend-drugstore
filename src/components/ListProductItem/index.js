import classNames from 'classnames/bind';

import styles from './ListProductItem.module.scss';

const cx = classNames.bind(styles);

function ListProductItem(data, count) {
    return (
        <div className={cx('rows-2')} key={count}>
            <div className={cx('col-1', 'col')}>{count + 1}</div>
            <div className={cx('col-2', 'col')}>
                <img src={data.goodsUrlImage} className={cx('img')} />
                <span>{data.goodsName}</span>
            </div>
            <div className={cx('col-3', 'col')}>{data.price}</div>
            <div className={cx('col-5', 'col')}>
                <button className={cx('add-btn')}>Confirm</button>
            </div>
        </div>
    );
}

export default ListProductItem;
