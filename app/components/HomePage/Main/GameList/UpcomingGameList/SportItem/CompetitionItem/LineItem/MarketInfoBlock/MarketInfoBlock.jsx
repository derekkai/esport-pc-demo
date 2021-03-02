import React from 'react';
import classNames from 'classnames';
import MarketLock from 'components/ShareComponent/MarketLock/MarketLock';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import PropTypes from 'prop-types';
import style from './MarketInfoBlock.scss';

const MarketInfoBlock = ({
  market,
  sportId,
  gameId,
  team1Name,
  team2Name,
  displayMarketCount,
}) => {
  let marketWinner = {};
  const otherMarket = [];

  Object.values(market || {}).forEach(data => {
    if (data) {
      if (
        data.market_type === 'MatchWinner' ||
        data.market_type === 'MatchResult'
      ) {
        marketWinner = data;
      } else {
        otherMarket.push(data);
      }
    }
  });

  const events = Object.values(marketWinner?.event || {}).sort(
    (a, b) => a.order - b.order,
  );
  let team1Price = 0;
  let team2Price = 0;
  let drawPrice = 0;
  let team1EventId;
  let team2EventId;
  let drawEventId;
  let team1EventName = '';
  let team2EventName = '';
  let drawEventName = '';

  if (marketWinner?.market_type === 'MatchWinner') {
    team1Price = events[0]?.price || 0;
    team1EventId = events[0]?.id || undefined;
    team1EventName = events[0]?.name || '';
    team2Price = events[1]?.price || 0;
    team2EventId = events[1]?.id || undefined;
    team2EventName = events[1]?.name || '';
  } else if (marketWinner?.market_type === 'MatchResult') {
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
    <div
      className={classNames(
        style.container,
        style[`marketCount${displayMarketCount}`],
      )}
    >
      <div className={style.section}>
        {team1Price === 0 && team2Price === 0 ? (
          <MarketLock isVertical />
        ) : (
          <React.Fragment>
            <div className={style.box}>
              <OddsButtonContainer
                position="left"
                sportId={sportId}
                price={team1Price}
                skinId={3}
                gameId={gameId}
                marketId={marketWinner.id}
                eventId={team1EventId}
                marketType={marketWinner.market_type}
                marketName={marketWinner.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={team1EventName}
              />
            </div>
            {marketWinner?.market_type === 'MatchResult' && (
              <div className={style.box}>
                <OddsButtonContainer
                  position="left"
                  sportId={sportId}
                  price={drawPrice}
                  skinId={3}
                  gameId={gameId}
                  marketId={marketWinner.id}
                  eventId={drawEventId}
                  marketType={marketWinner.market_type}
                  marketName={marketWinner.name}
                  team1Name={team1Name}
                  team2Name={team2Name}
                  pick={drawEventName}
                />
              </div>
            )}
            <div className={style.box}>
              <OddsButtonContainer
                position="left"
                sportId={sportId}
                price={team2Price}
                skinId={3}
                gameId={gameId}
                marketId={marketWinner.id}
                eventId={team2EventId}
                marketType={marketWinner.market_type}
                marketName={marketWinner.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={team2EventName}
              />
            </div>
          </React.Fragment>
        )}
      </div>
      {otherMarket
        .sort((a, b) => (a.market_type > b.market_type ? 1 : -1))
        .map(data => (
          <div key={data.id} className={style.section}>
            {data?.event &&
              Object.entries(data.event)
                .sort(([, valueA], [, valueB]) => valueA.order - valueB.order)
                .map(([id, eventData], index) => {
                  const price = eventData?.price || 0;
                  return (
                    <React.Fragment key={id}>
                      <div key={id} className={style.box}>
                        <OddsButtonContainer
                          position="left"
                          sportId={sportId}
                          price={price}
                          skinId={3}
                          gameId={gameId}
                          marketId={data.id}
                          eventId={eventData.id}
                          marketType={data.market_type}
                          marketName={data.name}
                          team1Name={team1Name}
                          team2Name={team2Name}
                          pick={eventData.name}
                        />
                      </div>
                      {index === 0 && market.current === 'MatchResult' && (
                        <div className={classNames(style.box, style.draw)}>
                          X
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
          </div>
        ))}
    </div>
  );
};

MarketInfoBlock.propTypes = {
  market: PropTypes.object,
  sportId: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  displayMarketCount: PropTypes.number.isRequired,
};

export default MarketInfoBlock;
