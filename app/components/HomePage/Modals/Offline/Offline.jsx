import React from 'react';
import ModalsTemplate from 'components/ShareComponent/ModalsTemplate/ModalsTemplate';
import style from './Offline.scss';

const Offline = () => {
  return (
    <ModalsTemplate className={style.container}>
      <ModalsTemplate.Header
        text="连线中断"
        showCloseBtn={false}
        className={style.header}
      />
      <ModalsTemplate.Body>
        <div className={style.content}>
          <div className={style.icon} />
          <div className={style.text}>与连线伺服器中断请重新整理</div>
        </div>
      </ModalsTemplate.Body>
    </ModalsTemplate>
  );
};

export default Offline;
