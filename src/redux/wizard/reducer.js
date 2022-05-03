import {
  IMAGE_UPLOAD,
  EDIT_PINFO,
  ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  GET_SAMPLE_CATEGORIES,
  GET_SAMPLE_CATEGORIES_SUCCESS,
  ADD_ACCESS_INFO,
  ADD_ACCESS_INFO_SUCCESS,
  WIZARD_FAILURE
} from "../actions";
const INIT_STATE = {
  flag: false,
  data: {},
  message: "",
  access:{},
  sampleCategories: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return { ...state, message: action.message };
    case EDIT_PINFO:
      return { ...state, message: "" };
    case ADD_RESTAURANT:
      return { ...state, data: {}, flag: false };
    case ADD_RESTAURANT_SUCCESS:
      return { ...state, data: action.payload };
    case ADD_ACCESS_INFO:
      return { ...state, access: {}, flag: false };
    case ADD_ACCESS_INFO_SUCCESS:
      return { ...state, access: action.payload };
    case ADD_RESTAURANT_FAILURE:
      return { ...state, flag: true };
    case GET_SAMPLE_CATEGORIES:
      return { ...state, flag: true, sampleCategories: [] };
    case GET_SAMPLE_CATEGORIES_SUCCESS:
      return { ...state, flag: false, sampleCategories: action.payload };
    case WIZARD_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return { ...state };
  }
};
