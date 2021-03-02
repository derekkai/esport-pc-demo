import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './BetslipInfo.scss';
import SingleInfoContainer from './SingleInfo/SingleInfoContainer';
import MultipleInfoContainer from './MultipleInfo/MultipleInfoContainer';
import SystemInfoContainer from './SystemInfo/SystemInfoContainer';

const BetslipInfo = ({
  betCount,
  betType,
  priceChangeHandleType,
  priceNeverChange,
  requestDoBet,
}) => {
  const handleDoBetBtnClick = () => {
    requestDoBet();
  };
  const renderInfo = () => {
    switch (betType) {
      case 'single':
        return <SingleInfoContainer />;
      case 'multiple':
        return <MultipleInfoContainer />;
      case 'system':
        return <SystemInfoContainer />;
      default:
        return undefined;
    }
  };

  return (
    <div className={classNames(style.container, betCount === 0 && style.hide)}>
      {renderInfo()}
      <button
        type="button"
        className={style.placeBetsBtn}
        onClick={handleDoBetBtnClick}
      >
        <span>
          {!priceNeverChange && priceChangeHandleType !== 'free' ? (
            <FormattedMessage
              {...dynamicMessage('Accept changes and place bets.')}
            />
          ) : (
            <FormattedMessage {...dynamicMessage('Place bets!')} />
          )}
        </span>
      </button>
    </div>
  );
};

BetslipInfo.propTypes = {
  betCount: PropTypes.number.isRequired,
  betType: PropTypes.string.isRequired,
  priceChangeHandleType: PropTypes.string.isRequired,
  priceNeverChange: PropTypes.bool.isRequired,
  requestDoBet: PropTypes.func.isRequired,
};

export default BetslipInfo;
