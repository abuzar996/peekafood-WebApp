import {
    GET_INVENTORY,
    GET_INVENTORY_SUCCESS,
    ADD_INVENTORY,
    ADD_INVENTORY_SUCCESS,
    EDIT_INVENTORY,
    EDIT_INVENTORY_SUCCESS,
    DELETE_INVENTORY,
    CALCULATE_INVENTORY,
    CALCULATE_INVENTORY_SUCCESS,
    DELETE_INVENTORY_SUCCESS,
    INVENTORY_FAILURE

} from "../actions";
export const getInventory = object => ({
    type: GET_INVENTORY,
    payload: object
});
export const getInventorySuccess = (inventory) => ({
    type: GET_INVENTORY_SUCCESS,
    payload: inventory
});
export const addInventory = obj => ({
    type: ADD_INVENTORY,
    payload: obj
})
export const addInventorySuccess = obj => ({
    type: ADD_INVENTORY_SUCCESS,
    payload: obj
})
export const editInventory = obj => ({
    type: EDIT_INVENTORY,
    payload: obj
})
export const editInventorySuccess = obj => ({
    type: EDIT_INVENTORY_SUCCESS,
    payload: obj
})
export const deleteInventory = id => ({
    type: DELETE_INVENTORY,
    payload: id
})
export const deleteInventorySuccess = (id) => ({
    type: DELETE_INVENTORY_SUCCESS,
    payload: id
})
export const calculateInventory = (object) => ({
    type: CALCULATE_INVENTORY,
    payload: object
})
export const calculateInventorySuccess = (object) => ({
    type: CALCULATE_INVENTORY_SUCCESS,
    payload: object
})
export const inventoryFailure = () => ({
    type: INVENTORY_FAILURE,
})