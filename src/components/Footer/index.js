import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')} style={{ zIndex: "999" }}>
            <div className={cx('inner')}>Copyright &copy; 2022 ODC19</div>
        </div>
    );
}

export default Footer;
