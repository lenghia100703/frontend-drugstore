import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import request from '../../api/axios';
import GoodModal from '../../components/GoodModal';
import ProductItem from '../../components/ProductItem';

import styles from './ListProducts.module.scss';

const cx = classNames.bind(styles);

function ListProducts() {
    const [shopById, setShopById] = useState({});
    const [ratting, setRatting] = useState({});
    const [good, setGood] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);
    const [star4, setStar4] = useState(false);
    const [star5, setStar5] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    let ratingAvg = 0;

    useEffect(() => {
        request.get(`medical-shop/medical_shop1`).then((res) => {
            setShopById(res.data);
        });
        request.get(`rating/list/medicalshop/medical_shop1`).then((res) => {
            setRatting(res.data);
        });
        request.get(`medical-shop/goods/goods1`).then((res) => {
            good.push(res.data);
        });
        request.get(`medical-shop/goods/goods2`).then((res) => {
            good.push(res.data);
        });
    }, []);

    useEffect(() => {
        for (let key in ratting) {
            ratingAvg += ratting[key].numberOfStartOnMedicalShop / ratting.length;
            Math.floor(ratingAvg);
        }
        switch (ratingAvg) {
            case 1:
                setStar1(true);
                break;
            case 2:
                setStar1(true);
                setStar2(true);
                break;
            case 3:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                break;
            case 4:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                setStar4(true);
                break;
            case 5:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                setStar4(true);
                setStar5(true);
                break;
        }
    }, [ratingAvg]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detal-shop')}>
                <div className={cx('inner-detal-shop')}>
                    <div className={cx('inner-left')}>
                        <img src={shopById.medicalShopUrlImage} className={cx('shop-img')} />
                    </div>
                    <div className={cx('inner-right')}>
                        <div className={cx('kind-shop')}>{shopById.kindshop}</div>
                        <div className={cx('name-shop')}>{shopById.medicalShopName}</div>
                        <div className={cx('address-shop')}>{shopById.detailAddress}</div>
                        <div className={cx('ratting')}>
                            <span className={cx('star', star1 && 'checked')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span className={cx('star', star2 && 'checked')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span className={cx('star', star3 && 'checked')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span className={cx('star', star4 && 'checked')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span className={cx('star', star5 && 'checked')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        </div>
                        <div className={cx('utility-shop')}>
                            <div style={{ color: '#959595' }}>SERVICE BY</div>
                            <div>ODC19</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('menu-shop-detal')}>
                <div className={cx('inner-menu-shop')}>
                    <button className={cx('search')} onClick={handleOpen}>
                        <span className={cx('search-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Add a product
                    </button>
                    <div>
                        {good.map((item, index) => (
                            <div>
                                <ProductItem data={item} key={index} onClick={() => true} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isOpen && <GoodModal onOpen={setIsOpen} />}
        </div>
    );
}

export default ListProducts;
