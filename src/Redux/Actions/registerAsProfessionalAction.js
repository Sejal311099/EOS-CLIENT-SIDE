import * as types from "../ActionTypes/registerAsProfessionalActionTypes";

export const registerAsProfessionalStart = (user) => ({
    type: types.REGISTER_AS_PROFESSIONAL_START,
    payload: user,
});

export const registerAsProfessionalSuccess = (registerAsProfessionalData) => ({
    type: types.REGISTER_AS_PROFESSIONAL_SUCCESS,
    payload: registerAsProfessionalData,
});

export const registerAsProfessionalError = (error) => ({
    type: types.REGISTER_AS_PROFESSIONAL_ERROR,
    payload: error,
});

 