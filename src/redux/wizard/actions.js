import {
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  EDIT_PINFO,
  ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_INFO_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  GET_SAMPLE_CATEGORIES,
  GET_SAMPLE_CATEGORIES_SUCCESS,
  WIZARD_FAILURE,
  ADD_ACCESS_INFO,
  ADD_ACCESS_INFO_SUCCESS
} from "../actions";

export const uploadImage = image => ({
  type: IMAGE_UPLOAD,
  payload: image
});
export const uploadImageSuccess = result => ({
  type: IMAGE_UPLOAD_SUCCESS,
  payload: result
});
export const addAccessInfo = object => ({
  type: ADD_ACCESS_INFO,
  payload: object
});
export const addAccessInfoSuccess = result => ({
  type: ADD_ACCESS_INFO_SUCCESS,
  payload: result
});
export const editPersonalInfo = data => ({
  type: EDIT_PINFO,
  payload: data
});
export const editPersonalInfoSuccess = result => ({
  type: ADD_INFO_SUCCESS,
  payload: result
});
export const addRestaurantInfo = data => ({
  type: ADD_RESTAURANT,
  payload: data
});
export const addRestaurantInfoSuccess = result => ({
  type: ADD_RESTAURANT_SUCCESS,
  payload: result
});
export const addRestaurantInfoFailure = result => ({
  type: ADD_RESTAURANT_FAILURE,
  payload: result
});
export const getSampleCategories = () => ({
  type: GET_SAMPLE_CATEGORIES
});
export const getSampleCategoriesSuccess = categories => ({
  type: GET_SAMPLE_CATEGORIES_SUCCESS,
  payload: categories
});
export const wizardFailure = () => ({
  type: WIZARD_FAILURE
});
