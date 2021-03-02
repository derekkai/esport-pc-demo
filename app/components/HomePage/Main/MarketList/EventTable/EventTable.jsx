import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import Chip from 'components/ShareComponent/Chip/Chip';
import MarketLock from 'components/ShareComponent/MarketLock/MarketLock';
import Card from 'components/ShareComponent/Card/Card';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import style from './EventTable.scss';

const EventTable = ({ data, team1Name, team2Name, gameId, sportId }) => {
  const [expanded, setExpanded] = useState(true);
  const { name } = data[0];

  const handleArrowClick = () => {
    setExpanded(prevState => !prevState);
  };

  const renderOdds = (
    result,
    price,
    eventId,
    eventName,
    eventBase,
    marketId,
    marketType,
    marketName,
  ) => {
    if (!result)
      return (
        <OddsButtonContainer
          position="left"
          sportId={sportId}
          price={price}
          skinId={3}
          gameId={gameId}
          marketId={marketId}
          marketType={marketType}
          marketName={marketName}
          pick={`${eventName} ${eventBase ? `(${eventBase})` : ''}`}
          team1Name={team1Name}
          team2Name={team2Name}
          eventId={eventId}
        />
      );
    switch (result) {
      case 1:
      case 2:
        return (
          <Chip className={style.chip} type={result === 1 ? 'Won' : 'Lost'} />
        );
      case 3:
        return <Chip className={style.chip} type="CXL" />;
      default:
        return undefined;
    }
  };

  const isMultipleEvent =
    data.length === 1 && Object.keys(data[0].event || {}).length > 3;

  const getListHeight = () => {
    if (!expanded) return 0;
    if (isMultipleEvent)
      return Math.ceil(Object.keys(data[0].event).length / 2) * 40;
    return 40 * data.length;
  };

  return (
    <li className={style.container}>
      <Card>
        <Card.Header className={style.header}>
          <div className={style.marketName}>{name}</div>
          <Arrow active={expanded} onClick={handleArrowClick} />
        </Card.Header>
        <Card.Body>
          <ul
            style={{ height: `${getListHeight()}px` }}
            className={style.marketList}
          >
            {data
              .sort((a, b) => a.base - b.base)
              .map(market => (
                <li key={market.id}>
                  <ul
                    className={classNames(
                      style.eventList,
                      isMultipleEvent && style.lineFeed,
                    )}
                  >
                    {market.event ? (
                      Object.values(market.event)
                        .sort((a, b) => a.order - b.order)
                        .map(event => {
                          let eventName = event.name;
                          if (event.name.includes('W1')) {
                            eventName = team1Name;
                          } else if (event.name.includes('W2')) {
                            eventName = team2Name;
                          }
                          return (
                            <li className={style.eventField} key={event.id}>
                              <div className={style.eventName}>{`${eventName} ${
                                event.base ? `(${event.base})` : ''
                              }`}</div>
                              {renderOdds(
                                event.result,
                                event.price,
                                event.id,
                                event.name,
                                event.base,
                                market.id,
                                market.market_type,
                                market.name,
                              )}
                            </li>
                          );
                        })
                    ) : (
                      <MarketLock />
                    )}
                  </ul>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
    </li>
  );
};

EventTable.propTypes = {
  data: PropTypes.array.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  gameId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
};

export default EventTable;
