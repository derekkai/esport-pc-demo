import React from 'react';
import PropTypes from 'prop-types';
import light from 'images/elements/loading_light.gif';
import dark from 'images/elements/loading_dark.gif';

const Loading = ({ isDark = false, className }) => {
  return (
    <img className={className} src={isDark ? dark : light} alt="loading" />
  );
};

Loading.propTypes = {
  isDark: PropTypes.bool,
  className: PropTypes.string,
};

export default Loading;
