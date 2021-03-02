import { createAction } from 'redux-actions';

const prefix = 'news';

export const REQUEST_NEWS_DATA = `${prefix}/REQUEST_NEWS_DATA`;
export const SET_NEWS_DATA = `${prefix}/SET_NEWS_DATA`;

export const requestNewsData = createAction(REQUEST_NEWS_DATA);
export const setNewsData = createAction(SET_NEWS_DATA);
