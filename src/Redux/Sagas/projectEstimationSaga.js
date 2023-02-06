import * as types from '../ActionTypes/projectestimationActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { projectEstimationError, projectEstimationSuccess } from '../Actions/projectEstimationActions';
import { projectEstimationApi } from '../APIs/userApi';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});

export function* onProjectEstimationStartAsync({ payload }) {
    try {
        const response = yield call(projectEstimationApi, payload);
        if (response.data.status === 200) {
            yield put(projectEstimationSuccess(response.data));            
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(projectEstimationError(error));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.email,
        });
    }
}

export function* onProjectEstimationDone() {
    yield takeLatest(types.PROJECT_ESTIMATION_START, onProjectEstimationStartAsync);
}

const projectEstimationSagas = [
    fork(onProjectEstimationDone),
]

export default function* projectEstimationSaga() {
    yield all([...projectEstimationSagas]);
}