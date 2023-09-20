import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartShopping, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserPopper.module.scss';
import { logout } from '../../actions/userAction';

const cx = classNames.bind(styles);

const USER_POPPER = [
    {
        to: '/user',
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
    },
    {
        to: '/cart',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'View Cart',
    },
    {
        to: '/history-order',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Order History',
    },
    {
        to: '/booking',
        icon: <FontAwesomeIcon icon={faVideoCamera} />,
        title: 'View booking',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log Out',
        separate: true,
    },
];

const SHIPPER_POPPER = [
    {
        to: '/user',
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
    },
    {
        to: '/list-order',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Delivery List',
    },
    {
        to: '/my-list-order',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'My Delivery List',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log Out',
        separate: true,
    },
];

const ADMIN_POPPER = [
    {
        to: '/user',
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
    },
    {
        to: '/customer-list',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Manage customer list',
    },
    {
        to: '/shop-list',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Manage shop list',
    },
    {
        to: '/shipper-list',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Manage shipper list',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log Out',
        separate: true,
    },
];

const SHOP_POPPER = [
    {
        to: '/user',
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View Profile',
    },
    {
        to: '/list-patients',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'List Of Patients',
    },
    {
        to: '/drug-order-list',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Drug Order List',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log Out',
        separate: true,
    },
    {
        to: '/booking',
        icon: <FontAwesomeIcon icon={faVideoCamera} />,
        title: 'View Booking',
    },
];

function UserPopper({ children }) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const defaultFn = () => { };
    const handleLogOut = () => {
        dispatch(logout());
    };
    let POPPER = [];
    const renderItems = () => {
        if (userInfo.roles === 'Admin') {
            POPPER = ADMIN_POPPER;
        } else if (userInfo.roles === 'User') {
            POPPER = USER_POPPER;
        } else if (userInfo.roles === 'Shipper') {
            POPPER = SHIPPER_POPPER;
        } else if (userInfo.roles === 'Shop') {
            POPPER = SHOP_POPPER;
        }
        return USER_POPPER.map((item, index) => {
            return (
                <div
                    className={cx('menu-item', {
                        separate: item.separate,
                    })}
                >
                    <Link
                        to={item.to}
                        key={index}
                        className={cx('btn-item')}
                        onClick={item.separate ? handleLogOut : defaultFn}
                    >
                        <span className={cx('icon-item')}>{item.icon}</span>
                        <span>{item.title}</span>
                    </Link>
                </div>
            );
        });
    };
    return (
        <HeadlessTippy
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <div className={cx('menu-popper')}>
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </div>
                </div>
            )}
            trigger="click"
        >
            {children}
        </HeadlessTippy>
    );
}

export default UserPopper;
