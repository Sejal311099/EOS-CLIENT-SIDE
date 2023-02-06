import * as types from "../ActionTypes/bannersActionTypes";

export const getAllBannersStart = (banners) => ({
    type: types.GETALL_BANNERS_START,
    payload: banners,
});

export const getAllBannersSuccess = (banners) => ({
    type: types.GETALL_BANNERS_SUCCESS,
    payload: banners,
});

export const getAllBannersError = (error) => ({
    type: types.GETALL_BANNERS_ERROR,
    payload: error,
});