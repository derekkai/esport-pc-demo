import React, { useState } from 'react';
import Card from 'components/ShareComponent/Card/Card';
import { withCSSTransition } from 'HOCs/hocs';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup } from 'react-transition-group';
import dynamicMessage from 'helpers/language';
import classNames from 'classnames';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import settings from 'settings';
import PropTypes from 'prop-types';
import style from './CompetitionItem.scss';
import LineItemContainer from './LineItem/LineItemContainer';
import SquareItemContainer from './SquareItem/SquareItemContainer';

const CompetitionItem = ({
  sportId,
  competitionId,
  competitionName,
  data,
  displayMarketCount,
  displayMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { line, grid } = settings.upcomingGameDisplayMode;

  const handleArrowBtnClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <li className={style.container} competitionid={competitionId}>
      <Card>
        <Card.Header className={style.header}>
          <div className={style.side}>
            <SportIcon
              className={style.icon}
              sportId={sportId}
              type="deep_blue"
            />
            <div className={style.title}>{competitionName}</div>
          </div>
          {displayMode === line && (
            <div
              className={classNames(
                style.content,
                style[`marketCount${displayMarketCount}`],
              )}
            >
              <div className={style.section}>
                <div className={style.text}>
                  <FormattedMessage {...dynamicMessage('Match Winner')} />
                </div>
              </div>
              <div className={style.section}>
                <div className={style.text}>
                  <FormattedMessage {...dynamicMessage('Game1 Winner')} />
                </div>
              </div>
              <div className={style.section}>
                <div className={style.text}>
                  <FormattedMessage {...dynamicMessage('Game2 Winner')} />
                </div>
              </div>
            </div>
          )}
          <Arrow
            className={style.arrowBtn}
            active={isExpanded}
            onClick={handleArrowBtnClick}
          />
        </Card.Header>
        <Card.Body>
          {isExpanded && (
            <TransitionGroup
              component="ul"
              className={classNames(displayMode === grid && style.grid)}
            >
              {data.map(gameId =>
                displayMode === line ? (
                  <LineItemContainer
                    key={gameId}
                    gameId={gameId}
                    displayMarketCount={displayMarketCount}
                  />
                ) : (
                  <SquareItemContainer key={gameId} gameId={gameId} />
                ),
              )}
            </TransitionGroup>
          )}
        </Card.Body>
      </Card>
    </li>
  );
};

CompetitionItem.propTypes = {
  sportId: PropTypes.string.isRequired,
  competitionName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  displayMarketCount: PropTypes.number.isRequired,
  displayMode: PropTypes.number.isRequired,
  competitionId: PropTypes.string.isRequired,
};

export default withCSSTransition(CompetitionItem, 'competition-item');
