import * as types from '../ActionTypes/servicesActionTypes';
import { all, call, fork, put, takeLatest, takeLeading } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { getAllServicesApi, getServicesApi, getSingleCategoryApi, getSingleServiceApi } from '../APIs/servicesApi';
import { getAllServicesSuccess, getAllServicesError, getSingleServiceSuccess, getSingleServiceError, getSingleCategorySuccess, getSingleCategoryError, getServicesForOptionsSuccess, getServicesForOptionsError } from '../Actions/servicesActions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});


export function* ongetAllServicesStartAsync() {
    try {
        const response = yield call(getAllServicesApi);
        if (response.data.status === 200) {
            yield put(getAllServicesSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllServicesError(error.response));
    }
}

export function* ongetSingleServiceStartAsync({ payload }) {
    try {
        const response = yield call(getSingleServiceApi, payload);
        if(response.data.status === 200) {
            yield put(getSingleServiceSuccess(response?.data?.categoriesData))
        } 
    } catch (error) {
        yield put(getSingleServiceError(error.response));
    }
}

export function* ongetSingleCategoryStartAsync({ payload }) {
    try {
       const response =  yield call(getSingleCategoryApi, payload);
       if (response.data.status === 200) {
            yield put(getSingleCategorySuccess(response?.data))
       }
    } catch (error) {
        yield put(getSingleCategoryError(error.response));
    }
}

export function* ongetServicesForOptionsStartAsync() {
    try {
        const response = yield call(getServicesApi);
        if (response.data.status === 200) {
            yield put(getServicesForOptionsSuccess(response.data));
        }
    } catch (error) {
        yield put(getServicesForOptionsError(error.response));
    }
}


export function* onServicesGetAllOptions() {
    yield takeLatest(types.GET_SERVICES_FOR_OPTIONS_START, ongetServicesForOptionsStartAsync);
}


export function* onServices() {
    yield takeLatest(types.GETALL_SERVICES_START, ongetAllServicesStartAsync);
}

export function* onSingleService() {
    yield takeLatest(types.GET_SINGLE_SERVICE_START, ongetSingleServiceStartAsync);
}

export function* onSingleCategory() {
    yield takeLatest(types.GET_SINGLE_CATEGORY_START, ongetSingleCategoryStartAsync);
}

const servicesSagas = [
    fork(onServices),
    fork(onSingleService),
    fork(onSingleCategory),
    fork(onServicesGetAllOptions),

]

export default function* servicesSaga() {
    yield all([...servicesSagas]);
}