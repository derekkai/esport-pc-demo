import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import style from './SingleInfo.scss';

const SingleInfo = ({ totalSingleStake, totalPotentialWin, count }) => {
  return (
    <div className={style.container}>
      <span>
        <FormattedMessage
          {...dynamicMessage('{0} bets, Total {1} ¥')}
          values={{ 0: count, 1: totalSingleStake }}
        />
      </span>
      <span>
        <span className={style.label}>
          <FormattedMessage {...dynamicMessage('Potential win')} />
        </span>
        {` : ${totalPotentialWin} ¥`}
      </span>
    </div>
  );
};

SingleInfo.propTypes = {
  totalSingleStake: PropTypes.number.isRequired,
  totalPotentialWin: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
export default SingleInfo;
