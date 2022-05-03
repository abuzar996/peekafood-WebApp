import {
  GET_ALL_RESTAURANTS,
  GET_ALL_RESTAURANTS_SUCCESS,
  EDIT_RESTAURANT,
  EDIT_RESTAURANT_SUCCESS,
  GET_BRANCHES,
  GET_BRANCHES_SUCCESS,
  GET_DISHES,
  GET_DISHES_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  ADD_DISH,
  ADD_DISH_SUCCESS,
  EDIT_DISH,
  EDIT_DISH_SUCCESS,
  DELETE_DISH,
  DELETE_DISH_SUCCESS,
  ADD_CATEGORIES,
  ADD_CATEGORIES_SUCCESS,
  EDIT_CATEGORIES,
  EDIT_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_SUCCESS,
  ADD_BRANCH,
  ADD_BRANCH_SUCCESS,
  EDIT_BRANCH,
  EDIT_BRANCH_SUCCESS,
  DELETE_BRANCH,
  DELETE_BRANCH_SUCCESS,
  MIGRATE_MENU,
  MIGRATE_MENU_SUCCESS,
  MENU_FAILURE
} from "../actions";

export const getRestaurant = () => ({
  type: GET_ALL_RESTAURANTS
});
export const getRestaurantSuccess = restaurant => ({
  type: GET_ALL_RESTAURANTS_SUCCESS,
  payload: restaurant
});
export const editRestaurant = object => ({
  type: EDIT_RESTAURANT,
  payload: object
});
export const editRestaurantSuccess = object => ({
  type: EDIT_RESTAURANT_SUCCESS,
  payload: object
});
export const getBranch = restaurant => ({
  type: GET_BRANCHES,
  payload: restaurant
});
export const getBranchSuccess = branches => ({
  type: GET_BRANCHES_SUCCESS,
  payload: branches
});
export const addBranch = branch => ({
  type: ADD_BRANCH,
  payload: branch
});
export const addBranchSuccess = newBranch => ({
  type: ADD_BRANCH_SUCCESS,
  payload: newBranch
});
export const editBranch = branchData => ({
  type: EDIT_BRANCH,
  payload: branchData
});
export const editBranchSuccess = newBranch => ({
  type: EDIT_BRANCH_SUCCESS,
  payload: newBranch
});
export const deleteBranch = branch_id => ({
  type: DELETE_BRANCH,
  payload: branch_id
});
export const deleteBranchSuccess = branch_id => ({
  type: DELETE_BRANCH_SUCCESS,
  payload: branch_id
});
export const getDishes = branch_id => ({
  type: GET_DISHES,
  payload: branch_id
});
export const getDishesSuccess = dishes => ({
  type: GET_DISHES_SUCCESS,
  payload: dishes
});
export const getCategories = branch_id => ({
  type: GET_CATEGORIES,
  payload: branch_id
});
export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories
});
export const addDish = (formdata, inventory) => ({
  type: ADD_DISH,
  payload: formdata,
  dishInventory: inventory
});
export const addDishSuccess = data => ({
  type: ADD_DISH_SUCCESS,
  payload: data
});
export const editDish = data => ({
  type: EDIT_DISH,
  payload: data
});
export const editDishSuccess = data => ({
  type: EDIT_DISH_SUCCESS,
  payload: data
});
export const deleteDish = object => ({
  type: DELETE_DISH,
  payload: object
});
export const deleteDishSuccess = object => ({
  type: DELETE_DISH_SUCCESS,
  payload: object
});
export const addCategory = object => ({
  type: ADD_CATEGORIES,
  payload: object
});
export const addCategorySuccess = object => ({
  type: ADD_CATEGORIES_SUCCESS,
  payload: object
});
export const editCategory = object => ({
  type: EDIT_CATEGORIES,
  payload: object
});
export const editCategorySuccess = object => ({
  type: EDIT_CATEGORIES_SUCCESS,
  payload: object
});
export const deleteCategory = object => ({
  type: DELETE_CATEGORIES,
  payload: object
});
export const deleteCategorySuccess = object => ({
  type: DELETE_CATEGORIES_SUCCESS,
  payload: object
});
export const migratemenu = object => ({
  type: MIGRATE_MENU,
  payload: object
});
export const migrateMenuSuccess = message => ({
  type: MIGRATE_MENU_SUCCESS,
  payload: message
});
export const menuFailure = () => ({
  type: MENU_FAILURE
});
