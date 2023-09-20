import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ModalCheckout from './ModalCheckout';
const cx = classNames.bind(styles);


function Cart() {
    const state = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false);
    const [carts, setCarts] = useState({
        numberCart: 0,
        Carts: [],
        _products: [],
    })
    useEffect(() => {
        setCarts(state)
    }, [state])

    const calculateMoney = () => {
        let money = 0
        carts.Carts.map(
            (item) => {
                money += item.quantity * item.price
            }
        )
        return money
    }

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Shopping Cart</h1>
            <div className={cx('body')}>
                <div className={cx('table-product-header')}>
                    <div className={cx('rows-1')}>
                        <div className={cx('col-5', 'col')}>
                            <input type="checkbox" />
                        </div>
                        <div className={cx('col-1', 'col')}>Product</div>
                        <div className={cx('col-6', 'col')}>Shop</div>
                        <div className={cx('col-2', 'col')}>Quantity</div>
                        <div className={cx('col-3', 'col')}>Total Price</div>
                        <div className={cx('col-4', 'col')}>Actions</div>
                    </div>
                </div>
                <div className={cx('table-product-body')}>
                    {carts.Carts.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
                <div className={cx('pay')}>
                    <span style={{ marginLeft: 22 }}>
                        Total: <b>{calculateMoney()}$ </b>
                        (<span>{carts.numberCart}</span> products)
                    </span>
                    <span>
                        <button className={cx('pay-btn')} onClick={() => setOpen(true)}>Check out</button>
                    </span>
                </div>
            </div>
            <ModalCheckout open={open} setOpen={setOpen} />
        </div>
    );
}

export default Cart;
