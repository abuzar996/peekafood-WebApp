import {
    ADD_SERVICES,
    ADD_SERVICES_SUCCESS,
    GET_SERVICES,
    GET_SERVICES_SUCCESS,
    UPDATE_SERVICES,
    UPDATE_SERVICES_SUCCESS,
    SERVICE_FALIURE,
    } from "../actions"
const INIT_STATE = {
    service: {},
    loading: false
};
export default (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_SERVICES:
            return {...state,loading:true,service:{}}
        case GET_SERVICES_SUCCESS:
            return {...state,loading:false,service:action.payload}
            
        case ADD_SERVICES:
            return {...state,loading:true,service:{}}
        case ADD_SERVICES_SUCCESS:
            return {...state,loading:false,service:action.payload}
        case UPDATE_SERVICES:
            return { ...state, loading: true };
        case UPDATE_SERVICES_SUCCESS:
            return {...state,loading:false,service:action.payload}
        case SERVICE_FALIURE:
            return { ...state,loading:false}
        default:
            return { ...state };
    }
}