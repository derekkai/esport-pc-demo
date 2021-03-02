import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import { useInterval } from 'helpers/customHooks';
import { newsStayTime } from 'settings';
import style from './News.scss';

const News = ({ openModal, entity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNewsBarClick = () => {
    openModal('news');
  };

  useInterval(() => {
    setCurrentIndex(prevState => {
      if (prevState + 1 > entity.length - 1) {
        return 0;
      }
      return prevState + 1;
    });
  }, newsStayTime);

  useEffect(() => {
    if (currentIndex > entity.length - 1) {
      setCurrentIndex(0);
    }
  }, [entity]);

  return (
    <div aria-hidden className={style.container} onClick={handleNewsBarClick}>
      {!isEmpty(entity) && (
        <>
          <div className={style.tag} />
          <span>
            <FormattedMessage {...dynamicMessage('News')} />:
          </span>
          {entity.map((el, index) => (
            <CSSTransition
              key={el.id}
              in={currentIndex === index}
              unmountOnExit
              classNames="Carousel"
              timeout={300}
            >
              <p className={style.content}>{el.Title}</p>
            </CSSTransition>
          ))}
        </>
      )}
    </div>
  );
};

News.propTypes = {
  openModal: PropTypes.func.isRequired,
  entity: PropTypes.array.isRequired,
};

export default News;
