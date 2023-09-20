import { faKey, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import request from '../../api/axios';
import styles from './ResetPass.module.scss';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ResetPass() {
    const nameUrl = window.location.href;
    const params = useParams();
    const token_ = params.token
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Reset password failed',
            description: type === "success" ?
                'Reset password successful' : 'Please try again or check matching between password and re-password!',
            duration: 1.5
        });
    };
    const [randomTokenResetPassword, setRandomTokenResetPassword] = useState(token_);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            password !== confirmPassword ||
            password === '' ||
            confirmPassword === '' ||
            randomTokenResetPassword === ''
        ) {
            openNotificationWithIcon("error")
        }
        else {
            request.put('user/password/reset', {
                password: password,
                randomTokenResetPassword: randomTokenResetPassword
            })
                .then((res) => {
                    openNotificationWithIcon("success")
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000)
                })
                .catch(() => {
                    openNotificationWithIcon("error")
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <div className={cx('title')}>
                        <h2>Reset Password</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter new password"
                            className={cx('input')}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your confirm password"
                            className={cx('input')}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        OK
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPass;
