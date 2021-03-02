import React from 'react';
import PropTypes from 'prop-types';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './Market.scss';

const Market = ({
  market,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  gameId,
  sportId,
}) => {
  return (
    <ul className={style.list}>
      {market &&
        Object.values(market)
          .filter(el => {
            if (!el) return false;
            return (
              el?.market_type !== 'MatchWinner' &&
              el?.market_type !== 'MatchResult'
            );
          })
          .map(el => {
            const events = Object.values(el?.event || {}).sort(
              (a, b) => a.order - b.order,
            );

            const team1Price = events[0]?.price || 0;
            const team1EventId = events[0]?.id || undefined;
            const team1EventName = events[0]?.name || '';
            const team2Price = events[1]?.price || 0;
            const team2EventId = events[1]?.id || undefined;
            const team2EventName = events[1]?.name || '';

            return (
              <li key={el.id}>
                <div className={style.title}>
                  <span>{el.name}</span>
                </div>
                <div className={style.section}>
                  <TeamIcon
                    className={style.teamIcon}
                    teamId={team1Id}
                    teamName={team1Name}
                  />
                  <span>{team1Name}</span>
                  <OddsButtonContainer
                    sportId={sportId}
                    price={team1Price}
                    skinId={5}
                    gameId={gameId}
                    marketId={el.id}
                    eventId={team1EventId}
                    marketType={el.market_type}
                    marketName={el.name}
                    team1Name={team1Name}
                    team2Name={team2Name}
                    pick={team1EventName}
                  />
                </div>
                <div className={style.section}>
                  <TeamIcon
                    className={style.teamIcon}
                    teamId={team2Id}
                    teamName={team2Name}
                  />
                  <span>{team2Name}</span>
                  <OddsButtonContainer
                    sportId={sportId}
                    price={team2Price}
                    skinId={5}
                    gameId={gameId}
                    marketId={el.id}
                    eventId={team2EventId}
                    marketType={el.market_type}
                    marketName={el.name}
                    team1Name={team1Name}
                    team2Name={team2Name}
                    pick={team2EventName}
                  />
                </div>
              </li>
            );
          })}
    </ul>
  );
};

Market.propTypes = {
  market: PropTypes.object,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
};

export default Market;
