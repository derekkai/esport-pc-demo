import React from 'react';
import PropTypes from 'prop-types';
import MarketLock from 'components/ShareComponent/MarketLock/MarketLock';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import { timeConvert } from 'helpers/common';
import Card from 'components/ShareComponent/Card/Card';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import style from './Item.scss';

const Item = ({
  competitionName,
  gameId,
  sportId,
  startTs,
  markets,
  handleSetItemIsAllEmpty,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;

  const marketsData = Object.values(markets || {});
  if (marketsData.length !== 0) {
    handleSetItemIsAllEmpty(false);
  }

  return marketsData.map(market => {
    return (
      <div>
        <div className={style.container}>
          <Card>
            <Card.Header>
              <div className={style.header}>
                <div>
                  <SportIcon
                    className={style.sportIcon}
                    sportId={sportId}
                    type="deep_blue"
                  />
                  <span>{competitionName}</span>
                </div>
                <div>
                  <span>
                    <FormattedMessage {...dynamicMessage(time)} />
                  </span>
                  <span>{market.name}</span>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className={style.content}>
                {market?.event ? (
                  Object.values(market.event).map(eventData => (
                    <div key={eventData.id} className={style.eventItem}>
                      <span>{eventData.name}</span>
                      <OddsButtonContainer
                        position="left"
                        sportId={sportId}
                        eventId={eventData.id}
                        gameId={gameId}
                        price={eventData.price}
                        skinId={3}
                        marketId={market.id}
                        marketType={market.market_type}
                        marketName={market.name}
                        team1Name={competitionName}
                        pick={eventData.name}
                      />
                    </div>
                  ))
                ) : (
                  <MarketLock />
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  });
};

Item.propTypes = {
  competitionName: PropTypes.string,
  gameId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  markets: PropTypes.number,
};

export default Item;
