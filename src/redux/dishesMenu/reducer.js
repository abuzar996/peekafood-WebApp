import {
    GET_ALL_RESTAURANTS,
    GET_ALL_RESTAURANTS_SUCCESS,
    EDIT_RESTAURANT,
    EDIT_RESTAURANT_SUCCESS,
    GET_BRANCHES,
    GET_BRANCHES_SUCCESS,
    ADD_BRANCH,
    ADD_BRANCH_SUCCESS,
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
    EDIT_BRANCH,
    EDIT_BRANCH_SUCCESS,
    DELETE_BRANCH,
    DELETE_BRANCH_SUCCESS,
    MIGRATE_MENU,
    MIGRATE_MENU_SUCCESS,
    MENU_FAILURE
} from "../actions";
const INIT_STATE = {
    restaurant: [],
    branches: [],
    dishes: [],
    categories: [],
    loading: false,
    message: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_RESTAURANTS:
            return {...state, loading: true, restaurant: [] };
        case GET_ALL_RESTAURANTS_SUCCESS:
            return {...state, loading: false, restaurant: action.payload };
        case EDIT_RESTAURANT:
            return {...state, loading: true };
        case EDIT_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: [
                    ...state.restaurant.map(rest =>
                        rest.id === action.payload.id ?
                        {
                            ...rest,
                            name: action.payload.name,
                            RESTAURANT_IMAGES: action.payload.RESTAURANT_IMAGES.map(
                                img => img
                            ),
                            strn:action.payload.strn,
                            address: action.payload.address,
                            phone_number: action.payload.phone_number,
                            account_string: action.payload.account_string,
                            id: action.payload.id,
                            description:action.payload.description,
                            created_by: action.payload.created_by,
                            title: action.payload.title
                        } :
                        rest
                    )
                ]
            };
        case GET_BRANCHES:
            return {...state, loading: true, branches: [] };
        case GET_BRANCHES_SUCCESS:
            return {...state, loading: false, branches: action.payload };
        case ADD_BRANCH:
            return {...state, loading: true };
        case ADD_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                branches: [...state.branches, action.payload]
            };
        case EDIT_BRANCH:
            return {...state, loading: true };
        case EDIT_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                branches: [
                    ...state.branches.map(branch =>
                        branch.id === action.payload.id ?
                        {
                            ...branch,
                            branch_name: action.payload.branch_name,
                            strn:action.payload.strn,
                            address: action.payload.address,
                            phone_number: action.payload.phone_number,
                            open_time: action.payload.open_time,
                            close_time: action.payload.close_time,
                            id: action.payload.id,
                            tax_amount: action.payload.tax_amount,
                            branch_image: action.payload.branch_image,
                            seating: action.payload.seating,
                            latitude: action.payload.latitude,
                            radius: action.payload.radius,
                            longitude: action.payload.longitude
                        }:
                        branch
                    )
                ]
            };
        case DELETE_BRANCH:
            return {...state, loading: true };
        case DELETE_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                branches: [
                    ...state.branches.filter(branch => {
                        return branch.id !== action.payload;
                    })
                ]
            };
        case GET_DISHES:
            return {...state, loading: true, dishes: [] };
        case GET_DISHES_SUCCESS:
            return {...state, loading: false, dishes: action.payload };
        case GET_CATEGORIES:
            return {...state, loading: true, categories: [] };
        case GET_CATEGORIES_SUCCESS:
            return {...state, loading: false, categories: action.payload };
        case ADD_DISH:
            return {...state, loading: true };
        case ADD_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                dishes: [...state.dishes, action.payload]
            };
        case EDIT_DISH:
            return {...state, loading: true };
        case EDIT_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                dishes: [
                    ...state.dishes.map(dish =>
                        dish.id === action.payload.id ?
                        {
                            ...dish,
                            available: action.payload.available,
                            category_id: action.payload.category_id,
                            description: action.payload.description,
                            DISH_IMAGES: action.payload.DISH_IMAGES.map(img => img),
                            available_in_branches:action.payload.available_in_branches.map(available=>available),
                            dish_name: action.payload.dish_name,
                            id: action.payload.id,
                            price: action.payload.price,
                            featured: action.payload.featured,
                            discount_percentage: action.payload.discount_percentage,
                            discount_start_time: action.payload.discount_start_time,
                            discount_end_time: action.payload.discount_end_time,
                            trending: action.payload.trending,
                            sub_price_title: action.payload.sub_price_title,
                            unique_dish_code: action.payload.unique_dish_code,
                            rating: action.payload.rating,
                            DISH_SUB_PRICES: action.payload.DISH_SUB_PRICES.map(
                                sub => sub
                            ),
                            DISH_WARNINGS: action.payload.DISH_WARNINGS.map(dish => dish),
                            DISH_INGREDIENTS: action.payload.DISH_INGREDIENTS.map(
                                ing => ing
                            ),
                            DISH_ADD_ON: action.payload.DISH_ADD_ON.map(add => add),
                            search_tag: action.payload.search_tag
                        } :
                        dish
                    )
                ]
            };
        case DELETE_DISH:
            return {...state, loading: true };
        case DELETE_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                dishes: [
                    ...state.dishes.filter(dish => dish.id !== action.payload.dish_id)
                ]
            };
        case ADD_CATEGORIES:
            return {...state, loading: true };
        case ADD_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload]
            };
        case EDIT_CATEGORIES:
            return {...state, loading: true };
        case EDIT_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [
                    ...state.categories.map(category =>
                        category.id === action.payload.id ?
                        {
                            ...category,
                            name: action.payload.name,
                            category_image: action.payload.category_image,
                            description: action.payload.description
                        } :
                        category
                    )
                ]
            };
        case DELETE_CATEGORIES:
            return {...state, loading: true };
        case DELETE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [
                    ...state.categories.filter(
                        category => category.id !== action.payload.category_id
                    )
                ]
            };
        case MIGRATE_MENU:
            return {...state, loading: true };
        case MIGRATE_MENU_SUCCESS:
            return {...state, loading: false, message: action.payload };
        case MENU_FAILURE:
            return {...state, loading: false };
        default:
            return {...state };
    }
};