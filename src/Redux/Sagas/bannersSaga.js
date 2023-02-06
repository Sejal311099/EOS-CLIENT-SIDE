import * as types from '../ActionTypes/bannersActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";
import { getAllBannersApi } from '../APIs/bannersApi';
import { getAllBannersError, getAllBannersSuccess } from '../Actions/bannersActions';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});


export function* ongetAllBannersStartAsync() {
    try {
        const response = yield call(getAllBannersApi);
        if (response.data.status === 200) {
            yield put(getAllBannersSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllBannersError(error.response));
    }
}

export function* onBanners() {
    yield takeLatest(types.GETALL_BANNERS_START, ongetAllBannersStartAsync);
}


const bannersSagas = [
    fork(onBanners),
]

export default function* bannerSaga() {
    yield all([...bannersSagas]);
}