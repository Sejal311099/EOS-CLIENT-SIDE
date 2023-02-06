import * as types from "../ActionTypes/bestOffersActionTypes";

const initalState = {
    bestOffers: [],
}

const bestOffersReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GETALL_BESTOFFERS_START:
            return {
                ...state,
            }
        case types.GETALL_BESTOFFERS_SUCCESS:
            return {
                ...state,
                bestOffers: action.payload,
            }
        case types.GETALL_BESTOFFERS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default bestOffersReducer;