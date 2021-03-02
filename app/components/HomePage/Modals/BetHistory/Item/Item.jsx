import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import {
  betHistoryNoResultStateName,
  stakeDecimalPlaceDisplay,
} from 'settings';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Chip from 'components/ShareComponent/Chip/Chip';
import { timeConvert, getBetslipOnlySystemCount } from 'helpers/common';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import style from './Item.scss';

const Item = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    BetID,
    BettingDate,
    BetTypeName,
    BettingAmount,
    BetStateName,
    BettingResultAmount,
    TotalPrice,
    Selections,
    SystemMinCount,
  } = data;
  const { hours, day, minute, month } = timeConvert(BettingDate);
  const time = `${month}/${day} ${hours}:${minute}`;
  const haveResult = BetStateName !== betHistoryNoResultStateName;

  const handleArrowBtnClick = () => {
    setExpanded(prevState => !prevState);
  };

  const createPotentialWin = () => {
    if (BetTypeName === 'System') {
      const sysCount = getBetslipOnlySystemCount(
        Selections.length,
        SystemMinCount,
      );
      return ((BettingAmount / sysCount) * TotalPrice).toFixed(
        stakeDecimalPlaceDisplay,
      );
    }
    return (BettingAmount * TotalPrice).toFixed(stakeDecimalPlaceDisplay);
  };

  const resultAmount = haveResult
    ? BettingResultAmount.toFixed(stakeDecimalPlaceDisplay)
    : createPotentialWin();

  return (
    <ModalsTemplate.Item>
      <ModalsTemplate.ItemHeader
        className={style.header}
        arrowOnClick={handleArrowBtnClick}
        expanded={expanded}
      >
        <div>
          <div>
            <span>{`ID: ${BetID}`}</span>
          </div>
          <div>
            <span>{time}</span>
          </div>
        </div>
        <div>
          <span>
            <FormattedMessage {...dynamicMessage(BetTypeName)} />
          </span>
        </div>
        <div>
          <span>
            <FormattedMessage {...dynamicMessage('Stake')} />
          </span>
          <span>{` : ${BettingAmount} ¥`}</span>
        </div>
        <div>
          <span>
            {haveResult ? (
              <FormattedMessage {...dynamicMessage('Earn')} />
            ) : (
              <FormattedMessage {...dynamicMessage('Potential win')} />
            )}
          </span>
          <span>{` : ${resultAmount} ¥`}</span>
        </div>
        <div>
          <Chip size="sm" type={BetStateName} />
        </div>
      </ModalsTemplate.ItemHeader>
      <ModalsTemplate.ItemBody
        innerstyle={{
          height: expanded ? `${Selections.length * 40}px` : '0px',
        }}
      >
        <ul className={style.list}>
          {Selections.map(bet => {
            const {
              SportId,
              CompetitionName,
              MarketName,
              SelectionName,
              Price,
              BetSelState,
              Team1Name,
              Team2Name,
              Team1Id,
              Team2Id,
              MatchStartDate,
            } = bet;
            let selectionName = SelectionName;
            if (SelectionName.includes('W1')) selectionName = Team1Name;
            if (SelectionName.includes('W2')) selectionName = Team2Name;

            return (
              <li key={Team1Id + Team2Id + MatchStartDate}>
                <div>
                  <SportIcon
                    sportId={SportId}
                    className={style.sportIcon}
                    type="deep_blue"
                  />
                  <span>{CompetitionName}</span>
                </div>
                <div>
                  <span>{MarketName}</span>
                </div>
                <div>
                  <span>{selectionName}</span>
                </div>
                <div>
                  <span>
                    <FormattedMessage {...dynamicMessage('Odds')} />
                  </span>
                  <span>{` : ${Price}`}</span>
                </div>
                <div>
                  <span className={style[BetSelState]}>
                    <FormattedMessage {...dynamicMessage(BetSelState)} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </ModalsTemplate.ItemBody>
    </ModalsTemplate.Item>
  );
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Item;
