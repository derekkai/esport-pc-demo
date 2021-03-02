import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import style from './CompetitionItem.scss';

const CompetitionItem = ({
  data,
  isSelect,
  setClassifierCompetitionSelect,
  sportId,
  competitionId,
  hideCheckBox,
}) => {
  const handleItemClick = () => {
    setClassifierCompetitionSelect({
      sportId,
      competitionId,
    });
  };
  return (
    <li className={style.container} onClick={handleItemClick} aria-hidden>
      {!hideCheckBox && (
        <Checkbox className={style.radioBtn} isSelect={isSelect} />
      )}
      <span className={style.name}>{data.name}</span>
      <span className={style.count}>{Object.keys(data.game || {}).length}</span>
    </li>
  );
};

CompetitionItem.propTypes = {
  data: PropTypes.object.isRequired,
  isSelect: PropTypes.bool.isRequired,
  setClassifierCompetitionSelect: PropTypes.func.isRequired,
  sportId: PropTypes.number.isRequired,
  competitionId: PropTypes.number.isRequired,
};

export default CompetitionItem;
