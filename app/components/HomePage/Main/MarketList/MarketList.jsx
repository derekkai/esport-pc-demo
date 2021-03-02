import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Loading from 'components/ShareComponent/Loading/Loading';
import NavBar from 'components/ShareComponent/NavBar/NavBar';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { withRouter } from 'react-router';
import { usePrevious, useDelayRender } from 'helpers/customHooks';
import { unsubscribeHandler } from 'sagas/websocket';
import style from './MarketList.scss';
import EventTable from './EventTable/EventTable';

const MarketList = ({
  tabs,
  match,
  requestMarketListData,
  gameId,
  setMarketGameInfoGameId,
  clearUpcomingMarketData,
  clearResultMarketData,
  team1Name,
  team2Name,
  data,
  groups,
  loading,
  sportId,
}) => {
  const render = useDelayRender(!loading, 500);
  const preGameId = usePrevious(gameId);
  const [activeTab, setActiveTab] = useState('0');
  // 將相同的 market 組合起來
  const marketData = {};
  Object.values(data)
    .filter(el => groups[activeTab].value.includes(el.id))
    .forEach(market => {
      const { market_type, name } = market;
      const key = `${market_type}${name}`;
      if (!marketData[key]) {
        // 以 NameId 當作排序依據
        marketData[key] = { order: market.NameId, markets: [market] };
      } else {
        marketData[key].markets.push(market);
      }
    });
  // 依照 order 排序
  const marketDataList = Object.entries(marketData).sort(
    ([, itemA], [, itemB]) => itemA.order - itemB.order,
  );
  useEffect(() => {
    const { type, id } = match.params;
    setMarketGameInfoGameId(id);
    requestMarketListData();
    return () => {
      unsubscribeHandler('upcomingMarket');
      switch (type) {
        case 'upcoming': {
          clearUpcomingMarketData();
          break;
        }
        case 'result': {
          clearResultMarketData();
          break;
        }
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    if (Number(preGameId) !== Number(gameId) && preGameId !== 0) {
      setActiveTab('0');
      requestMarketListData();
    }
  }, [gameId]);

  const handleTabChange = value => {
    setActiveTab(value);
  };

  const renderLeftHalf = () => {
    const result = [];
    for (let i = 0; i < Math.ceil(marketDataList.length / 2); i += 1) {
      result.push(
        <EventTable
          sportId={sportId}
          gameId={gameId}
          key={marketDataList[i][0]}
          data={marketDataList[i][1].markets}
          team1Name={team1Name}
          team2Name={team2Name}
        />,
      );
    }
    return result;
  };

  const renderRightHalf = () => {
    const result = [];
    for (
      let i = Math.ceil(marketDataList.length / 2);
      i < marketDataList.length;
      i += 1
    ) {
      result.push(
        <EventTable
          sportId={sportId}
          gameId={gameId}
          key={marketDataList[i][0]}
          data={marketDataList[i][1].markets}
          team1Name={team1Name}
          team2Name={team2Name}
        />,
      );
    }
    return result;
  };

  const renderContent = () => {
    if (!render) {
      return <Loading className={style.loading} />;
    }
    if (marketDataList.length > 0) {
      return (
        <Scrollbars autoHide>
          <div className={style.content}>
            <ul className={style.leftBlock}>{renderLeftHalf()}</ul>
            <ul className={style.rightBlock}>{renderRightHalf()}</ul>
          </div>
        </Scrollbars>
      );
    }
    return <EmptyIcon type="market" />;
  };

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <NavBar
          className={style.navbar}
          data={tabs}
          value={activeTab}
          isButtonNav
          onChange={handleTabChange}
        />
      </div>
      <div className={style.scrollWrapper}>{renderContent()}</div>
    </div>
  );
};

MarketList.propTypes = {
  tabs: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  requestMarketListData: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired,
  setMarketGameInfoGameId: PropTypes.func.isRequired,
  clearUpcomingMarketData: PropTypes.func.isRequired,
  clearResultMarketData: PropTypes.func.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  sportId: PropTypes.number.isRequired,
};

export default withRouter(MarketList);
