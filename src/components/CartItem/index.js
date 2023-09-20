import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import styles from './CartItem.module.scss';
import request from '../../api/axios';
import { useDispatch } from 'react-redux';
import { DecreaseQuantity, DeleteCart, IncreaseQuantity, ChangeIsSelection } from '../../actions/cartAction';

const cx = classNames.bind(styles);

function CartItem({ item }) {
    useEffect(() => {
        request.get(`medical-shop/${item.medicalShopId}`).then((res) => {
            setShop(res.data);
        });
    }, []);
    const [visible] = useState(true);
    const [shop, setShop] = useState({});
    const dispatch = useDispatch();
    const handleSub = (data) => {
        dispatch(DecreaseQuantity(data));
    };

    const handleAdd = (data) => {
        dispatch(IncreaseQuantity(data));
    };

    const handleClear = (data) => {
        dispatch(DeleteCart(data));
    };
    return (
        <>
            {visible ? (
                <div className={cx('rows-1')}>
                    <div className={cx('col-5', 'col')}>
                        <input type="checkbox" onChange={(e) => { dispatch(ChangeIsSelection({ ...item, isSelection: e.target.checked })) }} />
                    </div>
                    <div className={cx('col-1', 'col')}>
                        <img src={item.goodsUrlImage} className={cx('img')} />
                        <span>{item.goodsName}</span>
                    </div>
                    <div className={cx('col-6', 'col')}>
                        <div className={cx('nameshop')}>{shop.medicalShopName}</div>
                        <div className={cx('addressshop')}>{shop.detailAddress}</div>
                    </div>
                    <div className={cx('col-2', 'col')}>
                        <div className={cx('count-product')}>
                            <button onClick={() => handleSub(item)} className={cx('sub-btn')}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleAdd(item)} className={cx('add-btn')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('col-3', 'col')} style={{ color: '#ee4d2d' }}>
                        {item.quantity * item.price}$
                    </div>
                    <div className={cx('col-4', 'col')}>
                        <Button danger type="text" onClick={() => handleClear(item)}>
                            Delete
                        </Button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default CartItem;
