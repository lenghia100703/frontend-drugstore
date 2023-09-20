import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import SearchItem from './SearchItem';
import useDebounce from '../../hooks/useDebounce';
import request from '../../api/axios';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);
    const navigate = useNavigate();
    const searchRef = useRef();

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue('');
        searchRef.current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            localStorage.setItem('searchResults', JSON.stringify(searchResult));
            navigate(`/medical-shop/search/keyword=${searchValue}`);
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        request
            .get('medical-shop/search', {
                params: {
                    searchParam: debounced,
                },
            })
            .then((res) => {
                console.log(res.data);
                setSearchResult(res.data);
                setLoading(false);
            });
    }, [debounced]);

    return (
        <HeadlessTippy
            placement="bottom"
            interactive={true}
            offset={[0, 0]}
            visible={searchResult.length > 0 && showResults}
            render={(attrs) => (
                <div tabIndex="-1" {...attrs} className={cx('wrapper-popper')}>
                    {searchResult.slice(0, 5).map((item, index) => (
                        <SearchItem key={index} data={item} />
                    ))}
                </div>
            )}
            onClickOutside={() => setShowResults(false)}
        >
            <form className={cx('form-search')} onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    value={searchValue}
                    onChange={handleSearch}
                    onFocus={() => setShowResults(true)}
                    placeholder="Find pharmacy, drug stores..."
                    className={cx('input-search')}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}
                <button className={cx('search-btn')} type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                </button>
            </form>
        </HeadlessTippy>
    );
}

export default Search;
