import classNames from 'classnames/bind';
import { useState } from 'react';
import request from '../../api/axios';

import styles from './GoodModal.module.scss';

const cx = classNames.bind(styles);

function GoodModal({ onOpen }) {
    const [goodName, setGoodName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        request
            .post('medical-shop/goods/new', {
                goodsName: goodName,
                price: price,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <h2 className={cx('header')}>Create product</h2>
                    <div className={cx('user-name')}>
                        <div className={cx('title')}>Name product</div>
                        <input
                            className={cx('input-username')}
                            value={goodName}
                            onChange={(e) => {
                                setGoodName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('pass-word')}>
                        <div className={cx('title')}>Price</div>
                        <input
                            type="password"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            className={cx('input-password')}
                            spellCheck={false}
                        />
                    </div>
                    <div className={cx('save')}>
                        <button className={cx('save-btn')} type="submit">
                            OK
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GoodModal;
