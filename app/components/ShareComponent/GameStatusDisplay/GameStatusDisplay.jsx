import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './GameStatusDisplay.scss';

const GameStatusDisplay = ({ type, haveVideo, isDark = false, timestamp }) => {
  const current = new Date().getTime() / 1000;
  if (timestamp > current + 24 * 60 * 60) {
    return null;
  }
  const renderGameStatus = () => {
    if (haveVideo) return <div className={style.videoTag}>LIVE</div>;
    return type === 1 ? (
      <span>
        <FormattedMessage {...dynamicMessage('Live')} />
      </span>
    ) : (
      <span>
        <FormattedMessage {...dynamicMessage('Coming soon')} />
      </span>
    );
  };

  return (
    <div className={classNames(style.container, isDark && style.dark)}>
      {renderGameStatus()}
    </div>
  );
};

GameStatusDisplay.propTypes = {
  type: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  isDark: PropTypes.bool,
  timestamp: PropTypes.number.isRequired,
};

export default GameStatusDisplay;
