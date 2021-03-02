import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loading from 'components/ShareComponent/Loading/Loading';
import { useDelayRender } from 'helpers/customHooks';
import { Scrollbars } from 'react-custom-scrollbars';
import SportItemContainer from './SportItem/SportItemContainer';
import FirstItemContainer from './FirstItem/FirstItemContainer';
import style from './Classifier.scss';

const Classifier = ({
  requestClassifierData,
  data,
  gameListType,
  isLoading,
}) => {
  const render = useDelayRender(!isLoading, 100);

  useEffect(() => {
    requestClassifierData();
  }, [gameListType]);

  return (
    <div className={style.wrapper}>
      <Scrollbars autoHide>
        <ul className={classNames(!render && style.loading)}>
          <FirstItemContainer
            disableExtend
            name="All Games"
            alias="allgame"
            sportId={0}
          />
          {Object.values(data).map(sportData => (
            <SportItemContainer
              key={sportData.id}
              data={sportData}
              name={sportData.name}
              competitionData={sportData.competition}
              sportId={sportData.id}
            />
          ))}
        </ul>
      </Scrollbars>
      {!render && <Loading className={style.loadingGif} />}
    </div>
  );
};

Classifier.propTypes = {
  requestClassifierData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  gameListType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Classifier;
