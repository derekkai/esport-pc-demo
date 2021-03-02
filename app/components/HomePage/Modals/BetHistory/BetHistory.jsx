import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import Pagination from 'components/ShareComponent/Pagination/Pagination';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { withCSSTransition } from 'HOCs/hocs';
import Select from 'components/ShareComponent/Select/Select';
import Loading from 'components/ShareComponent/Loading/Loading';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import style from './BetHistory.scss';
import ItemContainer from './Item/Item';

const rowsPerPage = settings.betHistoryModalRowPerPage;

const BetHistory = ({
  filterBetType,
  setBetHistoryFilterBetType,
  requestBetHistory,
  close,
  dateRangeDays,
  setBetHistoryDateRange,
  resetBetHistoryDateRange,
  entity,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    requestBetHistory();
    return () => {
      resetBetHistoryDateRange();
    };
  }, []);

  const handleCloseBtnClick = () => {
    close();
  };

  const handleDateRangeSelectChange = value => {
    setBetHistoryDateRange({ type: 'days', value });
  };

  const handleBetTypeSelectChange = value => {
    setBetHistoryFilterBetType(value);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (entity.length === 0) {
      return <EmptyIcon type="betHistory" className={style.emptyIcon} />;
    }
    return (
      <ul className={style.list}>
        {entity
          .slice(
            currentPage * rowsPerPage - rowsPerPage,
            currentPage * rowsPerPage,
          )
          .map(data => {
            return (
              <li key={filterBetType + data.BetID}>
                <ItemContainer data={data} />
              </li>
            );
          })}
      </ul>
    );
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <ModalsTemplate>
      <ModalsTemplate.Header
        closeBtnOnClick={handleCloseBtnClick}
        text="Bet history"
      >
        <Select
          className={style.betTypeSelect}
          data={settings.betHistoryBetTypeItems}
          value={filterBetType}
          onChange={handleBetTypeSelectChange}
        />
        <Select
          data={settings.dayRangeFilterItems}
          value={dateRangeDays}
          onChange={handleDateRangeSelectChange}
          maxValue={settings.betHistoryMAXDays}
        />
      </ModalsTemplate.Header>
      <ModalsTemplate.Body>{renderContent()}</ModalsTemplate.Body>
      <Pagination
        count={entity.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </ModalsTemplate>
  );
};

BetHistory.propTypes = {
  filterBetType: PropTypes.string.isRequired,
  setBetHistoryFilterBetType: PropTypes.func.isRequired,
  requestBetHistory: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  dateRangeDays: PropTypes.number.isRequired,
  setBetHistoryDateRange: PropTypes.func.isRequired,
  resetBetHistoryDateRange: PropTypes.func.isRequired,
  entity: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withCSSTransition(BetHistory, 'BetHistory');
