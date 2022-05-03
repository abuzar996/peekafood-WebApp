import {
    all,
    call,
    fork,
    put,
    takeEvery,
    takeLatest,
    takeLeading
} from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import {
    GET_ALL_RESTAURANTS,
    EDIT_RESTAURANT,
    GET_BRANCHES,
    ADD_BRANCH,
    GET_DISHES,
    GET_CATEGORIES,
    ADD_DISH,
    EDIT_DISH,
    DELETE_DISH,
    ADD_CATEGORIES,
    EDIT_CATEGORIES,
    DELETE_CATEGORIES,
    EDIT_BRANCH,
    DELETE_BRANCH,
    MIGRATE_MENU
} from "../actions";
import _ from 'lodash';
import {
    getRestaurantSuccess,
    editRestaurantSuccess,
    getBranchSuccess,
    getDishesSuccess,
    getCategoriesSuccess,
    addDishSuccess,
    editDishSuccess,
    deleteDishSuccess,
    addCategorySuccess,
    addBranchSuccess,
    editBranchSuccess,
    deleteBranchSuccess,
    migrateMenuSuccess,
    editCategorySuccess,
    deleteCategorySuccess,
    menuFailure
} from "./actions";
import { BASE_URL } from "../../../src/API";

const getAllRestaurantAsync = async () =>
    await axios
        .get(`${BASE_URL}/api/restaurant/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response.data);

function* getAllRestaurant() {
    try {
        const restaurant = yield call(getAllRestaurantAsync);
        if (restaurant.status === 200) {
            yield put(getRestaurantSuccess(restaurant.data));
        } else {
            NotificationManager.error(
                restaurant.error,
                "Check credentials, Restaurant not found",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        NotificationManager.error("", "Connectivity Error", 3000, null, null);

    }
}
export function* watchGetRestaurant() {
    yield takeEvery(GET_ALL_RESTAURANTS, getAllRestaurant);
}
const editRestaurantAsync = async restaurant =>
    await axios
        .patch(`${BASE_URL}/api/restaurant/`, restaurant, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response.data);

function* editRestaurant(restaurant) {
    try {
        const editedBranch = yield call(editRestaurantAsync, restaurant.payload);
        
        if (editedBranch.status === 200 || editedBranch.status === 201) {
            yield put(editRestaurantSuccess(editedBranch.data));
            NotificationManager.success(
                "Restaurant Info Updated",
                "Success",
                4000,
                null,
                null
            );
        } else {
            NotificationManager.error(
                editedBranch.error || editedBranch.detail,
                "Edit Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchEditRestaurant() {
    yield takeEvery(EDIT_RESTAURANT, editRestaurant);
}

const getBranchesAsync = async restaurant =>
    await axios
        .get(`${BASE_URL}/api/branch/${restaurant.name}/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* getBranches(restaurant) {
    try {
        const branch = yield call(getBranchesAsync, restaurant.payload);
        if (branch.status === 200) {
            yield put(getBranchSuccess(branch.data));
        } else if (branch.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {
            //NotificationManager.error(branch.detail, "Branches", 4000, null, null);
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}
export function* watchGetBranch() {
    yield takeLeading(GET_BRANCHES, getBranches);
}

const getDishesAsync = async id =>
    await axios
        .get(`${BASE_URL}/api/restaurants/dishes/`, {
            params: {
                restaurant_id: id
            },
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* getDishes(id) {
    try {
        const dishes = yield call(getDishesAsync, id.payload);
        if (dishes.status === 200) {
            yield put(getDishesSuccess(dishes.data));
        } else if (dishes.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {
            // NotificationManager.error(
            //   dishes.error || dishes.detail,
            //   "Dishes",
            //   4000,
            //   null,
            //   null
            // );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchGetDishes() {
    yield takeLatest(GET_DISHES, getDishes);
}

const getCategoriesAsync = async id =>
    await axios
        .get(`${BASE_URL}/api/restaurants/category/`, {
            params: {
                restaurant_id: id
            },
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* getCategories(id) {
    try {
        const categories = yield call(getCategoriesAsync, id.payload);
        if (categories.status === 200) {
            yield put(getCategoriesSuccess(categories.data));
        } else if (categories.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {
            // NotificationManager.error(
            //   categories.error || categories.detail,
            //   "Categories",
            //   4000,
            //   null,
            //   null
            // );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchGetCategories() {
    yield takeLatest(GET_CATEGORIES, getCategories);
}

const addDishAsync = async dish =>
    await axios
        .post(`${BASE_URL}/api/restaurants/dishes/`, dish, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "multipart/form-data;"
            }
        })
        .then(response => response)
        .catch(error => error.response);

const addInventoryAsync = async dish =>
    await axios
        .post(`${BASE_URL}/api/dish/itemusage`, dish, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),

            }
        })
        .then(response => response)
        .catch(error => error.response);
function* addDish(dish) {
    try {
        const addedDish = yield call(addDishAsync, dish.payload);
        if (addedDish.status === 200 || addedDish.status === 201) {
            //console.log(dish.dishInventory);
            let array = [];
            array = dish.dishInventory;
            if (!_.isEmpty(array)) {
                // let formData = new FormData();
                // formData.append("dish_id", addedDish.data.id);
                // formData.append("inventory", JSON.stringify(array));
                let formData = {
                    dish_id: addedDish.data.id,
                    inventory: array
                }
                const dish = yield call(addInventoryAsync, formData);
                if (dish.status === 200 || dish.status === 201) {
                    yield put(addDishSuccess(addedDish.data));
                    NotificationManager.success(
                        "New Dish Added with Inventory",
                        "Success",
                        5000,
                        null,
                        null
                    );
                }
            }
            else {
                yield put(addDishSuccess(addedDish.data));
                NotificationManager.success(
                    "New Dish Added",
                    "Success",
                    5000,
                    null,
                    null
                );
            }

        } else if (addedDish.status === 400) {
            NotificationManager.error(
                "Dish Code must be Unique",
                "Dish Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        } else {
            NotificationManager.error(
                addedDish.error || addedDish.detail,
                "Dish Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);

    }
}

export function* watchAddDish() {
    yield takeEvery(ADD_DISH, addDish);
}

const editDishAsync = async dish =>
    await axios
        .patch(`${BASE_URL}/api/restaurants/dishes/`, dish, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "multipart/form-data;"
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* editDish(dish) {
    try {
        const editedDish = yield call(editDishAsync, dish.payload);

        if (editedDish.status === 200 || editedDish.status === 201) {
            yield put(editDishSuccess(editedDish.data));
            NotificationManager.success(
                "Dish Info Updated",
                "Success",
                5000,
                null,
                null
            );
        } else if (editedDish.status === 400) {
            NotificationManager.error(
                "Dish Code must be Unique",
                "Dish Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        } else {
            NotificationManager.error(
                editedDish.error || editedDish.detail,
                "Dish Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchEditDish() {
    yield takeEvery(EDIT_DISH, editDish);
}

const deleteDishAsync = async dish => {
    return await axios
        .delete(`${BASE_URL}/api/restaurants/dishes/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "application/json"
            },

            data: {
                dish_id: dish.dish_id
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
};

function* deleteDish(dish) {
    try {
        const deletedDish = yield call(deleteDishAsync, dish.payload);
        console.log(deletedDish);
        if (deletedDish.status === 200 || deletedDish.status === 201) {
            yield put(deleteDishSuccess(dish.payload));
            NotificationManager.success(
                deletedDish.data.Success,
                "Success",
                4000,
                null,
                null
            );
        } else {
            NotificationManager.error(
                deletedDish.error || deletedDish.detail,
                "Dish Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchDeleteDish() {
    yield takeEvery(DELETE_DISH, deleteDish);
}

const addCategoryAsync = async category => {
    return await axios
        .post(`${BASE_URL}/api/restaurants/category/`, category, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "multipart/form-data;"
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
};

function* addCategory(object) {
    try {
        const category = yield call(addCategoryAsync, object.payload);
        if (category.status === 200 || category.status === 201) {
            yield put(addCategorySuccess(category.data));
            NotificationManager.success(
                "New Category Added",
                "Success",
                5000,
                null,
                null
            );
        } else {
            NotificationManager.error(
                category.error || category.detail,
                "Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchAddCategory() {
    yield takeEvery(ADD_CATEGORIES, addCategory);
}

const editCategoryAsync = async category => {
    return await axios
        .patch(`${BASE_URL}/api/restaurants/category/`, category, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "multipart/form-data;"
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
};

function* editCategory(object) {
    try {
        const category = yield call(editCategoryAsync, object.payload);
        if (category.status === 200 || category.status === 201) {
            NotificationManager.success(
                "Category Info Updated",
                "Success",
                5000,
                null,
                null
            );
            yield put(editCategorySuccess(category.data));
        } else {
            NotificationManager.error(
                category.error || category.detail,
                "Error",
                5000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchEditCategory() {
    yield takeEvery(EDIT_CATEGORIES, editCategory);
}

const deleteCategoryAsync = async category => {

    return await axios
        .delete(`${BASE_URL}/api/restaurants/category/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "application/json"
            },
            data: {
                category_id: category.category_id
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
};

function* deleteCategory(object) {
    try {
        const category = yield call(deleteCategoryAsync, object.payload);
        if (category.status === 200 || category.status === 201) {
            NotificationManager.success(
                "Category Deleted!",
                "Success",
                4000,
                null,
                null
            );
            yield put(deleteCategorySuccess(object.payload));
        } else {
            NotificationManager.error(
                category.error || category.detail,
                "Category Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchDeleteCategory() {
    yield takeEvery(DELETE_CATEGORIES, deleteCategory);
}

const addBranchAsync = async branch =>
    await axios
        .post(`${BASE_URL}/api/branch/`, branch, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "multipart/form-data;"
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
const addBranchInventoryAsync = async branch =>
    await axios
        .post(`${BASE_URL}/api/v1/inventory/`, { branch_id: branch }, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),

            }
        })
        .then(response => response)
        .catch(error => error.response.data);
function* addBranch(branch) {
    try {
        const addedBranch = yield call(addBranchAsync, branch.payload);
        console.log(addedBranch.status);
        if (addedBranch.status === 200 || addedBranch.status === 201) {

            yield call(addBranchInventoryAsync, addedBranch.data.id)
            yield put(addBranchSuccess(addedBranch.data));
            NotificationManager.success(
                "New Branch Added",
                "Success",
                4000,
                null,
                null
            );
        } else {
            NotificationManager.error(
                addedBranch.error || addedBranch.detail,
                "Branch Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);

    }
}

export function* watchAddBranch() {
    yield takeEvery(ADD_BRANCH, addBranch);
}
const editBranchAsync = async branch =>
    await axios
        .patch(`${BASE_URL}/api/branch/`, branch, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response.data);

function* editBranch(branch) {
    try {
        const editedBranch = yield call(editBranchAsync, branch.payload);
        if (editedBranch.status === 200 || editedBranch.status === 201) {
            yield put(editBranchSuccess(editedBranch.data));
            NotificationManager.success(
                "Branch Info Updated",
                "Success",
                4000,
                null,
                null
            );
        } else {
            NotificationManager.error(
                editedBranch.error || editedBranch.detail,
                "Branch Edit Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchEditBranch() {
    yield takeEvery(EDIT_BRANCH, editBranch);
}

const deleteBranchAsync = async branch_id => {
    return await axios
        .delete(`${BASE_URL}/api/branch/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "application/json"
            },

            data: {
                branch_id: branch_id
            }
        })
        .then(response => response)
        .catch(error => error.response.data);
};

function* deleteBranch(branch) {
    try {
        const deletedBranch = yield call(deleteBranchAsync, branch.payload);
        if (deletedBranch.status === 200 || deletedBranch.status === 201) {
            NotificationManager.success(
                "Branch deleted",
                "Success",
                4000,
                null,
                null
            );
            yield put(deleteBranchSuccess(branch.payload));
        } else {
            NotificationManager.error(
                deletedBranch.error || deletedBranch.detail,
                "Branch Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);

    }
}

export function* watchDeleteBranch() {
    yield takeEvery(DELETE_BRANCH, deleteBranch);
}

const migrateMenuAsync = async data =>
    await axios
        .post(`${BASE_URL}/api/migrate_menu/`, data, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response.data);

function* migrateMenu(object) {
    try {

        const migratedMenu = yield call(migrateMenuAsync, object.payload);
        if (migratedMenu.status === 200 || migratedMenu.status === 201) {
            yield put(migrateMenuSuccess(migratedMenu.data));
            NotificationManager.success("Menu Migrated", "Success", 4000, null, null);
        } else {
            NotificationManager.error(
                migratedMenu.error || migratedMenu.detail,
                "Migration Error",
                4000,
                null,
                null
            );
            yield put(menuFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchMigrateMenu() {
    yield takeEvery(MIGRATE_MENU, migrateMenu);
}

export default function* rootSaga() {
    yield all([
        fork(watchEditRestaurant),
        fork(watchGetRestaurant),
        fork(watchGetBranch),
        fork(watchGetDishes),
        fork(watchGetCategories),
        fork(watchAddDish),
        fork(watchEditDish),
        fork(watchDeleteDish),
        fork(watchAddCategory),
        fork(watchEditCategory),
        fork(watchDeleteCategory),
        fork(watchAddBranch),
        fork(watchEditBranch),
        fork(watchDeleteBranch),
        fork(watchMigrateMenu)
    ]);
}