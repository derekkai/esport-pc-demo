import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loading from 'components/ShareComponent/Loading/Loading';
import { useScrollBottomHandler } from 'helpers/customHooks';
import { Scrollbars } from 'react-custom-scrollbars';
import Select from 'components/ShareComponent/Select/Select';
import settings from 'settings';
import style from './ResultGameList.scss';
import ItemContainer from './Item/ItemContainer';

const ROW_HIEGHT = 115;

const ResultGameList = ({
  keys,
  resultDateRange,
  setResultGameDateRange,
  loading,
  clearLoadDownStatus,
  clearResultGameData,
  requestResultGameData,
}) => {
  useEffect(() => {
    requestResultGameData();
    return () => {
      clearLoadDownStatus('resultGame');
      clearResultGameData();
    };
  }, []);

  const handleDateRangeSelectChange = value => {
    setResultGameDateRange({
      type: 'days',
      value,
    });
  };

  const onScrollBottom = () => {
    // 置底時處理事項
    requestResultGameData();
  };

  const onLeaveBottom = () => {
    // 離開底部時處理事項
    console.log('leave bottom');
  };

  const catchScrollData = useScrollBottomHandler(onScrollBottom, onLeaveBottom);

  // react-custom-scrollbars api 輸出格式轉換
  const onScrollFrameHandler = ({ clientHeight, scrollTop, scrollHeight }) => {
    catchScrollData({
      listHeight: scrollHeight - clientHeight,
      scrollTop,
      triggerHeight: ROW_HIEGHT * 1,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.tools}>
        <Select
          data={settings.dayRangeFilterItems}
          value={resultDateRange}
          onChange={handleDateRangeSelectChange}
          maxValue={settings.resultGameMAXDays}
        />
      </div>
      {loading && <Loading className={style.loading} />}
      {!loading && keys.length === 0 && <EmptyIcon type="game" />}
      <Scrollbars
        autoHide
        onScrollFrame={onScrollFrameHandler}
        renderView={props => <div {...props} className={style.scrollView} />}
      >
        <TransitionGroup component="ul">
          {keys.map(gameId => (
            <CSSTransition
              timeout={{
                appear: 0,
                enter: 300,
                exit: 0,
              }}
              unmountOnExit
              classNames="GameList"
              key={gameId}
            >
              <ItemContainer key={gameId} gameId={gameId} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Scrollbars>
    </div>
  );
};

ResultGameList.propTypes = {
  keys: PropTypes.array.isRequired,
  resultDateRange: PropTypes.number.isRequired,
  setResultGameDateRange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clearLoadDownStatus: PropTypes.func.isRequired,
  clearResultGameData: PropTypes.func.isRequired,
  requestResultGameData: PropTypes.func.isRequired,
};

export default ResultGameList;
