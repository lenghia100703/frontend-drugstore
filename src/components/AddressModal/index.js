import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../Map';

import styles from './AddressModal.module.scss';

const cx = classNames.bind(styles);

function AddressModal({ onOpen, data }) {
    const [showMap, setShowMap] = useState(false);
    const [address, setAddress] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/medical-shop/search/streetNumber=${streetNumber}&address=${address}`);
    };

    const handleShowMap = () => {
        setShowMap(true);
    };
    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={cx('header')}>
                    <h3 className={cx('title')}>Where do you want to send it?</h3>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Address</h3>
                            <input
                                className={cx('input-form')}
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                onChange={(e) => setAddress(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div style={{ marginTop: 16, marginBottom: 16 }}>
                            <h3>Street Number</h3>
                            <input
                                className={cx('input-form')}
                                type="text"
                                name="streetNumber"
                                placeholder="Enter your street number"
                                onChange={(e) => setStreetNumber(e.target.value)}
                            />
                        </div>
                        <div className={cx('button-search')}>
                            <button type="submit" style={{ color: 'white' }}>
                                Search
                            </button>
                        </div>
                    </form>
                    {!showMap && (
                        <div className={cx('find-map')}>
                            <FontAwesomeIcon icon={faThumbTack} />
                            <span onClick={handleShowMap} style={{ marginLeft: 8 }}>
                                Tìm trên bản đồ
                            </span>
                        </div>
                    )}
                    {showMap && <Map medicals={data} />}
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
