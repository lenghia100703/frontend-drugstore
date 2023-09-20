import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ onOpen, data }) {
    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={cx('body')}>
                    <img src={data.goodsUrlImage} className={cx('img')} />
                </div>
                <div className={cx('info')}>
                    <div>
                        <div className={cx('name-product')}>{data.goodsName}</div>
                        <div className={cx('detals-product')}>{data.detalsproduct}</div>
                        <div className={cx('count-order-product')}>
                            Đã được đặt <span style={{ fontWeight: 700 }}>{data.quantity}+</span> lần
                        </div>
                    </div>
                    <div>
                        <div className={cx('price')}>{data.price}đ</div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <button className={cx('add-btn')}>
                        <span style={{ marginRight: 5 }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
