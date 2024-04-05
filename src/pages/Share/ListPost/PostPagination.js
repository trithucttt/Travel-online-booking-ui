import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Pagination.module.scss';

function Pagination({ currentPage, totalPage, onPageChange }) {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPage) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageDisplay = 3;
        const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);

        let startPage = 1;
        let endPage = totalPage;

        if (totalPage > maxPageDisplay) {
            if (currentPage <= halfMaxPageDisplay) {
                endPage = maxPageDisplay;
            } else if (currentPage >= totalPage - halfMaxPageDisplay) {
                startPage = totalPage - maxPageDisplay + 1;
            } else {
                startPage = currentPage - halfMaxPageDisplay;
                endPage = currentPage + halfMaxPageDisplay;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
                >
                    {i}
                </span>,
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <>
                    <span key="start-1" onClick={() => onPageChange(1)}>
                        1
                    </span>
                    <span key="end-ellipsis">...</span>
                </>,
            );
        }
        if (endPage < totalPage) {
            pageNumbers.push(
                <>
                    <span key="start-ellipsis">...</span>
                    <span key={`end-${totalPage}`} onClick={() => onPageChange(totalPage)}>
                        {totalPage}
                    </span>
                </>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevClick} className={styles.iconPrev} />
            {renderPageNumbers()}
            <FontAwesomeIcon icon={faChevronRight} onClick={handleNextClick} className={styles.iconPrev} />
        </div>
    );
}

export default Pagination;
