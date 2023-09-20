import classNames from 'classnames/bind';

import styles from './DrugStoreList.module.scss';
import DrugStoreItem from '../../components/DrugStoreItem';

const cx = classNames.bind(styles);

function DrugStoreList() {
    const data = JSON.parse(localStorage.getItem('searchResults'));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {data.length > 0 ? (
                    <div className={cx('item')}>
                        {data.map((item, index) => (
                            <DrugStoreItem data={item} key={index} />
                        ))}
                    </div>
                ) : (
                    <h1>Not Found</h1>
                )}
            </div>
        </div>
    );
}

export default DrugStoreList;
