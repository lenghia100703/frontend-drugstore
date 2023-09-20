import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotiPopper.module.scss';

const cx = classNames.bind(styles);

function NotiItem({ item }) {
    const [isRead, setIsRead] = useState(item.read);
    return (
        <div className={cx('menu-item')} onClick={() => setIsRead(false)}>
            <Link to={item.to} className={cx('btn-item')}>
                <div className={cx(isRead ? 'read' : 'unread')}>
                    <div className={cx(isRead ? 'primary' : 'unread')}>{item.typeOfMessage && 'Sucesss'}</div>
                    <div className={cx('time')}>{item.sentAt}</div>
                </div>
                {isRead && <span className={cx('icon-item')}>{item.icon}</span>}
            </Link>
        </div>
    );
}

export default NotiItem;
