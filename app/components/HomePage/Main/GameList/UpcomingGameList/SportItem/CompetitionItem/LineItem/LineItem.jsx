import React from 'react';
import { withCSSTransition } from 'HOCs/hocs';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import Card from 'components/ShareComponent/Card/Card';
import style from './LineItem.scss';
import MarketInfoBlockContainer from './MarketInfoBlock/MarketInfoBlockContainer';
import GameInfoBlockContainer from './GameInfoBlock/GameInfoBlockContainer';

const LineItem = ({
  gameId,
  sportId,
  haveVideo,
  marketsCount,
  displayMarketCount,
}) => {
  return (
    <div
      className={classNames(
        style.container,
        style[`marketCount${displayMarketCount}`],
      )}
      gameid={gameId}
    >
      <Card>
        <Card.Body className={style.cardBody}>
          <GameInfoBlockContainer gameId={gameId} />
          <MarketInfoBlockContainer
            gameId={gameId}
            displayMarketCount={displayMarketCount}
          />
          <div className={style.footer}>
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
        </Card.Body>
      </Card>
    </div>
  );
};

LineItem.propTypes = {
  gameId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  marketsCount: PropTypes.number.isRequired,
  displayMarketCount: PropTypes.number.isRequired,
};

export default withCSSTransition(LineItem, 'LineItem');
