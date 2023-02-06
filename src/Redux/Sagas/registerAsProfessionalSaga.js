import * as types from '../ActionTypes/registerAsProfessionalActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { registerAsProfessionalError, registerAsProfessionalSuccess } from '../Actions/registerAsProfessionalAction';
import { registerAsProfessionalApi } from '../APIs/userApi';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});

export function* onRegisterAsProfessionalStartAsync({ payload }) {
    try {
        const response = yield call(registerAsProfessionalApi, payload);
        if (response.data.status === 200) {
            yield put(registerAsProfessionalSuccess(response.data));            
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(registerAsProfessionalError(error));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.email || error.response.data.errors.phonenumber,
        });
    }
}

export function* registerAsProfessionalDone() {
    yield takeLatest(types.REGISTER_AS_PROFESSIONAL_START, onRegisterAsProfessionalStartAsync);
}

const RegisterAsProfessionalSagas = [
    fork(registerAsProfessionalDone),
]

export default function* registerAsProfessionalSaga() {
    yield all([...RegisterAsProfessionalSagas]);
}