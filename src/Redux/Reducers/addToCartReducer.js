import * as types from "../ActionTypes/addToCartActionTypes";

const initalState = {
    cartItems : [],
}

const addToCartReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.GETALL_CART_ITEM_START:
        case types.ADD_ITEM_TOCART_START:
        case types.DELETE_ITEM_TOCART_START:
        case types.DELETE_ALL_ITEM_FROM_CART_START:
            return {
                ...state,
            }
        case types.GETALL_CART_ITEM_SUCCESS:
        case types.ADD_ITEM_TOCART_SUCCESS:
        case types.DELETE_ITEM_TOCART_SUCCESS:
        case types.DELETE_ALL_ITEM_FROM_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            }
        case types.GETALL_CART_ITEM_ERROR:
        case types.ADD_ITEM_TOCART_ERROR:
        case types.DELETE_ITEM_TOCART_ERROR:
        case types.DELETE_ALL_ITEM_FROM_CART_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default addToCartReducer;