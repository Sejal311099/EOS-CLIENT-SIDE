import * as types from '../ActionTypes/updateProfileActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { UpdateProfileError, UpdateProfileSuccess } from '../Actions/UpdateProfileActions';
import { UpdateProfileApi } from '../APIs/userApi';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});

export function* onProjectUpdatePRofileStartAsync({ payload }) {
    try {
        const response = yield call(UpdateProfileApi, payload);
        if (response.data.status === 200) {
            yield put(UpdateProfileSuccess(response.data));            
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(UpdateProfileError(error));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.email,
        });
    }
}

export function* onProjectProfileUpdate() {
    yield takeLatest(types.UPDATE_PROFILE_START, onProjectUpdatePRofileStartAsync);
}

const updateProfileSagas = [
    fork(onProjectProfileUpdate),
]

export default function* updateProfileSaga() {
    yield all([...updateProfileSagas]);
}