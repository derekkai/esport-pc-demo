import React from 'react';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import { timeConvert } from 'helpers/common';
import style from './GameInfo.scss';

const GameInfo = ({
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  sportId,
  competitionName,
  market,
  startTs,
  gameId,
  type,
  team1Score,
  team2Score,
  haveVideo,
  marketsCount,
}) => {
  let team1Price = 0;
  let team2Price = 0;
  let drawPrice = 0;
  let team1EventId;
  let team2EventId;
  let drawEventId;
  let team1EventName = '';
  let team2EventName = '';
  let drawEventName = '';

  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;

  const events = Object.values(market?.event || {}).sort(
    (a, b) => a.order - b.order,
  );

  if (market?.market_type === 'MatchWinner') {
    team1Price = events[0]?.price || 0;
    team1EventId = events[0]?.id || undefined;
    team1EventName = events[0]?.name || '';
    team2Price = events[1]?.price || 0;
    team2EventId = events[1]?.id || undefined;
    team2EventName = events[1]?.name || '';
  } else if (market?.market_type === 'MatchResult') {
    team1Price = events[0]?.price || 0;
    team1EventId = events[0]?.id || undefined;
    team1EventName = events[0]?.name || '';
    drawPrice = events[1]?.price || 0;
    drawEventId = events[1]?.id || undefined;
    drawEventName = events[1]?.name || '';
    team2Price = events[2]?.price || 0;
    team2EventId = events[2]?.id || undefined;
    team2EventName = events[2]?.name || '';
  }

  return (
    <div className={style.container}>
      <div className={style.scoreBg} />
      <div className={classNames(style.flag, style.left)}>
        <div className={style.circle}>
          <TeamIcon teamId={team1Id} teamName={team1Name} />
        </div>
        <div className={style.teamName}>
          <div className={style.text}>{team1Name}</div>
        </div>
      </div>
      <div className={style.middleArea}>
        <div className={style.header}>
          <div className={style.title}>
            <FormattedMessage
              {...dynamicMessage(market?.name || 'Match Winner')}
            />
          </div>
        </div>
        <div className={style.body}>
          <div className={style.top}>
            <SportIcon
              sportId={sportId}
              className={style.sportIcon}
              type="light_blue"
            />
            <div>{competitionName}</div>
          </div>
          <div className={style.middle}>
            <OddsButtonContainer
              sportId={sportId}
              price={team1Price}
              skinId={4}
              gameId={gameId}
              marketId={market?.id}
              eventId={team1EventId}
              marketType={market?.market_type}
              marketName={market?.name}
              team1Name={team1Name}
              team2Name={team2Name}
              pick={team1EventName}
            />
            {market?.market_type === 'MatchResult' ? (
              <OddsButtonContainer
                sportId={sportId}
                price={drawPrice}
                skinId={4}
                gameId={gameId}
                marketId={market?.id}
                eventId={drawEventId}
                marketType={market?.market_type}
                marketName={market?.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={drawEventName}
              />
            ) : (
              <div className={style.score}>
                <div className={style.team1Score}>{team1Score}</div>
                <div className={style.divider}>:</div>
                <div className={style.team2Score}>{team2Score}</div>
              </div>
            )}
            <OddsButtonContainer
              sportId={sportId}
              price={team2Price}
              skinId={4}
              gameId={gameId}
              marketId={market?.id}
              eventId={team2EventId}
              marketType={market?.market_type}
              marketName={market?.name}
              team1Name={team1Name}
              team2Name={team2Name}
              pick={team2EventName}
            />
          </div>
          <div className={style.bottom}>
            <GameStatusDisplay
              haveVideo={haveVideo}
              type={type}
              isDark
              timestamp={startTs}
            />
            {market?.market_type === 'MatchResult' && (
              <div
                className={style.miniScore}
              >{`${team1Score} : ${team2Score}`}</div>
            )}
          </div>
        </div>
        <div className={style.footer}>
          <div>
            <FormattedMessage {...dynamicMessage(time)} />
          </div>
          <MoreInfoButtonContainer
            type="video"
            disable={!haveVideo}
            gameId={gameId}
          />
          <MoreInfoButtonContainer
            type="market"
            dataType="upcoming"
            disable={marketsCount === 0}
            gameId={gameId}
            sportId={sportId}
          />
        </div>
      </div>
      <div className={classNames(style.flag, style.right)}>
        <div className={style.circle}>
          <TeamIcon teamId={team2Id} teamName={team2Name} />
        </div>
        <div className={style.teamName}>
          <div className={style.text}>{team2Name}</div>
        </div>
      </div>
    </div>
  );
};

GameInfo.propTypes = {
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  competitionName: PropTypes.string,
  market: PropTypes.object,
  startTs: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  marketsCount: PropTypes.number.isRequired,
};

export default GameInfo;
