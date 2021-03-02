import React from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './MultipleInfo.scss';

const MultipleInfo = ({ price, stake, updateStake }) => {
  const potentialWin = (price * stake).toFixed(
    settings.stakeDecimalPlaceDisplay,
  );

  const handleStakeInputChange = newStake => {
    updateStake(newStake);
  };

  return (
    <>
      <div className={style.section}>
        <StakeInput stake={stake} onChange={handleStakeInputChange} />
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
          <span>{` : ${potentialWin}¥`}</span>
        </span>
      </div>
    </>
  );
};

MultipleInfo.propTypes = {
  stake: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number.isRequired,
  updateStake: PropTypes.func.isRequired,
};

export default MultipleInfo;
