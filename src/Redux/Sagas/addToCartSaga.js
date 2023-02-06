import * as types from '../ActionTypes/addToCartActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { addItemtoCartApi, 
    allItemDeleteFromCartApi, 
    deleteItemtoCartApi, 
    getAllCartItemApi } from '../APIs/addToCartApi';
    
import { 
    addItemToCartItemError, 
    addItemToCartItemSuccess, 
    deleteAllItemfromCartSuccess, 
    deleteItemToCartItemError, 
    deleteItemToCartItemSuccess, 
    getAllAddtoCartItemError, 
    getAllAddtoCartItemSuccess } from '../Actions/addToCartActions';


export function* ongetAllCartItemStartAsync({ payload} ) {
    try {
        const response = yield call(getAllCartItemApi, payload);
        if (response.data.status === 200) {
            yield put(getAllAddtoCartItemSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllAddtoCartItemError(error.response));
    }
}

export function* onAddItemToCartStartAsync({ payload }) { 
    try {
        const response = yield call(addItemtoCartApi, payload);
        if(response.data.status === 200) {
            yield put(addItemToCartItemSuccess(response.data));
        }
    } catch (error) {
        yield put(addItemToCartItemError(error.response))
    }
}

export function* onDeleteItemToCartStartAsync({ payload }) {
    try {
        const response = yield call(deleteItemtoCartApi, payload);
        console.log("DELETE RESPOSE~~~????", response);
        if(response.data.status === 200) {
            yield put(deleteItemToCartItemSuccess(response.data));
        }
    } catch (error) {
        yield put(deleteItemToCartItemError(error.response));
    }
}

export function* onDeleteAllItemFromCartStartAsync() {
    try {
        const response = yield call(allItemDeleteFromCartApi);
        if(response.data.status === 200) {
            yield put(deleteAllItemfromCartSuccess(response.data))
        } 
    } catch (error) {
        yield call(deleteItemToCartItemError(error.response.data));
    }
}

export function* onGetCart() {
    yield takeLatest(types.GETALL_CART_ITEM_START, ongetAllCartItemStartAsync);
}

export function* onAddItem() {
    yield takeLatest(types.ADD_ITEM_TOCART_START, onAddItemToCartStartAsync);
}

export function* onDeleteItem() {
    yield takeLatest(types.DELETE_ITEM_TOCART_START, onDeleteItemToCartStartAsync);
}

export function* onAllDeleteItem() {
    yield takeLatest(types.DELETE_ALL_ITEM_FROM_CART_START, onDeleteAllItemFromCartStartAsync);
}


const addToCartSagas = [
    fork(onGetCart),
    fork(onAddItem),
    fork(onDeleteItem),
    fork(onAllDeleteItem),
]

export default function* addToCartSaga() {
    yield all([...addToCartSagas]);
}