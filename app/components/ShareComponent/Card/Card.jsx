import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Card.scss';

/* eslint-disable react/no-multi-comp */
const Card = forwardRef(({ className, children }, ref) => (
  <div className={classNames(style.container, className)} ref={ref}>
    {children}
  </div>
));

Card.Header = forwardRef(({ className, children }, ref) => (
  <div className={classNames(style.header, className)} ref={ref}>
    {children}
  </div>
));

Card.Body = forwardRef(({ className, children, innerstyle }, ref) => (
  <div
    style={innerstyle}
    className={classNames(style.body, className)}
    ref={ref}
  >
    {children}
  </div>
));

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  innerstyle: PropTypes.object,
};

export default Card;
