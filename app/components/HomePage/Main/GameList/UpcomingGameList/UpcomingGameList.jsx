import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import settings from 'settings';
import { FormattedMessage } from 'react-intl';
import dynamicMessage from 'helpers/language';
import { withResizeDetector } from 'react-resize-detector';
import Loading from 'components/ShareComponent/Loading/Loading';
import { useScrollBottomHandler } from 'helpers/customHooks';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import { unsubscribeHandler } from 'sagas/websocket';
import SportItem from './SportItem/SportItem';
import style from './UpcomingGameList.scss';

const ROW_HIEGHT = 170;
const UpcomingGameList = ({
  isDisplayLive,
  isDisplayPreMatch,
  setUpcomingGameUIState,
  keys,
  clearUpcomingGameData,
  width,
  requestUpcomingGameData,
  clearLoadDownStatus,
  loading,
  prevScrollTop,
  displayItemCount,
  setUpcomingGameDisplayMode,
  displayMode,
  setUpcomingFilterGameType,
}) => {
  const { line, grid } = settings.upcomingGameDisplayMode;
  const scrollView = useRef(null);
  const handleArrayModeChange = value => () => {
    scrollView.current.scrollToTop();
    setUpcomingGameDisplayMode(value);
    setUpcomingGameUIState({ displayItemCount: 12 });
  };

  const onScrollBottom = () => {
    // 置底時處理事項
    console.log('bottom');
    if (!loading) {
      setUpcomingGameUIState({ displayItemCount: displayItemCount + 12 });
    }
  };

  const onLeaveBottom = () => {
    // 離開底部時處理事項
    console.log('leave bottom');
  };

  const catchScrollData = useScrollBottomHandler(onScrollBottom, onLeaveBottom);

  const handleGameTypeBtnClick = type => () => {
    setUpcomingFilterGameType({ type });
  };
  // react-custom-scrollbars api 輸出格式轉換
  const onScrollFrameHandler = ({ clientHeight, scrollTop, scrollHeight }) => {
    catchScrollData({
      listHeight: scrollHeight - clientHeight,
      scrollTop,
      triggerHeight: ROW_HIEGHT * 1,
    });
  };

  useEffect(() => {
    requestUpcomingGameData();
    return () => {
      if (scrollView.current) {
        setUpcomingGameUIState({
          scrollTop: scrollView.current.getScrollTop(),
        });
      }
      unsubscribeHandler('upcomingGame');
      clearUpcomingGameData();
      clearLoadDownStatus('upcomingGame');
    };
  }, []);

  /**
   * 資料回來後載入先前的捲動高度
   */

  useEffect(() => {
    if (!loading && Object.keys(keys).length > 0) {
      setTimeout(() => {
        scrollView.current.scrollTop(prevScrollTop);
      }, 1000);
    }
  }, [loading]);

  /**
   * RWD
   */
  let displayMarketCount;
  if (width > 930) {
    displayMarketCount = 3;
  } else if (width <= 930 && width > 830) {
    displayMarketCount = 2;
  } else if (width <= 830 && width > 690) {
    displayMarketCount = 1;
  } else if (width <= 690) {
    displayMarketCount = 0;
  }

  return (
    <div className={style.container}>
      <div className={style.tools}>
        <div
          aria-hidden
          className={classNames(
            style.gameTypeBtn,
            isDisplayLive && style.active,
          )}
          onClick={handleGameTypeBtnClick('live')}
        >
          <FormattedMessage {...dynamicMessage('Live')} />
        </div>
        <div
          aria-hidden
          className={classNames(
            style.gameTypeBtn,
            isDisplayPreMatch && style.active,
          )}
          onClick={handleGameTypeBtnClick('pre-match')}
        >
          <FormattedMessage {...dynamicMessage('Pre-match')} />
        </div>
        <div
          aria-hidden
          onClick={handleArrayModeChange(line)}
          className={classNames(
            style.listLineBtn,
            displayMode === line && style.active,
          )}
        />
        <div
          aria-hidden
          onClick={handleArrayModeChange(grid)}
          className={classNames(
            style.listSquareBtn,
            displayMode === grid && style.active,
          )}
        />
      </div>
      {loading && <Loading className={style.loading} />}
      {!loading && Object.keys(keys).length === 0 && <EmptyIcon type="game" />}
      <Scrollbars
        autoHide
        onScrollFrame={onScrollFrameHandler}
        renderView={props => <div {...props} className={style.scrollView} />}
        ref={scrollView}
      >
        <ul>
          {Object.entries(keys).map(([sportKey, sportValue]) => {
            const [sportId, sportName] = sportKey.split(':');
            return (
              <SportItem
                key={sportId}
                displayMarketCount={displayMarketCount}
                sportId={sportId}
                sportName={sportName}
                data={sportValue}
              />
            );
          })}
        </ul>
      </Scrollbars>
    </div>
  );
};

UpcomingGameList.propTypes = {
  setUpcomingGameUIState: PropTypes.func.isRequired,
  keys: PropTypes.object.isRequired,
  clearUpcomingGameData: PropTypes.func.isRequired,
  width: PropTypes.number,
  requestUpcomingGameData: PropTypes.func.isRequired,
  clearLoadDownStatus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  prevScrollTop: PropTypes.number.isRequired,
  displayItemCount: PropTypes.number.isRequired,
  setUpcomingGameDisplayMode: PropTypes.func.isRequired,
  displayMode: PropTypes.number.isRequired,
  setUpcomingFilterGameType: PropTypes.func.isRequired,
  isDisplayLive: PropTypes.bool.isRequired,
  isDisplayPreMatch: PropTypes.bool.isRequired,
};

export default withResizeDetector(UpcomingGameList);
