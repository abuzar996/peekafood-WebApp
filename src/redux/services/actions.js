import {
ADD_SERVICES,
ADD_SERVICES_SUCCESS,
GET_SERVICES,
GET_SERVICES_SUCCESS,
UPDATE_SERVICES,
UPDATE_SERVICES_SUCCESS,
SERVICE_FALIURE,
} from "../actions"
export const addService=(object)=>({
    type:ADD_SERVICES,
    payload:object
})
export const addServicesSuccess=result=>({
    type:ADD_SERVICES_SUCCESS,
    payload:result
})
export const getServices=(account_string)=>({
    type:GET_SERVICES,
    payload:account_string
})
export const getServicesSuccess=result=>({
    type:GET_SERVICES_SUCCESS,
    payload:result
})
export const updateServices=data=>({
    type:UPDATE_SERVICES,
    payload:data
})
export const updateServicesSuccess=result=>({
    type:UPDATE_SERVICES_SUCCESS,
    payload:result
})
export const ServiceFailiure=()=>({
    type:SERVICE_FALIURE
})