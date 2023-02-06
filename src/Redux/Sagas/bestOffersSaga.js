import * as types from '../ActionTypes/bestOffersActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { getAllBestOffersApi } from '../APIs/bestOffersApi';
import { getAllBestOffersStError, getAllBestOffersStSuccess } from '../Actions/bestOffersActions';


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});


export function* ongetAllBestOffersStartAsync() {
    try {
        const response = yield call(getAllBestOffersApi);
        if (response.data.status === 200) {
            yield put(getAllBestOffersStSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllBestOffersStError(error.response));
    }
}

export function* onBestOffers() {
    yield takeLatest(types.GETALL_BESTOFFERS_START, ongetAllBestOffersStartAsync);
}


const bestOffersSagas = [
    fork(onBestOffers),
]

export default function* bestOfferSaga() {
    yield all([...bestOffersSagas]);
}