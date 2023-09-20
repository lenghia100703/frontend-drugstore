import classNames from 'classnames/bind';
import { useState } from 'react';
import { notification } from 'antd';
import styles from './Password.module.scss';
import request from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../actions/userAction';
const cx = classNames.bind(styles);

function Password() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Change password failed',
            description: type === "success" ?
                'Change password successful' : 'Please check your current password again!',
            duration: 1.5
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (oldPassword === '' || newPassword === '' || reNewPassword === '') {
            openNotificationWithIcon("error")
        } else if (newPassword !== reNewPassword) {
            openNotificationWithIcon("error")
        }
        else {
            let userDTO = {
                "userId": userData.userId,
                "password": newPassword,
                "oldPassword": oldPassword
            }

            request.put("user/password/update", userDTO,
                {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).access_token
                    }
                }
            ).then(() => {
                openNotificationWithIcon("success")
                setTimeout(() => {
                    dispatch(changePassword())
                    navigate("/login")
                }, 2000)
            })
                .catch(() => {
                    openNotificationWithIcon("error")
                })
        }
    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('header')}>
                <h3>Change Password</h3>
            </div>
            <form className={cx('user-info')} onSubmit={handleSubmit}>
                <div className={cx('old-password')}>
                    <div className={cx('title')}>Current Password</div>
                    <input
                        className={cx('input-name')}
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className={cx('new-password')}>
                    <div className={cx('title')}>New Password</div>
                    <input
                        className={cx('input-name')}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={cx('check-password')}>
                    <div className={cx('title')}>Confirm Password</div>
                    <input
                        className={cx('input-name')}
                        type="password"
                        value={reNewPassword}
                        onChange={(e) => setReNewPassword(e.target.value)}
                    />
                </div>
                <div className={cx('save')}>
                    <button className={cx('save-btn')} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Password;
