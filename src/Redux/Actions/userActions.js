import * as types from "../ActionTypes/userActionTypes";

export const userSignUpStart = (user) => ({
    type: types.USER_SIGNUP_START,
    payload: user,
});

export const userSignUpSuccess = (user) => ({
    type: types.USER_SIGNUP_SUCCESS,
    payload: user,
});

export const userSignUpError = (error) => ({
    type: types.USER_LOGIN_ERROR,
    payload: error,
});

export const userLoginStart = (user) => ({
    type: types.USER_LOGIN_START,
    payload: user,
});

export const userLoginSuccess = (user) => ({
    type: types.USER_LOGIN_SUCCESS,
    payload: user,
});

export const userLoginError = (error) => ({
    type: types.USER_LOGIN_ERROR,
    payload: error,
});

export const userForgotPasswordStart = (user) => ({
    type: types.USER_FORGOT_PASSWORD_START,
    payload: user,
});

export const userForgotPasswordSuccess = (user) => ({
    type: types.USER_FORGOT_PASSWORD_SUCCESS,
    payload: user,
});

export const userForgotPasswordError = (error) => ({
    type: types.USER_FORGOT_PASSWORD_ERROR,
    payload: error,
});
export const userResetPasswordStart = (user) => ({
    type: types.USER_RESET_PASSWORD_START,
    payload: user,
});

export const userResetPasswordSuccess = (user) => ({
    type: types.USER_RESET_PASSWORD_SUCCESS,
    payload: user,
});

export const userResePasswordError = (error) => ({
    type: types.USER_RESET_PASSWORD_ERROR,
    payload: error,
});

export const userChangePasswordStart = (user) => ({
    type: types.USER_CHANGE_PASSWORD_START,
    payload: user,
});

export const userChangePasswordSuccess = (user) => ({
    type: types.USER_CHANGE_PASSWORD_SUCCESS,
    payload: user,
});

export const userChangePasswordError = (error) => ({
    type: types.USER_CHANGE_PASSWORD_ERROR,
    payload: error,
});

export const otpVerificationStart = (user) => ({
        type: types.OTP_VERIFICATION_START,
        payload: user,
});

export const otpVerificationSuccess = (user) => ({
        type: types.OTP_VERIFICATION_SUCCESS,
        payload: user,
});

export const otpVerificationError = (error) => ({
        type: types.OTP_VERIFICATION_ERROR,
        payload: error,
});

