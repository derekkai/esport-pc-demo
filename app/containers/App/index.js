import React from 'react';
import { Switch, Route } from 'react-router-dom';
import initalSaga from 'sagas';
import HomePage from '../../components/HomePage/Loadable';
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';
import 'global.css/app.global.scss?global';
import 'global.css/reactTransitionGroup.scss?global';

const App = () => {
  initalSaga();

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        path={['/upcoming', '/result', '/champion']}
        component={HomePage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
