import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import style from './SystemInfo.scss';

const SystemInfo = ({
  stake,
  count,
  price,
  updateStake,
  setSystemBetCount,
}) => {
  useEffect(() => {
    setSystemBetCount(count);
  }, [count]);

  const potentialWin = (price * stake).toFixed(
    settings.stakeDecimalPlaceDisplay,
  );

  const handleStakeInputChange = newStake => {
    updateStake(newStake);
  };

  const totalCost = count * stake;

  return (
    <>
      <div className={style.section}>
        <StakeInput
          className={style.stakeInput}
          stake={stake}
          onChange={handleStakeInputChange}
        />
        <StakeInput stake={totalCost} readOnly placeholder="Total Stake" />
      </div>
      <div className={style.section}>
        <span>
          <span className={style.label}>
            <FormattedMessage {...dynamicMessage('Odds')} />:
          </span>
          <span>{` : ${price.toFixed(
            settings.priceDecimalPlaceDisplay,
          )}`}</span>
        </span>
        <span>
          <span className={style.label}>
            <FormattedMessage {...dynamicMessage('Potential win')} />
          </span>
          <span>{` : ${potentialWin} ¥`}</span>
        </span>
      </div>
    </>
  );
};

SystemInfo.propTypes = {
  stake: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  updateStake: PropTypes.func.isRequired,
  setSystemBetCount: PropTypes.func.isRequired,
};

export default SystemInfo;
