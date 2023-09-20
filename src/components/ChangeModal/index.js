import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ChangeModal.module.scss';

const cx = classNames.bind(styles);

function ChangeModal({ onOpen, data }) {
    const [username, setUsername] = useState(data.userName);
    const [password, setPassword] = useState(data.password);
    const [fullname, setFullName] = useState(data.fullName);
    const [email, setEmail] = useState(data.email);
    const handleSubmit = () => {};
    return (
        <div className={cx('dark-bg')} onClick={() => onOpen(false)}>
            <div
                className={cx('container')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form className={cx('content')} onSubmit={handleSubmit}>
                    <h2 className={cx('header')}>Update account</h2>
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
                    <div className={cx('pass-word')}>
                        <div className={cx('title')}>Password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className={cx('input-password')}
                            spellCheck={false}
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
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className={cx('input-email')}
                            spellCheck={false}
                        />
                    </div>
                    <div className={cx('save')}>
                        <button className={cx('save-btn')} type="submit">
                            OK
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangeModal;
