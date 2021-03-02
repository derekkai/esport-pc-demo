import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import HeaderFlag from 'components/ShareComponent/HeaderFlag/HeaderFlag';
import Card from 'components/ShareComponent/Card/Card';
import style from './ModalsTemplate.scss';

const ModalsTemplate = ({ children, className }) => {
  return (
    <div className={classNames(style.wrapper, className)}>
      <Card className={style.card}>{children}</Card>
    </div>
  );
};

ModalsTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

ModalsTemplate.Header = ({
  className,
  children,
  closeBtnOnClick,
  text,
  showCloseBtn = true,
}) => {
  return (
    <Card.Header className={classNames(style.cardHeader, className)}>
      <HeaderFlag isTag className={style.headerFlag} text={text} />
      {children}
      {showCloseBtn && (
        <button
          className={style.closeBtn}
          type="button"
          onClick={closeBtnOnClick}
        />
      )}
    </Card.Header>
  );
};

ModalsTemplate.Header.propTypes = {
  className: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  children: PropTypes.node,
  closeBtnOnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

ModalsTemplate.Body = ({ children }) => {
  return (
    <Card.Body className={style.cardBody}>
      <Scrollbars autoHide>
        <div className={style.content}>{children}</div>
      </Scrollbars>
    </Card.Body>
  );
};

ModalsTemplate.Body.propTypes = {
  children: PropTypes.node,
};

ModalsTemplate.Item = ({ children }) => {
  return <Card className={style.itemCard}>{children}</Card>;
};

ModalsTemplate.Item.propTypes = {
  children: PropTypes.node,
};

ModalsTemplate.ItemHeader = ({
  className,
  children,
  expanded,
  arrowOnClick,
}) => {
  return (
    <Card.Header className={style.itemCardHeader}>
      <div className={classNames(className, style.content)}>{children}</div>
      <Arrow active={expanded} onClick={arrowOnClick} />
    </Card.Header>
  );
};

ModalsTemplate.ItemHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  expanded: PropTypes.bool.isRequired,
  arrowOnClick: PropTypes.func.isRequired,
};

ModalsTemplate.ItemBody = ({ className, children, innerstyle }) => {
  return (
    <Card.Body
      innerstyle={innerstyle}
      className={classNames(className, style.itemCardBody)}
    >
      {children}
    </Card.Body>
  );
};

ModalsTemplate.ItemBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  innerstyle: PropTypes.object,
};

export default ModalsTemplate;
