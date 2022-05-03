import {
  GET_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_TOP_SOLD_DISHES,
  GET_TOP_SOLD_DISHES_SUCCESS,
  GET_LEAST_SOLD_DISHES,
  GET_LEAST_SOLD_DISHES_SUCCESS,
  GET_FEEDBACK_COMMENTS,
  GET_FEEDBACK_COMMENTS_SUCCESS,
  GET_SALES,
  GET_SALES_SUCCESS,
  GET_SALES_TREND,
  GET_SALES_TREND_SUCCESS,
  GET_SALES_WEEKLY,
  GET_SALES_WEEKLY_SUCCESS,
  GET_SALES_YEARLY,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_SALES_YEARLY_SUCCESS,
  GET_ITEM_SALES_STATS,
  GET_ITEM_SALES_STATS_SUCCESS,
  GET_ITEM_SALES_STATS_HOURLY,
  GET_ITEM_SALES_STATS_HOURLY_SUCCESS,
  GET_CATEGORY_SALES_STATS,
  GET_CATEGORY_SALES_STATS_SUCCESS,
  GET_CATEGORY_SALES_STATS_HOURLY,
  GET_CATEGORY_SALES_STATS_HOURLY_SUCCESS,
  DASHBOARD_FAILURE
} from "../actions";
const INIT_STATE = {
  topDishes: [],
  summary:{},
  sales:{},
  sales_trend:{},
  sales_weekly:{},
  sales_yearly:{},
  category_sales_stats:[],
  category_sales_stats_hourly:{},
  sales_stats:[],
  sales_stats_hourly:{},
  leastDishes: [],
  feedbackSentiments: [],
  payment_methods:{},
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, loading: true ,summary:{}};
    case GET_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        summary: action.payload
    };
    case GET_PAYMENT_METHODS:
      return { ...state, loading: true ,payment_methods:{}};
    case GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        loading: false,
        payment_methods: action.payload
    };
    case GET_SALES:
      return { ...state, loading: true ,sales:{}};
    case GET_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: action.payload
    };


    case GET_ITEM_SALES_STATS:
      return { ...state, loading: true ,sales_stats:[]};
    case GET_ITEM_SALES_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        sales_stats: action.payload
    };
    case GET_ITEM_SALES_STATS_HOURLY:
      return { ...state, loading: true ,sales_stats_hourly:{}};
    case GET_ITEM_SALES_STATS_HOURLY_SUCCESS:
      return {
        ...state,
        loading: false,
        sales_stats_hourly: action.payload
    };



    case GET_CATEGORY_SALES_STATS:
      return { ...state, loading: true ,category_sales_stats:[]};
    case GET_CATEGORY_SALES_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        category_sales_stats: action.payload
    };
    case GET_CATEGORY_SALES_STATS_HOURLY:
      return { ...state, loading: true ,category_sales_stats_hourly:{}};
    case GET_CATEGORY_SALES_STATS_HOURLY_SUCCESS:
      return {
        ...state,
        loading: false,
        category_sales_stats_hourly: action.payload
    };




    case GET_SALES_TREND:
      return { ...state, loading: true ,sales_trend:{}};
    case GET_SALES_TREND_SUCCESS:
      return {
        ...state,
        loading: false,
        sales_trend: action.payload
    };

    case GET_SALES_WEEKLY:
      return { ...state, loading: true ,sales_weekly:{}};
    case GET_SALES_WEEKLY_SUCCESS:
      return {
        ...state,
        loading: false,
        sales_weekly: action.payload
    };

    case GET_SALES_YEARLY:
      return { ...state, loading: true ,sales_yearly:{}};
    case GET_SALES_YEARLY_SUCCESS:
      return {
        ...state,
        loading: false,
        sales_yearly: action.payload
    };


    case GET_TOP_SOLD_DISHES:
      return { ...state, loading: true, topDishes: [] };
    case GET_TOP_SOLD_DISHES_SUCCESS:
      return { ...state, loading: false, topDishes: action.payload };
    case GET_LEAST_SOLD_DISHES:
      return { ...state, loading: true, leastDishes: [] };
    case GET_LEAST_SOLD_DISHES_SUCCESS:
      return { ...state, loading: false, leastDishes: action.payload };
    case GET_FEEDBACK_COMMENTS:
      return { ...state, loading: true, feedbackSentiments: [] };
    case GET_FEEDBACK_COMMENTS_SUCCESS:
      return { ...state, loading: false, feedbackSentiments: action.payload };
    case DASHBOARD_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
