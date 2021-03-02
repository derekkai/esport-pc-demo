/* eslint-disable prettier/prettier */
/* global */
export const selectMarketGameId = state => state.global.marketGameInfo.id;
export const selectGlobalAlerts = state => state.global.alerts;
export const selectMainDataType = state => state.global.mainDataType;
export const selectGameListType = state => state.global.gameListType;

/* account */
export const selectAuthToken = state => state.account.AuthToken;
export const selectIsLogin = state => state.account.isLogin;
export const selectAccountLang = state => state.account.lang;
export const selectLiveLogin = state => state.account.live_login;

/* classifier */
export const selectClassifierSportSelect = state => state.classifier.sportSelect;
export const selectClassifierCompetitionSelect = state => state.classifier.competitionSelect;
export const selectClassifierEntity = state => state.classifier.entity;

/* balanceHistory */
export const selectBalanceHistoryDateRangeTimestamp = state => state.balanceHistory.dateRangeTimestamp;

/* betHistory */
export const selectBetHistoryDateRangeTimestamp = state => state.betHistory.dateRangeTimestamp;

/* betslip */
export const selectBetslipEntity = state => state.betslip.entity;
export const selectStake = state => state.betslip.stake;
export const selectBetType = state => state.betslip.betType;
export const selectSystemNum = state => state.betslip.systemNum;
export const selectBetslipKeys = state => state.betslip.keys;
export const selectPriceChangeHandleType = state => state.betslip.priceChangeHandleType;
export const selectGameLimit = state => state.betslip.gameLimit;
export const selectSystemBetCount = state => state.betslip.systemBetCount;
export const selectShowResult = state => state.betslip.showResult;

/* upcomingGame */
export const selectUpcomingDateRangeTimestamp = state => state.upcomingGame.dateRangeTimestamp;

/* resultGame */
export const selectResultDateRangeTimestamp = state => state.resultGame.dateRangeTimestamp;
export const selectResultGameKeys = state => state.resultGame.keys;

/* language */
export const selectLanguage = state => state.language.locale;

/* live */
export const selectLiveCurrentGameId = state => state.live.currentSelectGameId;

/* championGame */
export const selectChampionDateRangeTimestamp = state => state.championGame.dateRangeTimestamp;
