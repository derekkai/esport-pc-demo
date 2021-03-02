import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import style from './MarketLock.scss';

const MarketLock = ({ isVertical = false }) => {
  return (
    <div className={classNames(style.container, isVertical && style.vertical)}>
      <div className={style.icon} />
      <span>
        <FormattedMessage {...dynamicMessage('Currently closed')} />
      </span>
    </div>
  );
};

MarketLock.propTypes = {
  isVertical: PropTypes.bool,
};

export default MarketLock;
