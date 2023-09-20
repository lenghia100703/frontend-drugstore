import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRightLong, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import request from '../../api/axios';
import Search from '../../components/Search';
import ShopItem from '../../components/ShopItem';
import AddressModal from '../../components/AddressModal';

const cx = classNames.bind(styles);

function Home() {
    const [shopNearMe, setShopNearMe] = useState([]);

    const [visible, setVisible] = useState(5);

    const [showMap, setShowMap] = useState(false);

    const handleMore = () => {
        setVisible((prev) => prev + 5);
    };

    const handleShowMap = () => {
        console.log(true);
        setShowMap(true);
    };

    useEffect(() => {
        request.get('medical-shop/list').then((res) => {
            setShopNearMe(res.data);
            localStorage.setItem('shopList', JSON.stringify(shopNearMe));
        });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-left')}>
                    <div>
                        <h1 className={cx('title')}>Order Medicine, delivery from 20'...</h1>
                        <div className={cx('local')}>From 52 Places In HCM City From 00:00 - 23:59</div>
                    </div>
                    <Search />
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('main-right')}>
                        <div className={cx('user-get-local')} onClick={handleShowMap}>
                            <div className={cx('inner-get-local')}>
                                <div className={cx('get-local-left')}>
                                    <span style={{ color: '#0288d1', fontWeight: 600, marginRight: 8 }}>Medicine</span>
                                    <FontAwesomeIcon icon={faArrowRightLong} style={{ fontSize: 12 }} />
                                    <span style={{ marginLeft: 8 }}>Choose the delivery address</span>
                                </div>
                                <div className={cx('get-local-right')}>
                                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 14 }} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('shop-list')}>
                            <div className={cx('genre-select')}>
                                <div>
                                    <div className={cx('selectbtn')}>SHOP NEAR ME</div>
                                </div>
                            </div>
                            {shopNearMe.slice(0, visible).map((item, index) => (
                                <ShopItem data={item} key={index} />
                            ))}
                            <div className={cx('more')}>
                                <button className={cx('more-btn')} onClick={handleMore}>
                                    More
                                    <span style={{ marginLeft: 4 }}>
                                        <FontAwesomeIcon icon={faRotateRight} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showMap && <AddressModal onOpen={setShowMap} data={shopNearMe} />}
            </div>
        </div>
    );
}

export default Home;
