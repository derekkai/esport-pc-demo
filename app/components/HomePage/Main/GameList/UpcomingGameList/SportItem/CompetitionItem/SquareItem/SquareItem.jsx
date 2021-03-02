import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withCSSTransition } from 'HOCs/hocs';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import { timeConvert } from 'helpers/common';
import AddBetSlideAnimation from 'components/ShareComponent/AddBetSlideAnimation/AddBetSlideAnimation';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import Card from 'components/ShareComponent/Card/Card';
import style from './SquareItem.scss';

const SquareItem = ({
  market,
  gameId,
  competitionName,
  sportId,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  team1Score,
  team2Score,
  type,
  startTs,
  marketsCount,
  haveVideo,
}) => {
  const headerEL = useRef(null);
  const [animationState, setAnimationState] = useState(false);
  const duration = 300;

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

  const handleAddBetAnimation = () => {
    setAnimationState(true);
  };

  const handleAnimationFisish = () => {
    setAnimationState(false);
  };

  return (
    <div
      className={classNames(style.container, 'border-animation')}
      gameid={gameId}
    >
      <Card className={style.cardContainer}>
        <Card.Header ref={headerEL} className={style.cardHeader}>
          {animationState && (
            <AddBetSlideAnimation
              start={animationState}
              onFinish={handleAnimationFisish}
              x={headerEL.current.getBoundingClientRect().x}
              originWidth={headerEL.current.clientWidth}
              maxWidth={390}
              duration={duration}
            />
          )}
          <SportIcon
            className={style.sportIcon}
            sportId={sportId}
            type="deep_blue"
          />
          <span>{competitionName}</span>
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <div className={style.topBlock}>
            <div className={style.teamBlock}>
              <TeamIcon teamId={team1Id} teamName={team1Name} />
              <div className={style.teamName}>
                <span>{team1Name}</span>
              </div>
              <OddsButtonContainer
                position="vertical"
                callBack={handleAddBetAnimation}
                delayMS={duration}
                sportId={sportId}
                price={team1Price}
                skinId={2}
                gameId={gameId}
                marketId={market?.id}
                eventId={team1EventId}
                marketType={market?.market_type}
                marketName={market?.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={team1EventName}
              />
            </div>
            <div className={style.middleBlock}>
              <div className={style.section1}>
                <GameStatusDisplay
                  haveVideo={haveVideo}
                  type={type}
                  timestamp={startTs}
                />
              </div>
              <div className={style.scoreBlock}>
                <span>{team1Score}</span>
                <span>:</span>
                <span>{team2Score}</span>
              </div>
              <div className={style.section2}>
                {market?.market_type === 'MatchResult' && (
                  <OddsButtonContainer
                    position="vertical"
                    callBack={handleAddBetAnimation}
                    delayMS={duration}
                    sportId={sportId}
                    price={drawPrice}
                    skinId={2}
                    gameId={gameId}
                    marketId={market?.id}
                    eventId={drawEventId}
                    marketType={market?.market_type}
                    marketName={market?.name}
                    team1Name={team1Name}
                    team2Name={team2Name}
                    pick={drawEventName}
                  />
                )}
              </div>
            </div>
            <div className={style.teamBlock}>
              <TeamIcon teamId={team2Id} teamName={team2Name} />
              <div className={style.teamName}>
                <span>{team2Name}</span>
              </div>
              <OddsButtonContainer
                position="vertical"
                callBack={handleAddBetAnimation}
                delayMS={duration}
                isArrowLeft={false}
                sportId={sportId}
                price={team2Price}
                skinId={2}
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
          </div>
          <div className={style.footer}>
            <div>
              <span>
                <FormattedMessage {...dynamicMessage(time)} />
              </span>
            </div>
            <MoreInfoButtonContainer
              disable={!haveVideo}
              type="video"
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

SquareItem.propTypes = {
  market: PropTypes.object,
  gameId: PropTypes.number.isRequired,
  competitionName: PropTypes.string,
  sportId: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  marketsCount: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
};

export default withCSSTransition(SquareItem, 'SquareItem');
