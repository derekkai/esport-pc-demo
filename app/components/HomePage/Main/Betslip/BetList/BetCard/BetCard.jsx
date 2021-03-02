import React, { useEffect } from 'react';
import settings from 'settings';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrevious } from 'helpers/customHooks';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import betslipLock from 'images/elements/btn_betlist_cancel_lock.png';
import style from './BetCard.scss';

const BetCard = ({
  status,
  eventId,
  sportId,
  pick,
  team1Name,
  team2Name,
  price,
  removeBet,
  gameId,
  betType,
  stake,
  marketName,
  updateSingleStake,
  setPriceNeverChange,
}) => {
  const prevPrice = usePrevious(price);
  const betName = `${team1Name} ${team2Name ? `vs ${team2Name}` : ''}`;
  const handleCloseBtnClick = () => {
    removeBet({ eventId, gameId });
  };
  const handleStakeInputChange = newStake => {
    updateSingleStake({ eventId, stake: newStake });
  };
  const eventNameConvert = () => {
    return pick.replace(/W1/i, team1Name).replace(/W2/i, team2Name);
  };

  useEffect(() => {
    if (prevPrice !== price) {
      setPriceNeverChange({ isChange: false });
    }
  }, [prevPrice, price]);

  return (
    <li>
      <div
        className={classNames(
          style.container,
          'border-animation',
          status === 'close' && style.close,
        )}
      >
        <div className={style.topArea}>
          {status === 'close' ? (
            <>
              <div className={style.warningIcon} />
              <div className={style.wraningText}>
                <FormattedMessage {...dynamicMessage('Bet is close.')} />
              </div>
            </>
          ) : (
            <>
              <SportIcon
                sportId={sportId}
                type="svg"
                className={style.sportIcon}
                viewBox="0 0 20 20"
              />
              <div className={style.betName}>{betName}</div>
            </>
          )}
          <div
            aria-hidden
            type="button"
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          />
        </div>
        <div className={style.middleArea}>
          <div className={style.marketName}>{marketName}</div>
          {price !== prevPrice && status !== 'close' && (
            <div
              className={classNames(
                style.prevPrice,
                price !== prevPrice && style.strikethrough,
              )}
            >
              {prevPrice}
            </div>
          )}
        </div>
        <div className={style.bottomArea}>
          <div className={style.pickEventName}>{eventNameConvert()}</div>
          {status === 'close' ? (
            <img src={betslipLock} alt="" />
          ) : (
            <div
              className={classNames(
                style.price,
                price > prevPrice && style.increase,
                price < prevPrice && style.decrease,
              )}
            >
              {price.toFixed(settings.priceDecimalPlaceDisplay)}
            </div>
          )}
        </div>
        {betType === 'single' && status !== 'close' && (
          <div className={style.inputArea}>
            <StakeInput stake={stake} onChange={handleStakeInputChange} />
          </div>
        )}
      </div>
    </li>
  );
};

BetCard.propTypes = {
  status: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  pick: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  removeBet: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  betType: PropTypes.string.isRequired,
  stake: PropTypes.number.isRequired,
  marketName: PropTypes.string.isRequired,
  updateSingleStake: PropTypes.func.isRequired,
  setPriceNeverChange: PropTypes.func.isRequired,
  team1Name: PropTypes.string,
  team2Name: PropTypes.string,
};

export default BetCard;
