import * as types from "../ActionTypes/bestOffersActionTypes";

export const getAllBestOffersStart = (bestOffers) => ({
    type: types.GETALL_BESTOFFERS_START,
    payload: bestOffers,
});

export const getAllBestOffersStSuccess = (bestOffers) => ({
    type: types.GETALL_BESTOFFERS_SUCCESS,
    payload: bestOffers,
});

export const getAllBestOffersStError = (error) => ({
    type: types.GETALL_BESTOFFERS_ERROR,
    payload: error,
});