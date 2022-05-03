import {
    GET_INVENTORY,
    GET_INVENTORY_SUCCESS,
    ADD_INVENTORY,
    ADD_INVENTORY_SUCCESS,
    EDIT_INVENTORY,
    EDIT_INVENTORY_SUCCESS,
    DELETE_INVENTORY,
    DELETE_INVENTORY_SUCCESS,
    CALCULATE_INVENTORY,
    CALCULATE_INVENTORY_SUCCESS,
    INVENTORY_FAILURE
} from "../actions"
const INIT_STATE = {
    inventoryItems: [],
    inventoryCalculation: [],
    loading: false
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_INVENTORY:
            return {...state, loading: true, inventoryItems: [] };
        case GET_INVENTORY_SUCCESS:
            return {...state, loading: false, inventoryItems: action.payload };
        case ADD_INVENTORY:
            return {...state, loading: true };
        case ADD_INVENTORY_SUCCESS:
            return {...state, loading: false, inventoryItems: [...state.inventoryItems, action.payload] };
        case EDIT_INVENTORY:
            return {...state, loading: true };
        case EDIT_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventoryItems: [
                    ...state.inventoryItems.map(item => {

                        return item.id === action.payload.id ? {
                                ...item,
                                item_name: action.payload.item_name,
                                unit: action.payload.unit,
                                threshold: action.payload.threshold,
                                price_per_unit: action.payload.price_per_unit,
                                quantity: action.payload.quantity,
                                stock_quantity: action.payload.stock_quantity,


                            } :
                            item
                    })
                ]
            };
        case DELETE_INVENTORY:
            return {...state, loading: true };
        case DELETE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventoryItems: [
                    ...state.inventoryItems.filter(
                        item => item.id !== action.payload
                    )
                ]
            };
        case CALCULATE_INVENTORY:
            return {...state, loading: true, inventoryCalculation: [] };
        case CALCULATE_INVENTORY_SUCCESS:
            return {...state, loading: false, inventoryCalculation: action.payload }
        case INVENTORY_FAILURE:
            return {...state, loading: false };
        default:
            return {...state };
    }
};