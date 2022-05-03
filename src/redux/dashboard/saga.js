import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import _ from 'lodash';
import {
  GET_TOP_SOLD_DISHES,
  GET_LEAST_SOLD_DISHES,
  GET_FEEDBACK_COMMENTS,
  GET_SALES,
  GET_SUMMARY,
  GET_SALES_TREND,
  GET_PAYMENT_METHODS,
  GET_SALES_WEEKLY,
  GET_SALES_YEARLY,
  GET_ITEM_SALES_STATS,
  GET_ITEM_SALES_STATS_HOURLY,
  GET_CATEGORY_SALES_STATS,
  GET_CATEGORY_SALES_STATS_HOURLY,
} from "../actions";
import {
  getTopSoldItemsSuccess,
  getLeastSoldItemsSuccess,
  getFeedbackSentimentsSuccess,
  getSummarySuccess,
  getSaleSuccess,
  getPaymentMethodsSuccess,
  getSaleTrendSuccess,
  getSaleWeeklySuccess,
  getSaleYearlySuccess,
  getItemSaleStatsSuccess,
  getItemSaleStatsHourlySuccess,
  getCategorySaleStatsSuccess,
  getCategorySaleStatsHourlySuccess,
  dashboardFailure
} from "./actions";
import { BASE_URL } from "../../../src/API";

const GetTopDishesAsync = async object =>
  await axios
    .get(`${BASE_URL}/api/topsales/`, {
      params: object,
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

function* GetTopDishes(object) {
  try {
    const dishes = yield call(GetTopDishesAsync, object.payload);
    if (dishes.status === 200 || dishes.status === 201) {
      // NotificationManager.success(
      //   dishes.data.Success,
      //   "Success",
      //   4000,
      //   null,
      //   null
      // );
      yield put(getTopSoldItemsSuccess(dishes.data));
    } else {
      // NotificationManager.error(
      //   "top sold dishes not found",
      //   "SOME ERROR OCCURED",
      //   4000,
      //   null,
      //   null
      // );
      yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetTopDishes() {
  yield takeLatest(GET_TOP_SOLD_DISHES, GetTopDishes);
}
///////////////////////////////////////////////////////////////////////////////////////




const GetPaymentMethodsAsync = async object =>
  await axios
  .post(`${BASE_URL}/api/sales_type_stats/`,object,{
    headers:{
      Authorization: "token " + localStorage.getItem("tokenId")
    }
  })
    
    .then(response => response)
    .catch(error => error.response.data);

function* GetPaymentMethods(object) {
  try {
    const payments = yield call(GetPaymentMethodsAsync, object.payload);
    if (payments.status === 200 || payments.status === 201) {
      // NotificationManager.success(
      //   dishes.data.Success,
      //   "Success",
      //   4000,
      //   null,
      //   null
      // );
      yield put(getPaymentMethodsSuccess(payments.data));
    } else {
      // NotificationManager.error(
      //   "top sold dishes not found",
      //   "SOME ERROR OCCURED",
      //   4000,
      //   null,
      //   null
      // );
      yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchPaymentMethodsDishes() {
  yield takeLatest(GET_PAYMENT_METHODS, GetPaymentMethods);
}
////////////////////////////////////////





const GetSalesAsync =async object =>
  await axios
  .post(`${BASE_URL}/api/sales_stats_hourly/`,object,{
    headers:{
      Authorization: "token " + localStorage.getItem("tokenId")
    }
  })
  .then(response=>response)
  .catch(error=> error.response);
  function* GetTopSales(object) {
    try {
      const Sales = yield call(GetSalesAsync, object.payload);
      if (Sales.status === 200 || Sales.status === 201) 
      {
          yield put(getSaleSuccess(Sales.data));
      }
      else 
      {
          yield put(dashboardFailure());
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }
export function* watchGetSales() {
    yield takeLatest(GET_SALES, GetTopSales);
  }


  
 /////////////////////////////////////////////////////// 



 ///********************************************************* *///////

 ///////////////////////////////////////////////////////////////////////////////////////



const GetSalesTrendAsync =async object =>
await axios
.post(`${BASE_URL}/api/sales_stats_hourly_comparison/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopSalesTrend(object) {
  try {
    const Sales = yield call(GetSalesTrendAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getSaleTrendSuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetSalesTrend() {
  yield takeLatest(GET_SALES_TREND, GetTopSalesTrend);
}





///////////////////////////////////////////////////////////////////////////////////////




//*********************************************************** */


const GetCategorySalesStatsAsync =async object =>
await axios
.post(`${BASE_URL}/api/category_sales_stats/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopCategorySalesStats(object) {
  try {
    const Sales = yield call(GetCategorySalesStatsAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getCategorySaleStatsSuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetCategorySalesStats() {
  yield takeLatest(  GET_CATEGORY_SALES_STATS    , GetTopCategorySalesStats);
}




//*********************************************************** */

//*********************************************************** */


const GetSalesStatsAsync =async object =>
await axios
.post(`${BASE_URL}/api/dish_sales_stats/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopSalesStats(object) {
  try {
    const Sales = yield call(GetSalesStatsAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getItemSaleStatsSuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetSalesStats() {
  yield takeLatest(  GET_ITEM_SALES_STATS    , GetTopSalesStats);
}




//*********************************************************** */

const GetSalesStatsHourlyAsync =async object =>
await axios
.post(`${BASE_URL}/api/dish_sales_stats_hourly/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopSalesStatsHourly(object) {
  try {
    const Sales = yield call(GetSalesStatsHourlyAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getItemSaleStatsHourlySuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetSalesStatsHourly() {
  yield takeLatest(  GET_ITEM_SALES_STATS_HOURLY    , GetTopSalesStatsHourly);
}

//*********************************************************** */
//*********************************************************** */

const GetCategorySalesStatsHourlyAsync =async object =>
await axios
.post(`${BASE_URL}/api/category_sales_stats_hourly/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopCategorySalesStatsHourly(object) {
  try {
    const Sales = yield call(GetCategorySalesStatsHourlyAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getCategorySaleStatsHourlySuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetCategorySalesStatsHourly() {
  yield takeLatest(  GET_CATEGORY_SALES_STATS_HOURLY    , GetTopCategorySalesStatsHourly);
}

//*********************************************************** */
const GetSalesWeeklyAsync =async object =>
await axios
.post(`${BASE_URL}/api/sales_stats_weekly_comparison/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopSalesWeekly(object) {
  try {
    const Sales = yield call(GetSalesWeeklyAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getSaleWeeklySuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetSalesWeekly() {
  yield takeLatest(GET_SALES_WEEKLY, GetTopSalesWeekly);
}




////////////////////////////////////////////////////////////////////////////////////////////////////



const GetSalesYearlyAsync =async object =>
await axios
.post(`${BASE_URL}/api/sales_stats_monthly_comparison/`,object,{
  headers:{
    Authorization: "token " + localStorage.getItem("tokenId")
  }
})
.then(response=>response)
.catch(error=> error.response);
function* GetTopSalesYearly(object) {
  try {
    const Sales = yield call(GetSalesYearlyAsync, object.payload);
    if (Sales.status === 200 || Sales.status === 201) 
    {
        yield put(getSaleYearlySuccess(Sales.data));
    }
    else 
    {
        yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetSalesYearly() {
  yield takeLatest(GET_SALES_YEARLY, GetTopSalesYearly);
}



///////////////////////////////////////////////////////////////////////
const GetSummaryAsync = async object =>
  await axios
    .post(`${BASE_URL}/api/cart_basic_stats/`,object, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        
      }
    })
    .then(response => response)
    .catch(error => error.response);
    
function* GetSummary(object) {
      try {
        const summary = yield call(GetSummaryAsync, object.payload);
        if (summary.status === 200 || summary.status === 201) {
          // NotificationManager.success(
          //   dishes.data.Success,
          //   "Success",
          //   4000,
          //   null,
          //   null
          // );
          
          yield put(getSummarySuccess(summary.data));
        } else {
          // NotificationManager.error(
          //   "least sold dishes not found",
          //   "SOME ERROR OCCURED",
          //   4000,
          //   null,
          //   null
          // );
          yield put(dashboardFailure());
        }
      } catch (error) {
        console.log("error : ", error);
      }
    }
export function* watchGetSummary() {
      yield takeLatest(GET_SUMMARY, GetSummary);
    }
const GetLeastDishesAsync = async object =>
  await axios
    .get(`${BASE_URL}/api/leastsales/`, {
      params: object,
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);



function* GetLeastDishes(object) {
  try {
    const dishes = yield call(GetLeastDishesAsync, object.payload);
    if (dishes.status === 200 || dishes.status === 201) {
      // NotificationManager.success(
      //   dishes.data.Success,
      //   "Success",
      //   4000,
      //   null,
      //   null
      // );
      yield put(getLeastSoldItemsSuccess(dishes.data));
    } else {
      // NotificationManager.error(
      //   "least sold dishes not found",
      //   "SOME ERROR OCCURED",
      //   4000,
      //   null,
      //   null
      // );
      yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}


export function* watchGetLeastDishes() {
  yield takeLatest(GET_LEAST_SOLD_DISHES, GetLeastDishes);
}

const GetFeedbackSentimentsAsync = async branch_id =>
  await axios
    .get(`${BASE_URL}/api/order_feedback/`, {

      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }, params: {
        branch_id: branch_id
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

function* GetFeedbackSentiments(object) {
  try {
    const feedback = yield call(GetFeedbackSentimentsAsync, object.payload);
    if (feedback.status === 200 || feedback.status === 201) {
      // NotificationManager.success("", "Success", 4000, null, null);
      if (!_.isEmpty(feedback.data)) {
        var feedbackArray = [];
        feedback.data.map(d => {
          if (!_.isEmpty(d.review)) {
            feedbackArray.push(d);
          }
          return null;
        })
        yield put(getFeedbackSentimentsSuccess(feedbackArray));
      }
      else {
        yield put(getFeedbackSentimentsSuccess(feedback.data));
      }

    } else {
      // NotificationManager.error(
      //   "feedback not found",
      //   "SOME ERROR OCCURED",
      //   4000,
      //   null,
      //   null
      // );
      yield put(dashboardFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchGetFeedbackSentiments() {
  yield takeLatest(GET_FEEDBACK_COMMENTS, GetFeedbackSentiments);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTopDishes),
    fork(watchGetSummary),
    fork(watchGetLeastDishes),
    fork(watchGetFeedbackSentiments),
    fork(watchGetSales),
    fork(watchGetSalesTrend),
    fork(watchGetSalesWeekly),
    fork(watchGetSalesYearly),
    fork(watchGetSalesStats),
    fork(watchGetSalesStatsHourly),
    fork(watchPaymentMethodsDishes),
    fork(watchGetCategorySalesStatsHourly),
    fork(watchGetCategorySalesStats)
  ]);
}
