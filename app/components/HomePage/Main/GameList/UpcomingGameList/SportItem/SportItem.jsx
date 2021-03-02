import React, { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import PropTypes from 'prop-types';
import style from './SportItem.scss';
import CompetitionItemContainer from './CompetitionItem/CompetitionItemContainer';

const SportItem = ({ sportId, sportName, data, displayMarketCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleArrowBtnClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <li>
      <div className={style.header}>
        <SportIcon className={style.icon} sportId={sportId} type="deep_blue" />
        <div className={style.title}>{sportName}</div>
        <Arrow
          active={isExpanded}
          onClick={handleArrowBtnClick}
          className={style.arrowBtn}
        />
      </div>
      <div>
        {isExpanded && (
          <TransitionGroup component="ul">
            {Object.entries(data).map(([competitionKey, competitionData]) => {
              const [competitionId, competitionName] = competitionKey.split(
                ':',
              );
              return (
                <CompetitionItemContainer
                  displayMarketCount={displayMarketCount}
                  sportId={sportId}
                  key={competitionId}
                  competitionId={competitionId}
                  competitionName={competitionName}
                  data={competitionData}
                />
              );
            })}
          </TransitionGroup>
        )}
      </div>
    </li>
  );
};

SportItem.propTypes = {
  sportId: PropTypes.string.isRequired,
  sportName: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  displayMarketCount: PropTypes.number,
};

export default SportItem;
