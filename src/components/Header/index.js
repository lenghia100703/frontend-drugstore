import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import NotiPopper from '../NotiPopper';
import UserPopper from '../UserPopper';
import ManagerPopper from '../ManagerPopper';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userData = JSON.parse(localStorage.getItem("userData"))
    const imageUrls = userData?.identityCardUrl
    const imageUrl = imageUrls?.substring(1, imageUrls.length - 1)
    const role = userData?.roleNames ?? []

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <h2>ODC19</h2>
                        </Link>
                    </div>
                </div>
                <div className={cx('right')}>
                    {userInfo ? (
                        <div className={cx('user')}>
                            <ManagerPopper shop={true} >
                                <div className={cx('manager')} style={(role.includes("ShopOwner")) ? { display: "block" } : { display: "none" }}>
                                    Shop Owner
                                    <span style={{ fontSize: 20, marginBottom: 4, marginLeft: 4 }}>
                                        <FontAwesomeIcon icon={faSortDown} />
                                    </span>
                                </div>
                            </ManagerPopper>
                            <ManagerPopper shop={false}>
                                <div className={cx('manager')} style={role.includes("Admin") ? { display: "block" } : { display: "none" }}>
                                    Manage
                                    <span style={{ fontSize: 20, marginBottom: 4, marginLeft: 4 }}>
                                        <FontAwesomeIcon icon={faSortDown} />
                                    </span>
                                </div>
                            </ManagerPopper>
                            <NotiPopper>
                                <div className={cx('icon-search')}>
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                            </NotiPopper>
                            <UserPopper>
                                <img
                                    src={imageUrl}
                                    className={cx('avt-user')}
                                />
                            </UserPopper>
                        </div>
                    ) : (
                        <div className={cx('login')}>
                            <Link to="/login" className={cx('login-btn')}>
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
