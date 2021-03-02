import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Pagination.scss';

const Pagination = ({ count, rowsPerPage, currentPage, onChange }) => {
  const maxPage = Math.ceil(count / rowsPerPage);

  const handleButtonClick = page => () => {
    let targetPage = page;
    if (page < 1) {
      targetPage = 1;
    } else if (page > maxPage) {
      targetPage = maxPage;
    }
    onChange(targetPage);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= maxPage; i += 1) {
      const isActive = currentPage === i;
      pages.push(
        <button
          key={i}
          type="button"
          className={classNames(isActive && style.active)}
          onClick={handleButtonClick(i)}
        >
          <span>{i}</span>
        </button>,
      );
    }
    return pages;
  };

  return <div className={style.container}>{renderPages()}</div>;
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
