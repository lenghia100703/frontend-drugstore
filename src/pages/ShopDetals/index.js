import classNames from 'classnames/bind';
import { Image, Rate } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ShopDetals.module.scss';
import ProductItem from '../../components/ProductItem';
import request from '../../api/axios';
import BookingModal from '../../components/BookingModal';

const cx = classNames.bind(styles);

function ShopDetals() {
    const [shopById, setShopById] = useState({ "goodsDTOS": [] });
    const [goods, setGoods] = useState([]);
    const [comments, setComments] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isProduct, setIsProduct] = useState(true)
    let { id } = useParams();
    const handleOpen = () => {
        setIsOpen(true);
    };


    useEffect(() => {
        request.get(`medical-shop/${id}`).then((res) => {
            setShopById(res.data);
            setGoods(res.data.goodsDTOS)
        });
        request.get(`rating/list/medicalshop/${id}`).then((res) => {
            setComments(res.data)
        })
    }, [id]);

    const content = () => {
        if (isProduct) {
            return (
                <div className={cx('menu-shop-detal')}>
                    <h1>Products</h1>
                    <div className={cx('inner-menu-shop')}>
                        <div>
                            {
                                goods.map((item, index) => (
                                    <div key={index}>
                                        <ProductItem data={item} onClick={() => true} />
                                    </div>))
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={cx('menu-shop-detal')}>
                    <h1>Comments</h1>
                    <div className={cx('inner-menu-shop')}>
                        <div>
                            {
                                comments.map((item, index) => (
                                    <div key={index} style={{ marginTop: '10px', padding: '10px' }} className={cx('comment')}>
                                        <p>{item.commentOnMedicalShop}</p>
                                        <Rate disabled defaultValue={item.numberOfStartOnMedicalShop} />
                                    </div>))
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('detal-shop')}>
                <div className={cx('inner-detal-shop')}>
                    <div className={cx('inner-left')}>
                        <Image
                            className={cx('shop-img')}
                            src={shopById.medicalShopUrlImage}
                        />
                    </div>
                    <div className={cx('inner-right')}>
                        <div className={cx('kind-shop')}>{shopById.kindshop}</div>
                        <div className={cx('name-shop')}>{shopById.medicalShopName}</div>
                        <div className={cx('address-shop')}>{shopById.detailAddress}</div>
                        <div className={cx('booking')} onClick={handleOpen}>
                            Book an appointment
                        </div>
                        <div className={cx('utility-shop')}>
                            <div style={{ color: '#959595' }}>SERVICE BY</div>
                            <div>ODC19</div>
                        </div>
                    </div>
                    <div className={cx('actionGroup')}>
                        <div className={cx('action')} onClick={() => setIsProduct(true)}>Products</div>
                        <div className={cx('action')} onClick={() => setIsProduct(false)}>Comment</div>
                    </div>
                </div>
            </div>

            {content()}
            {isOpen && <BookingModal onOpen={setIsOpen} />}
        </div>
    );
}

export default ShopDetals;
