// Pagination.js
import React from 'react';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
];

function PaginationItem({ currentPage, totalPage, itemsPerPage, onPrevious, onNext, onItemsPerPageChange }) {
    return (
        <div className="p-4 flex justify-end">
            <div className="flex items-center space-x-2">
                <select
                    className="w-28 h-8 border border-slate-600 rounded-lg outline-none text-center"
                    onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
                    value={itemsPerPage.value}
                >
                    {options.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <span className="px-3 py-1">
                    Page {currentPage} of {totalPage}
                </span>
                <button
                    className="px-3 py-1 border border-gray-400 rounded text-gray-600 hover:bg-gray-200"
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                >
                    <KeyboardDoubleArrowLeft />
                </button>
                <button
                    className="px-3 py-1 border border-gray-400 rounded text-gray-600 hover:bg-gray-200"
                    onClick={onNext}
                    disabled={currentPage === totalPage}
                >
                    <KeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    );
}

export default PaginationItem;
