import React from 'react';
import SnackbarContainer from 'components/ShareComponent/Snackbar/SnackbarContainer';
import { TransitionGroup } from 'react-transition-group';
import style from './Alert.scss';

const Alert = ({ alerts }) => {
  return (
    <div className={style.container}>
      <TransitionGroup>
        {alerts.map(alertType => (
          <SnackbarContainer key={alertType} type={alertType} />
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Alert;
