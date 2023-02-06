import * as types from "../ActionTypes/userActionTypes";

const initalState = {
    user: [],
    newUser: [],
    forgotPassword: [],
    resetPassword: [],
    changePassword: [],
    otpVerification: [],
}

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_START:
        case types.USER_SIGNUP_START:
        case types.USER_FORGOT_PASSWORD_START:
        case types.USER_RESET_PASSWORD_START:
        case types.USER_CHANGE_PASSWORD_START:
        case types.OTP_VERIFICATION_START:
            return {
                ...state,
            };

        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
            case types.USER_FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    forgotPassword: action.payload
                };
            case types.USER_RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    resetPassword: action.payload
                };
            case types.USER_CHANGE_PASSWORD_SUCCESS:
                return {
                    ...state,
                    changePassword: action.payload
                };   
            case types.OTP_VERIFICATION_SUCCESS:
                return {
                    ...state,
                    otpVerification: action.payload
                }; 
        case types.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                newUser: action.payload
            };
        case types.USER_LOGIN_ERROR:
        case types.USER_FORGOT_PASSWORD_ERROR:
        case types.USER_RESET_PASSWORD_ERROR:
        case types.USER_FORGOT_PASSWORD_ERROR:
        case types.OTP_VERIFICATION_ERROR:
        case types.USER_SIGNUP_ERROR:
            return {
                ...state,
                error: action.payload
            }         
            
        default:
            return state;
    }
}

export default userReducer;