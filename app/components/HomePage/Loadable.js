/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import loadable from 'utils/loadable';
import Loading from './Loading';

export default loadable(() => import('./HomePageContainer'), {
  fallback: <Loading />,
});
