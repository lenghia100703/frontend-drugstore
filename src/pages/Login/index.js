import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import {notification } from 'antd';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Login failed',
            description: type === "success" ?
                'Login successful' : 'Please check your username and password again!',
            duration: 1.5
        });
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            setTimeout(() => {
                navigate('/');
            }, 2000)
        }
    }, [userInfo, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let a = dispatch(login(username, password))
        a.then((res) => {
            openNotificationWithIcon(res)
        })
    };
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <div className={cx('close-btn')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx('title')}>
                        <h2>Log In</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your username"
                            className={cx('input')}
                            type="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter your password"
                            className={cx('input')}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        LOG IN
                    </button>
                    <Link to="/register" style={{ color: 'white' }}>
                        <button className={cx('register-btn')}>CREATE NEW ACCOUNT</button>
                    </Link>
                    <Link to="/forgot-password" style={{ color: 'blue' }}>
                        Forgotten password?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
