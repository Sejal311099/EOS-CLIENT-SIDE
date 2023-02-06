import * as types from '../ActionTypes/userActionTypes';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import Swal from "sweetalert2";

import { userLoginError, userLoginSuccess, userSignUpError, userSignUpSuccess,userForgotPasswordSuccess, userForgotPasswordError,userResetPasswordSuccess,userResePasswordError ,userChangePasswordSuccess,userChangePasswordError , otpVerificationSuccess , otpVerificationError} from '../Actions/userActions';
import { userLoginApi, userSignUpApi , userForgotPasswordApi,userResetPasswordApi,userChangePasswordApi , otpVerificationApi} from '../APIs/userApi';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
});

export function* onUserSignupStartAsync({ payload }) {
    try {
        const response = yield call(userSignUpApi, payload);   
        if (response.data.status === 200) {
            sessionStorage.setItem("otpId", JSON.stringify(response.data.userData));
            yield put(userSignUpSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userSignUpError(error.response));
        if(error.response.data.errors.name) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.name,
            });
        } else if (error.response.data.errors.email) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.email,
            });
        } else if(error.response.data.errors.age) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.age,
            });
        } else if(error.response.data.errors.phonenumber) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.phonenumber,
            });
        } else if(error.response.data.errors.address) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.address,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.password,
            });
        }
        
    }
}

export function* onUserLoginStartAsync({ payload }) {
    try {
        const response = yield call(userLoginApi, payload);
        if (response.data.status === 200) {
            sessionStorage.setItem("USEREOS", JSON.stringify(response.data.data.token));
            sessionStorage.setItem("userId", JSON.stringify(response.data.userId));
            sessionStorage.setItem("userData", JSON.stringify(response.data.userData));


            yield put(userLoginSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userLoginError(error.response)); 
        if(error.response.data.errors) {
            if(error.response.data.errors.email) {
                Toast.fire({
                    icon: "error",
                    title: error.response.data.errors.email,
                })
            } else {
                Toast.fire({
                    icon: "error",
                    title: error.response.data.errors.password,
                })
            }
        } else {
            if(error.response.data.message) {
                Toast.fire({
                    icon: "error",
                    title: error.response.data.message,
                })
            }
        }       
    }
}
export function* onUserForgotPasswordstartAsync({ payload }) {
    try {
        const response = yield call(userForgotPasswordApi, payload);
        if (response.data.status === 200) {
            yield put(userForgotPasswordSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userForgotPasswordError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.email,
        });
    }
}
export function* onUserResetPasswordstartAsync({ payload }) {
    try {
        const response = yield call(userResetPasswordApi, payload);
        if (response.data.status === 200) {
            yield put(userResetPasswordSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userResePasswordError(error.response));
        if (error.response.data.errors.confirmPassword) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.confirmPassword,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.newPassword,
            });
        }
      
    }
}

export function* onUserChangePasswordstartAsync({ payload }) {
    try {
        const response = yield call(userChangePasswordApi, payload);
        if (response.data.status === 200) {
            yield put(userChangePasswordSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userChangePasswordError(error.response));
        if (error.response.data.status === 400) {
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            }); 
        }
        else if (error.response.data.errors.newPassword) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.newPassword,
            });
        }else if(error.response.data.errors.confirmPassword) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.confirmPassword,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
        } 
      
    }
}

export function* onUserOtpVerificationstartAsync({ payload }) {
    try {
        const  payloadData = { "otp" : Number(payload.otp)  }
        const response = yield call(otpVerificationApi, payloadData);
        if (response.data.status === 200) {
            yield put(otpVerificationSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }else{
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(otpVerificationError(error.response));
        if (error.response.data.message) {
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.newPassword,
            });
        }
    }
}


export function* onUserSignUp() {
    yield takeLatest(types.USER_SIGNUP_START, onUserSignupStartAsync);
}
export function* onUserLogin() {
    yield takeLatest(types.USER_LOGIN_START, onUserLoginStartAsync);
}
export function* onForgotPassword() {
    yield takeLatest(types.USER_FORGOT_PASSWORD_START, onUserForgotPasswordstartAsync);
}
export function* onResetPassword() {
    yield takeLatest(types.USER_RESET_PASSWORD_START, onUserResetPasswordstartAsync);
}
export function* onChangePassword() {
    yield takeLatest(types.USER_CHANGE_PASSWORD_START, onUserChangePasswordstartAsync);
}
export function* onOtpVerificationPassword() {
    yield takeLatest(types.OTP_VERIFICATION_START, onUserOtpVerificationstartAsync);
}

const userSagas = [
    fork(onUserLogin),
    fork(onUserSignUp),
    fork(onForgotPassword),
    fork(onResetPassword),
    fork(onChangePassword),
    fork(onOtpVerificationPassword),
]

export default function* userSaga() {
    yield all([...userSagas]);
}
