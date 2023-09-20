import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

import styles from './SidebarUser.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SidebarUser() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const imageUrls = JSON.parse(localStorage.getItem("userData")).identityCardUrl
    const imageUrl = imageUrls?.substring(1, imageUrls.length - 1)
    console.log(imageUrl)
    return (
        <div className={cx('sidebar-user')}>
            <div className={cx('user-name')}>
                <Link to="/user">
                    <img
                        className={cx('user-avt')}
                        style={{ width: '100px', height: '100px' }}
                        src={imageUrl}
                    />
                </Link>
                <div className={cx('name-title')}>{userInfo.fullName}</div>
            </div>
            <NavLink to="/user" className={(nav) => cx('profile', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faUser} />
                <div style={{ fontSize: 16, marginLeft: 8 }}>My Account</div>
            </NavLink>
            <NavLink to="/password" className={(nav) => cx('change-password', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faKeyboard} />
                <div style={{ fontSize: 16, marginLeft: 8 }}>Change Password</div>
            </NavLink>
        </div>
    );
}

export default SidebarUser;
