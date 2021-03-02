import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import style from './Chip.scss';

const Chip = ({ className, size = 'sm', type, text }) => {
  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[size],
        className,
      )}
    >
      <span>
        <FormattedMessage {...dynamicMessage(text || type)} />
      </span>
    </div>
  );
};

Chip.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Chip;
