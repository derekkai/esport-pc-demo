import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Checkbox.scss';

const Checkbox = ({ isSelect, onClick = () => {}, shape, className }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      aria-hidden
      onClick={handleClick}
      type="button"
      className={classNames(
        className,
        style.button,
        isSelect && style.selected,
        style[shape],
      )}
    />
  );
};

Checkbox.propTypes = {
  isSelect: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  shape: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
