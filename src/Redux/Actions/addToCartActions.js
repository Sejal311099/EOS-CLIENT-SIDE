import { type } from "@testing-library/user-event/dist/type";
import * as types from "../ActionTypes/addToCartActionTypes";

export const getAllAddtoCartItemStart = (userId) => ({
    type: types.GETALL_CART_ITEM_START,
    payload: userId,
});

export const getAllAddtoCartItemSuccess = (cartItem) => ({
    type: types.GETALL_CART_ITEM_SUCCESS,
    payload: cartItem,
});

export const getAllAddtoCartItemError = (error) => ({
    type: types.GETALL_CART_ITEM_ERROR,
    payload: error,
});

export const addItemToCartItemStart = (item_data) => ({
    type: types.ADD_ITEM_TOCART_START,
    payload: item_data,
});

export const addItemToCartItemSuccess = (item_data) => ({
    type: types.ADD_ITEM_TOCART_SUCCESS,
    payload: item_data,
});

export const addItemToCartItemError = (error) => ({
    type: types.ADD_ITEM_TOCART_ERROR,
    payload: error,
});

export const deleteItemToCartItemStart = (item_data) => ({
    type: types.DELETE_ITEM_TOCART_START,
    payload: item_data,
});

export const deleteItemToCartItemSuccess = (item_data) => ({
    type: types.DELETE_ITEM_TOCART_SUCCESS,
    payload: item_data,
});

export const deleteItemToCartItemError = (error) => ({
    type: types.DELETE_ITEM_TOCART_ERROR,
    payload: error,
});

export const deleteAllItemfromCartStart = (item_data) => ({
    type: types.DELETE_ALL_ITEM_FROM_CART_START,
    payload: item_data,
});

export const deleteAllItemfromCartSuccess = (item_data) => ({
    type: types.DELETE_ALL_ITEM_FROM_CART_SUCCESS,
    payload: item_data,
});

export const deleteAllItemfromCartError = (error) => ({
    type: types.DELETE_ALL_ITEM_FROM_CART_ERROR,
    payload: error,
});