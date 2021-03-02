import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Arrow.scss';

const Arrow = ({ className, active, onClick, forceDirection }) => {
  return (
    <div
      aria-hidden
      className={classNames(
        className,
        style.arrow,
        active && style.active,
        forceDirection && style[forceDirection],
      )}
      onClick={onClick}
    />
  );
};

Arrow.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  forceDirection: PropTypes.string,
};

export default Arrow;
