import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { gameListTabs } from 'settings';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import CompetitionItemContainer from './CompetitionItem/CompetitionItemContainer';
import style from './SportItem.scss';

const SportItem = ({
  isSelectAll,
  name,
  competitionData = {},
  sportCount,
  sportId,
  selectAllCompetition,
  clearAllCompetition,
  active,
  setClassifierSportSelect,
  mainDataType,
  history,
  gameListType,
}) => {
  const handleItemClick = () => {
    if (!active) {
      setClassifierSportSelect(sportId);
    } else if (mainDataType !== 'game') {
      history.push(`/${gameListTabs[gameListType].value}`);
    }
  };

  const handleSeletAllClick = () => {
    if (!isSelectAll) {
      selectAllCompetition(sportId);
    }
  };

  const handleClearClick = () => {
    clearAllCompetition(sportId);
  };

  return (
    <li
      className={classNames(
        style.wrapper,
        active && style.extend,
        active && style.active,
      )}
    >
      <div className={style.container} onClick={handleItemClick} aria-hidden>
        <SportIcon type="color" sportId={sportId} className={style.sportIcon} />
        <span className={style.name}>
          <FormattedMessage {...dynamicMessage(name)} />
        </span>
        <span className={style.sportCount}>+{sportCount}</span>
      </div>
      {sportId !== 0 && (
        <div className={classNames(style.listWrapper)}>
          <div className={classNames(style.list, active && style.fadeOut)}>
            <div className={style.topBlock}>
              <div
                aria-hidden
                onClick={handleSeletAllClick}
                className={style.selectAllButton}
              >
                <span className={style.selectAllLabel}>
                  <FormattedMessage {...dynamicMessage('Select all')} />
                </span>
              </div>
              <span
                aria-hidden
                className={style.clearLabel}
                onClick={handleClearClick}
              >
                <FormattedMessage {...dynamicMessage('Clear')} />
              </span>
            </div>
            <ul>
              {Object.values(competitionData).map(data => (
                <CompetitionItemContainer
                  sportId={sportId}
                  key={data.id}
                  data={data}
                  competitionId={data.id}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

SportItem.propTypes = {
  isSelectAll: PropTypes.bool,
  name: PropTypes.string.isRequired,
  competitionData: PropTypes.object,
  sportCount: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  selectAllCompetition: PropTypes.func,
  clearAllCompetition: PropTypes.func,
  active: PropTypes.bool.isRequired,
  setClassifierSportSelect: PropTypes.func.isRequired,
  mainDataType: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  gameListType: PropTypes.string.isRequired,
};

export default withRouter(SportItem);
