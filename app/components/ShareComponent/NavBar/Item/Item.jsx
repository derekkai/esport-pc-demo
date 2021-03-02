import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import style from './Item.scss';

const Item = ({ text, active, value, onClick, disable }) => {
  const handleBtnClick = e => {
    if (!disable) {
      onClick(value)(e);
    }
  };
  return (
    <li className={style.container}>
      <button
        className={classNames(active && style.active, disable && style.disable)}
        type="button"
        onClick={handleBtnClick}
      >
        <span>
          <FormattedMessage {...dynamicMessage(text)} />
        </span>
      </button>
    </li>
  );
};

Item.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Item;
