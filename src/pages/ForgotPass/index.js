import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { notification } from 'antd';
import request from '../../api/axios';

import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

function ForgotPass() {
    const [userName, setUsername] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Failed',
            description: type === "success" ?
                'Please check your mail' : 'Username wrong. Please try again',
            duration: 1.5
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        request.put('user/password/reset', {
            userName,
        })
            .then(() => {
                openNotificationWithIcon("success")
            })
            .catch(() => {
                openNotificationWithIcon("error")
            });
    };
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <h1>ODC19</h1>
                </div>
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <div className={cx('title')}>
                        <h2>Forgot Password</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your username"
                            className={cx('input')}
                            type="username"
                            value={userName}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPass;
