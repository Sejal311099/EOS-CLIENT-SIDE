import * as types from "../ActionTypes/registerAsProfessionalActionTypes";

const initalState = {
    registerAsProfessionalData: [],
}

const registerAsProfessionalReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.REGISTER_AS_PROFESSIONAL_START:
            return {
                ...state,
            };

        case types.REGISTER_AS_PROFESSIONAL_SUCCESS:
            return {
                ...state,
                registerAsProfessionalData: action.payload
            };

        case types.REGISTER_AS_PROFESSIONAL_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default registerAsProfessionalReducer;