import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import style from './SmartButton.scss';

const SmartButton = React.memo(
  ({
    position,
    isArrowUp,
    className,
    onClick = () => {},
    skinId,
    status = 'normal',
    text,
  }) => {
    const handleClick = e => {
      if (status !== 'lock') {
        onClick(e);
        e.stopPropagation();
      }
    };

    const createText = () => {
      if (!text && text !== 0) {
        return '';
      }
      return <FormattedMessage {...dynamicMessage(text)} />;
    };

    let direction = '';
    if (isArrowUp !== '') {
      direction = isArrowUp ? 'up' : 'down';
    }

    return (
      <button
        type="button"
        className={classNames(
          className,
          style[`skin${skinId}`],
          style[`skin${skinId}-${status}`],
          direction === '' || style[direction],
          position ? style[position] : style.noArrow,
          style.container,
        )}
        onClick={handleClick}
      >
        {status !== 'lock' && <span>{createText()}</span>}
      </button>
    );
  },
);

SmartButton.propTypes = {
  position: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  skinId: PropTypes.number.isRequired,
  status: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SmartButton;
