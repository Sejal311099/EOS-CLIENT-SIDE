import * as types from "../ActionTypes/updateProfileActionTypes";

export const UpdateProfileStart = (UpdateProfileData) => {
    return {
        type: types.UPDATE_PROFILE_START,
        payload: UpdateProfileData,
    }
};

export const UpdateProfileSuccess = (UpdateProfileData) => {
    console.log(UpdateProfileData)
    return {
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: UpdateProfileData,
    }
};


export const UpdateProfileError = (error) => {
    // console.log(error)
    return {
        type: types.UPDATE_PROFILE_ERROR,
        payload: error,
    }
};

