import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ChangeModal from '../ChangeModal';

import styles from './ObjectItem.module.scss';

const cx = classNames.bind(styles);

function ObjectItem({ data, count }) {
    const handleClear = (id) => {
        axios.get(`http://localhost:9000/api/v1/user/${id}`).then((res) => {
            res.deleted = true;
            setVisible(res.deleted);
        });
    };

    const handleChange = () => {
        setIsOpen(true);
    };

    const [visible, setVisible] = useState(data.deleted);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!visible && (
                <div className={cx('rows-2')} key={count}>
                    <div className={cx('col-1', 'col')}>{count + 1}</div>
                    <div className={cx('col-2', 'col')} style={{ fontSize: 14 }}>
                        {data.userName || data.userId}
                    </div>
                    <div className={cx('col-3', 'col')}>
                        {data.detailAddress ? <div>{data.detailAddress}</div> : <div>{data.phoneNumber}</div>}
                    </div>
                    <div className={cx('col-4', 'col')} style={{ fontSize: 14 }}>
                        {data.fullName || data.medicalShopName}
                    </div>

                    {data.medicalShopUrlImage ? <div className={cx('col-5', 'col')}><img src={data.medicalShopUrlImage} style={{ width: '80px' }}></img></div> : <div className={cx('col-5', 'col')}>
                        <input type="email" value={data.email} className={cx('email')} />
                    </div>}
                    <div className={cx('col-6', 'col')}>
                        <div
                            style={{ fontSize: 14, color: 'red', cursor: 'pointer' }}
                            onClick={() => handleClear(data.userId)}
                        >
                            Clear
                        </div>
                        <div style={{ fontSize: 14, color: 'blue', cursor: 'pointer' }} onClick={handleChange}>
                            Change
                        </div>
                    </div>
                    {isOpen && <ChangeModal onOpen={setIsOpen} data={data} />}
                </div>
            )}
        </>
    );
}

export default ObjectItem;
