import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withCSSTransition } from 'HOCs/hocs';
import { newsModalRowPerPage } from 'settings';
import Pagination from 'components/ShareComponent/Pagination/Pagination';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import ItemContainer from './Item/Item';
import style from './News.scss';

const rowsPerPage = newsModalRowPerPage;

const News = ({ entity, requestNewsData, close }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    requestNewsData();
  }, []);

  const handleCloseBtnClick = () => {
    close();
  };

  const renderContent = () => {
    if (entity.length === 0) {
      return <EmptyIcon type="news" className={style.emptyIcon} />;
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
              <li key={data.id}>
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
        text="News"
      />
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

News.propTypes = {
  entity: PropTypes.array.isRequired,
  requestNewsData: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default withCSSTransition(News, 'News');
