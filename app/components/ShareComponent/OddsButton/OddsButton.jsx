import React from 'react';
import PropTypes from 'prop-types';
import { usePrevious, useOddsStatus } from 'helpers/customHooks';
import settings from 'settings';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';

const OddsButton = ({
  callBack = () => {},
  delayMS = 0,
  sportId,
  price,
  skinId,
  isInBetslip,
  requestAddBet,
  removeBet,
  marketId,
  gameId,
  eventId,
  marketType,
  team1Name,
  team2Name,
  pick,
  position,
  marketName,
}) => {
  const prePrice = usePrevious(price);
  const [oddsStatus, isArrowUp] = useOddsStatus(price, prePrice, isInBetslip);

  const handleBtnClick = () => {
    if (!isInBetslip) {
      callBack();
      setTimeout(() => {
        requestAddBet({
          sportId,
          marketId,
          gameId,
          pick,
          eventId,
          team1Name,
          team2Name,
          marketType,
          price,
          marketName,
        });
      }, delayMS);
    } else {
      removeBet({ eventId, gameId });
    }
  };

  return (
    <SmartButton
      isArrowUp={isArrowUp.current}
      position={position}
      text={price.toFixed(settings.priceDecimalPlaceDisplay)}
      skinId={skinId}
      status={oddsStatus.current}
      onClick={handleBtnClick}
    />
  );
};

OddsButton.propTypes = {
  callBack: PropTypes.func,
  delayMS: PropTypes.number,
  sportId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  skinId: PropTypes.number.isRequired,
  isInBetslip: PropTypes.bool.isRequired,
  requestAddBet: PropTypes.func.isRequired,
  removeBet: PropTypes.func.isRequired,
  marketId: PropTypes.number,
  gameId: PropTypes.number.isRequired,
  eventId: PropTypes.number,
  marketType: PropTypes.string,
  team1Name: PropTypes.string,
  team2Name: PropTypes.string,
  pick: PropTypes.string.isRequired,
  position: PropTypes.string,
  marketName: PropTypes.string,
};

export default OddsButton;
