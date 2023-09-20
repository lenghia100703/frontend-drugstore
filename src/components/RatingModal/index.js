import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './RatingModal.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function RatingModal({ onOpen, data }) {
    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);
    const [star4, setStar4] = useState(false);
    const [star5, setStar5] = useState(false);

    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={cx('header')}>
                    <div className={cx('title')}>Rate the shipper</div>
                </div>
                <div className={cx('content')}>
                    <div>
                        <img
                            src={'https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg'}
                            className={cx('shipper-img')}
                        />
                    </div>
                    <div style={{ fontSize: 16 }}>Tạ Đức Mạnh</div>
                    <div className={cx('ratting')}>
                        <span
                            className={cx('star', star1 && 'checked')}
                            onClick={() => {
                                setStar1(true);
                                setStar2(false);
                                setStar3(false);
                                setStar4(false);
                                setStar5(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span
                            className={cx('star', star2 && 'checked')}
                            onClick={() => {
                                setStar1(true);
                                setStar2(true);
                                setStar3(false);
                                setStar4(false);
                                setStar5(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span
                            className={cx('star', star3 && 'checked')}
                            onClick={() => {
                                setStar1(true);
                                setStar2(true);
                                setStar3(true);
                                setStar4(false);
                                setStar5(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span
                            className={cx('star', star4 && 'checked')}
                            onClick={() => {
                                setStar1(true);
                                setStar2(true);
                                setStar3(true);
                                setStar4(true);
                                setStar5(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span
                            className={cx('star', star5 && 'checked')}
                            onClick={() => {
                                setStar1(true);
                                setStar2(true);
                                setStar3(true);
                                setStar4(true);
                                setStar5(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                    </div>
                    <div className={cx('form-comment')}>
                        <textarea
                            className={cx('input-comment')}
                            placeholder="Share your viewer here."
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <button type="submit" className={cx('submit-btn')}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RatingModal;
