import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import AlertContainer from './Alert/AlertContainer';
import style from './HomePage.scss';
import HeaderContainer from './Header/HeaderContainer';
import MainContainer from './Main/MainContainer';
import ModalsContainer from './Modals/ModalsContainer';
import CalculatorContainer from './Calculator/CalculatorContainer';

const TrackVerticalOriginalStyle = {
  position: 'absolute',
  width: '6px',
  transition: 'opacity 200ms ease 0s',
  opacity: 0,
  right: '2px',
  bottom: '2px',
  top: '2px',
  borderRadius: '3px',
};

const HomePage = ({
  mainDataType,
  setMainDataType,
  loading,
  location,
  gameListType,
  setGameListType,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const appLoading = document.querySelector('.app-loading');
      appLoading.style.opacity = 0;
      setTimeout(() => {
        appLoading.remove();
      }, 300);
    }, 300);
  }, []);

  useEffect(() => {
    if (loading) return;
    const { pathname } = location;
    const paths = pathname.split('/');
    const [, GameListType, viewPoint] = paths;
    if (viewPoint === 'market') {
      setMainDataType('market');
    } else {
      setMainDataType('game');
    }
    switch (GameListType) {
      case '':
      case 'upcoming':
        if (gameListType !== 'upcoming') setGameListType('upcoming');
        break;
      case 'result':
        if (gameListType !== 'result') setGameListType('result');
        break;
      case 'champion':
        if (gameListType !== 'champion') setGameListType('champion');
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <>
      {!loading && (
        <div className={style.container}>
          <Scrollbars
            autoHide
            renderTrackVertical={props => (
              <div
                {...props}
                style={{
                  ...TrackVerticalOriginalStyle,

                  width: '10px',
                  right: '0px',
                }}
              />
            )}
          >
            <header className={style.header}>
              <HeaderContainer />
            </header>
            <main className={style.main}>
              <MainContainer mainDataType={mainDataType} />
            </main>
          </Scrollbars>
          <ModalsContainer />
          <CalculatorContainer />
          <AlertContainer />
        </div>
      )}
    </>
  );
};

HomePage.propTypes = {
  mainDataType: PropTypes.string.isRequired,
  setMainDataType: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  gameListType: PropTypes.string.isRequired,
  setGameListType: PropTypes.func.isRequired,
};

export default HomePage;
