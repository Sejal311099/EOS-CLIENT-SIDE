import * as types from "../ActionTypes/servicesActionTypes";

export const getAllServicesStart = (services) => ({
    type: types.GETALL_SERVICES_START,
    payload: services,
});

export const getAllServicesSuccess = (services) => ({
    type: types.GETALL_SERVICES_SUCCESS,
    payload: services,
});

export const getAllServicesError = (error) => ({
    type: types.GETALL_SERVICES_ERROR,
    payload: error,
});

export const getSingleServiceStart = (service) => ({
    type: types.GET_SINGLE_SERVICE_START,
    payload: service,
});

export const getSingleServiceSuccess = (service) => ({
    type: types.GET_SINGLE_SERVICE_SUCCESS,
    payload: service,
});

export const getSingleServiceError = (error) => ({
    type: types.GET_SINGLE_SERVICE_ERROR,
    payload: error,
});


export const getSingleCategoryStart = (category_id)  => ({
    type: types.GET_SINGLE_CATEGORY_START,
    payload: category_id,
});

export const getSingleCategorySuccess = (category_id) => ({
    type: types.GET_SINGLE_CATEGORY_SUCCESS,
    payload: category_id,
});

export const getSingleCategoryError = (error) => ({
    type: types.GET_SINGLE_CATEGORY_ERROR,
    payload: error,
})

// 
export const getServicesForOptionsStart = (services) => ({
    type: types.GET_SERVICES_FOR_OPTIONS_START,
    payload: services,
});

export const getServicesForOptionsSuccess = (services) => ({
    type: types.GET_SERVICES_FOR_OPTIONS_SUCCESS,
    payload: services,
});

export const getServicesForOptionsError = (error) => ({
    type: types.GET_SERVICES_FOR_OPTIONS_ERROR,
    payload: error,
});
