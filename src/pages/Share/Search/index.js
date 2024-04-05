import styles from './search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
function Search({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () => {
        // alert(searchValue);
        // const data = await apiService.request('get', `search/title?name=${searchValue}`);
        // console.log(data);
        // onSearch(data);
        onSearch(searchValue);
    };

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchContainer}>
                <div className={styles.searchHeader}>
                    <label>Name tour or name post</label>
                    <div className={styles.searchControl}>
                        <Form.Control
                            type="text"
                            placeholder="Name tour or name post"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className={styles.searchIcon} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
                <div className={styles.searchBody}>
                    <div className={styles.startTime} md="4">
                        <label>Start_time</label>
                        <Form.Control className={styles.inputTime} type="date" />
                    </div>
                    <div className={styles.endTime} md="4">
                        <label>End_time</label>
                        <Form.Control className={styles.inputTime} type="date" />
                    </div>
                    {/* <div className={styles.totalDay} md="4">
                        <label>Sort by</label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => handleSortPost(e.target.value)}
                        >
                            <option value="Default">Default</option>
                            <option value="Price">Price</option>
                             <option value="Discount">Discount</option> 
                            <option value="Name">Name</option>
                        </Form.Select>
                    </div> */}
                </div>
                {/* <Button variant="info">
                    Search <FontAwesomeIcon icon={faSearch} />
                </Button> */}
            </div>
        </div>
    );
}

export default Search;
