import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTimeout } from 'helpers/customHooks';
import { withCSSTransition } from 'HOCs/hocs';
import Loading from 'components/ShareComponent/Loading/Loading';
import style from './MainLoading.scss';

const MainLoading = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useTimeout(() => {
    setProgress(10);
  }, 500);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setProgress(70);
        setTimeout(() => {
          setProgress(100);
        }, 2000);
      }, 1000);
    }
  }, [loading]);

  return (
    <div className={style.background}>
      <div className={style.middleBlock}>
        <Loading isDark className={style.loading} />
        <div className={style.progressBarContainer}>
          <div
            className={style.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

MainLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default withCSSTransition(MainLoading, 'MainLoading');
