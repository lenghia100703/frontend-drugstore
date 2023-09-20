import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faImage, faMailBulk, faMapLocation, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../../api/axios';
import styles from './Register.module.scss';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [postCode, setPostCode] = useState('');
    const [role, setRole] = useState(['NormalUser']);
    const [file, setFile] = useState()
    const [fullName, setFullName] = useState("")
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Register failed',
            description: type === "success" ?
                'Register successful' : 'Please check all fields again!',
            duration: 1.5
        });
    };

    const handleFile = (e) => {
        let file = e.target.files[0];
        setFile(file);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            openNotificationWithIcon("error")
        } else {
            let userDTO = {
                userName: username,
                password: password,
                email: email,
                address: address,
                phoneNumber: phone,
                streetNumber: streetNumber,
                postCode: postCode,
                rolesNames: role,
                fullName: fullName
            }
            const json = JSON.stringify(userDTO);
            const blob = new Blob([json], {
                type: 'application/json'
            });
            const formData = new FormData();
            formData.append('userDTO', blob)
            formData.append('multipartFiles', file)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Content-Length': '<calculated when request is sent>'
                }
            }
            request.post("user/new", formData, config).then(() => {
                openNotificationWithIcon("success")
                setTimeout(() => {
                    navigate('/login');
                }, 2000)
            })
                .catch(() => {
                    openNotificationWithIcon("error")
                })
        }
    }
    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('container')}>
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <div className={cx('title')}>
                        <h2>Register</h2>
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter username"
                            className={cx('input')}
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter fullname"
                            autocomplete="off"
                            className={cx('input')}
                            type="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter password"
                            autocomplete="off"
                            className={cx('input')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter repassword"
                            className={cx('input')}
                            type="password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter email"
                            className={cx('input')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faMapLocation} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter address"
                            className={cx('input')}
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faPhoneSquareAlt} style={{ marginRight: 8 }} />
                        <input
                            placeholder="Enter phone number"
                            className={cx('input')}
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <FontAwesomeIcon icon={faImage} style={{ marginRight: 8 }} />
                        <p style={{ margin: '0 10px' }}>Avatar</p>
                        <input type="file" name="file" onChange={e => handleFile(e)} />
                    </div>
                    <button type="submit" className={cx('register-btn')}>
                        REGISTER
                    </button>
                    <div>
                        Do you have an account?{' '}
                        <Link to="/login" style={{ color: 'blue' }}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
