import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withCSSTransition } from 'HOCs/hocs';
import settings from 'settings';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import Select from 'components/ShareComponent/Select/Select';
import Loading from 'components/ShareComponent/Loading/Loading';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import Pagination from 'components/ShareComponent/Pagination/Pagination';
import style from './BalanceHistory.scss';
import ItemContainer from './Item/ItemContainer';

const rowsPerPage = settings.balanceHistoryModalRowPerPage;

const BalanceHistory = ({
  requestBalanceHistory,
  keys,
  close,
  dateRangeDays,
  setBalanceHistoryDateRange,
  resetBalanceHistoryDateRange,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    requestBalanceHistory();
    return () => {
      resetBalanceHistoryDateRange();
    };
  }, []);

  const handleCloseBtnClick = () => {
    close();
  };

  const handleDateRangeSelectChange = value => {
    setBalanceHistoryDateRange({ type: 'days', value });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (keys.length === 0) {
      return <EmptyIcon type="balanceHistory" className={style.emptyIcon} />;
    }
    return (
      <ul className={style.list}>
        {keys
          .slice(
            currentPage * rowsPerPage - rowsPerPage,
            currentPage * rowsPerPage,
          )
          .map(date => {
            return (
              <li key={date}>
                <ItemContainer date={date} />
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <ModalsTemplate>
      <ModalsTemplate.Header
        closeBtnOnClick={handleCloseBtnClick}
        text="Balance history"
      >
        <Select
          data={settings.dayRangeFilterItems}
          value={dateRangeDays}
          onChange={handleDateRangeSelectChange}
          maxValue={settings.balanceHistoryMAXDays}
        />
      </ModalsTemplate.Header>
      <ModalsTemplate.Body>{renderContent()}</ModalsTemplate.Body>
      <Pagination
        count={keys.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </ModalsTemplate>
  );
};

BalanceHistory.propTypes = {
  requestBalanceHistory: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired,
  dateRangeDays: PropTypes.number.isRequired,
  setBalanceHistoryDateRange: PropTypes.func.isRequired,
  resetBalanceHistoryDateRange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withCSSTransition(BalanceHistory, 'BalanceHistory');
