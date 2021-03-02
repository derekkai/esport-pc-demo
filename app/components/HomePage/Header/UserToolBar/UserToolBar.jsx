import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import style from './UserToolBar.scss';
import NewsContainer from './News/NewsContainer';

const UserToolBar = ({
  balance,
  requestUserInfo,
  isLogin,
  account,
  openModal,
  switchClassifier,
}) => {
  const handleBalanceHistoryBtnClick = () => {
    openModal('balanceHistory');
  };

  const handleBetHistoryBtnClick = () => {
    openModal('betHistory');
  };

  const handleMenuBtnClick = () => {
    switchClassifier({
      moveOut: true,
    });
  };

  useEffect(() => {
    if (isLogin) requestUserInfo();
  }, [isLogin]);

  return (
    <div className={style.container}>
      <div className={style.logoBlock}>
        <button
          type="button"
          className={style.menuBtn}
          onClick={handleMenuBtnClick}
        >
          <div />
        </button>
        <div className={style.logo} />
      </div>
      <NewsContainer />
      {isLogin && (
        <div className={style.userToolBlock}>
          <span>{account}</span>
          <span>
            <span>
              <FormattedMessage {...dynamicMessage('Balance')} />
            </span>
            <span>{`: ${balance}￥`}</span>
          </span>
          <SmartButton
            text="Balance history"
            skinId={1}
            onClick={handleBalanceHistoryBtnClick}
          />
          <SmartButton
            text="Bet history"
            skinId={1}
            onClick={handleBetHistoryBtnClick}
          />
        </div>
      )}
    </div>
  );
};

UserToolBar.propTypes = {
  balance: PropTypes.number,
  requestUserInfo: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  account: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default UserToolBar;
