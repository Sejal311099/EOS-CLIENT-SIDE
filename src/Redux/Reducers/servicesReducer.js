
import * as types from "../ActionTypes/servicesActionTypes";

const initalState = {
    services: [],
    singleService: [],
    singleCategory: [],
    optionsLoad: []
}

const servicesReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GETALL_SERVICES_START:
        case types.GET_SINGLE_SERVICE_START:
        case types.GET_SINGLE_CATEGORY_START:
        case types.GET_SERVICES_FOR_OPTIONS_START:
            return {
                ...state,
            }
        case types.GETALL_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.payload,
            }
        case types.GET_SINGLE_SERVICE_SUCCESS:
            return {
                ...state,
                singleService: action.payload,
            }
        case types.GET_SINGLE_CATEGORY_SUCCESS:
            return {
                ...state,
                singleCategory: action.payload,
            }
        case types.GET_SERVICES_FOR_OPTIONS_SUCCESS:
            return {
                ...state,
                optionsLoad: action.payload,
            }
        case types.GETALL_SERVICES_ERROR:
        case types.GET_SINGLE_SERVICE_ERROR:
        case types.GET_SINGLE_CATEGORY_ERROR:
        case types.GET_SERVICES_FOR_OPTIONS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default servicesReducer;