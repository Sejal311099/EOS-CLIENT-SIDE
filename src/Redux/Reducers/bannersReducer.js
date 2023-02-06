import * as types from "../ActionTypes/bannersActionTypes";

const initalState = {
    banners : [],
}

const bannersReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GETALL_BANNERS_START:
            return {
                ...state,
            }
        case types.GETALL_BANNERS_SUCCESS:
            return {
                ...state,
                banners: action.payload,
            }
        case types.GETALL_BANNERS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default bannersReducer;