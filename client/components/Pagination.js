/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
const Pagination = ({ postPerPage, totalPosts, paginate, location }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Link
              className="pagination-link"
              onClick={() => paginate(number)}
              to={location}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
