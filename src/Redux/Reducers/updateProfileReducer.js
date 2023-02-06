import * as types from "../ActionTypes/updateProfileActionTypes";

const initalState = {
    updateProfileData: [],
}

const updateProfileReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.UPDATE_PROFILE_START:
            return {
                ...state,
            };

        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateProfileData: action.payload
            };

        case types.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default updateProfileReducer;