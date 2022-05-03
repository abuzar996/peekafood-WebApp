import {
  GET_TOP_SOLD_DISHES,
  GET_TOP_SOLD_DISHES_SUCCESS,
  GET_LEAST_SOLD_DISHES,
  GET_LEAST_SOLD_DISHES_SUCCESS,
  GET_FEEDBACK_COMMENTS,
  GET_FEEDBACK_COMMENTS_SUCCESS,
  GET_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_SALES,
  GET_SALES_SUCCESS,
  GET_SALES_TREND,
  GET_SALES_TREND_SUCCESS,
  GET_SALES_WEEKLY,
  GET_SALES_WEEKLY_SUCCESS,
  GET_SALES_YEARLY,
  GET_SALES_YEARLY_SUCCESS,
  GET_ITEM_SALES_STATS,
  GET_ITEM_SALES_STATS_SUCCESS,
  GET_CATEGORY_SALES_STATS,
  GET_CATEGORY_SALES_STATS_SUCCESS,
  DASHBOARD_FAILURE,
  GET_ITEM_SALES_STATS_HOURLY,
  GET_ITEM_SALES_STATS_HOURLY_SUCCESS,
  GET_CATEGORY_SALES_STATS_HOURLY,
  GET_CATEGORY_SALES_STATS_HOURLY_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_SUCCESS,
  
} from "../actions";
export const getSummary = object => ({
  type: GET_SUMMARY,
  payload: object
});
export const getSummarySuccess = items => ({
  type: GET_SUMMARY_SUCCESS,
  payload: items
});
export const getPaymentMethods = object => ({
  type: GET_PAYMENT_METHODS,
  payload: object
});
export const getPaymentMethodsSuccess = items => ({
  type: GET_PAYMENT_METHODS_SUCCESS,
  payload: items
});
export const getSale = object => ({
  type: GET_SALES,
  payload: object
});
export const getSaleSuccess = items => ({
  type: GET_SALES_SUCCESS,
  payload: items
});

export const getItemSaleStats = object => ({
  type: GET_ITEM_SALES_STATS,
  payload: object
});
export const getItemSaleStatsSuccess = items => ({
  type: GET_ITEM_SALES_STATS_SUCCESS,
  payload: items
});

export const getCategorySaleStats = object => ({
  type: GET_CATEGORY_SALES_STATS,
  payload: object
});
export const getCategorySaleStatsSuccess = items => ({
  type: GET_CATEGORY_SALES_STATS_SUCCESS,
  payload: items
});
export const getItemSaleStatsHourly = object => ({
  type: GET_ITEM_SALES_STATS_HOURLY,
  payload: object
});
export const getItemSaleStatsHourlySuccess = items => ({
  type: GET_ITEM_SALES_STATS_HOURLY_SUCCESS,
  payload: items
});
export const getCategorySaleStatsHourly = object => ({
  type: GET_CATEGORY_SALES_STATS_HOURLY,
  payload: object
});
export const getCategorySaleStatsHourlySuccess = items => ({
  type: GET_CATEGORY_SALES_STATS_HOURLY_SUCCESS,
  payload: items
});

export const getSaleTrend = object => ({
  type: GET_SALES_TREND,
  payload: object
});
export const getSaleTrendSuccess = items => ({
  type: GET_SALES_TREND_SUCCESS,
  payload: items
});

export const getSaleWeekly = object => ({
  type: GET_SALES_WEEKLY,
  payload: object
});
export const getSaleWeeklySuccess = items => ({
  type: GET_SALES_WEEKLY_SUCCESS,
  payload: items
});

export const getSaleYearly = object => ({
  type: GET_SALES_YEARLY,
  payload: object
});
export const getSaleYearlySuccess = items => ({
  type: GET_SALES_YEARLY_SUCCESS,
  payload: items
});

export const getTopSoldItems = object => ({
  type: GET_TOP_SOLD_DISHES,
  payload: object
});
export const getTopSoldItemsSuccess = items => ({
  type: GET_TOP_SOLD_DISHES_SUCCESS,
  payload: items
});
export const getLeastSoldItems = object => ({
  type: GET_LEAST_SOLD_DISHES,
  payload: object
});
export const getLeastSoldItemsSuccess = items => ({
  type: GET_LEAST_SOLD_DISHES_SUCCESS,
  payload: items
});
export const getFeedbackSentiments = branch_id => ({
  type: GET_FEEDBACK_COMMENTS,
  payload: branch_id
});
export const getFeedbackSentimentsSuccess = feedbacks => ({
  type: GET_FEEDBACK_COMMENTS_SUCCESS,
  payload: feedbacks
});
export const dashboardFailure = () => ({
  type: DASHBOARD_FAILURE
});
