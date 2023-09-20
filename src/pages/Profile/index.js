import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import styles from './Profile.module.scss';
import request from '../../api/axios';

const cx = classNames.bind(styles);

function Profile() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [username, setUsername] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState("")
    const [identityNumber, setIdentityNumber] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [streetNumber, setStreetNumber] = useState("")
    const [postCode, setPostCode] = useState("")
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [file, setFile] = useState()
    useEffect(() => {
        setUsername(userData.userName ?? "");
        setFullName(userData.fullName ?? "");
        setEmail(userData.email ?? "");
        setAddress(userData.address ?? "");
        setIdentityNumber(userData.identityNumber ?? "");
        setPhoneNumber(userData.phoneNumber ?? "");
        setStreetNumber(userData.streetNumber ?? "");
        setPostCode(userData.postCode ?? "");
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === "success" ? "" : 'Update profile failed',
            description: type === "success" ?
                'Update profile successful' : 'Please check all fields again!',
            duration: 1.5
        });
    };
    const handleFile = (e) => {
        let file = e.target.files[0];
        setFile(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let userDTO = {
            userId: userData.userId,
            userName: username,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            streetNumber: streetNumber,
            postCode: postCode,
            fullName: fullname,
            identityNumber: identityNumber,
            roleNames: ["NormalUser"],
            deleted: false
        }
        const json = JSON.stringify(userDTO);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const formData = new FormData();
        formData.append('userDTO', blob)
        if (file) {
            formData.append('multipartFiles', file)
        }
        else {
            fetch(userData.identityCardUrl?.substring(1, userData.identityCardUrl.length - 1))
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "capture.png", {
                        type: 'image/png'
                    });
                    formData.append('multipartFiles', file)
                })
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            }
        }
        request.post("user/update", formData, config).then((res) => {
            openNotificationWithIcon("success")
            localStorage.setItem("userData", JSON.stringify(res.data))

        })
            .catch(() => {
                openNotificationWithIcon("error")
            })

    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('header')}>
                <h3>My Profile</h3>
            </div>
            <form className={cx('user-info')} onSubmit={handleSubmit}>
                <div className={cx('user-name')}>
                    <div className={cx('title')}>Username</div>
                    <input
                        className={cx('input-username')}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('full-name')}>
                    <div className={cx('title')}>Fullname</div>
                    <input
                        value={fullname}
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}
                        className={cx('input-fullname')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Email</div>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Address</div>
                    <input
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Identity Number</div>
                    <input
                        value={identityNumber}
                        onChange={(e) => {
                            setIdentityNumber(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Phone Number</div>
                    <input
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Street Number</div>
                    <input
                        value={streetNumber}
                        onChange={(e) => {
                            setStreetNumber(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Post Code</div>
                    <input
                        value={postCode}
                        onChange={(e) => {
                            setPostCode(e.target.value);
                        }}
                        className={cx('input-email')}
                        spellCheck={false}
                    />
                </div>
                <div className={cx('email')}>
                    <div className={cx('title')}>Avatar</div>
                    <input type="file" name="file" onChange={e => handleFile(e)} />
                </div>
                <div className={cx('role')}>
                    <div className={cx('title')}>Role</div>
                    <div style={{ color: 'gray' }}>{userInfo.roles}</div>
                </div>
                <div className={cx('save')}>
                    <button className={cx('save-btn')} type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
