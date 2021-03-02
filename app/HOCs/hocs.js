/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransition } from 'react-transition-group';

export const withCSSTransition = (WrappedComponent, className) => props => (
  <CSSTransition
    in={props.in}
    timeout={300}
    appear
    unmountOnExit
    classNames={className}
  >
    <WrappedComponent {...props} />
  </CSSTransition>
);
