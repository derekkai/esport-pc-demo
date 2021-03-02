import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Modals.scss';
import BalanceHistoryContainer from './BalanceHistory/BalanceHistoryContainer';
import BetHistoryContainer from './BetHistory/BetHistoryContainer';
import NewsContainer from './News/NewsContainer';
import Offline from './Offline/Offline';

const Modals = ({ modal, offline }) => {
  return (
    <React.Fragment>
      <div
        className={classNames(
          style.mask,
          (modal !== '' || offline) && style.visible,
        )}
      >
        <BalanceHistoryContainer />
        <BetHistoryContainer />
        <NewsContainer />
        {offline && <Offline />}
      </div>
    </React.Fragment>
  );
};

Modals.propTypes = {
  modal: PropTypes.string.isRequired,
  offline: PropTypes.bool.isRequired,
};

export default Modals;
