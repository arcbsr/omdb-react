import React from 'react';
import '../styles/Pagination.css';
import {FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(n => n + 1);

    return (
        <div className="pagination-container">
            <FaChevronLeft
              className={`nav-icon ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => onPageChange(currentPage-1)}
            />
            <div className="page-indicator">
                <span className="page-text">Page {currentPage}</span>
                <span className="total-pages-text">of {totalPages}</span>
            </div>
            <FaChevronRight
              className={`nav-icon ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => onPageChange(currentPage+1)}
            />
            {/* {pages.map(page => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))} */}
        </div>
    );
};

export default Pagination;
