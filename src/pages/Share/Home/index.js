import React, { useState } from 'react';
import withLayout from '../../../Components/Layout/withLayout';
import Search from '../Search';
import Post from '../ListPost';

import styles from './home.module.scss';
import Banner from './Banner';
function Home() {
    const [searchPost, setSearchPost] = useState([]);
    // const [sortPost, setSortPost] = useState([]);
    // const [valueSort, setValueSort] = useState('');
    return (
        <div>
            <div className={styles.bannerItem}>
                <Banner />
            </div>
            <div className={styles.searchItem}>
                <Search onSearch={setSearchPost} />
            </div>
            <div>
                <Post searchPost={searchPost} />
            </div>
        </div>
    );
}

export default withLayout(Home);
