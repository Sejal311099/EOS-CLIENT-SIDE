import * as types from "../ActionTypes/projectestimationActionTypes";

export const projectEstimationStart = (user) => {
    return {
        type: types.PROJECT_ESTIMATION_START,
        payload: user,
    }
};

export const projectEstimationSuccess = (projectEstimationData) => {
    console.log(projectEstimationData)
    return {
        type: types.PROJECT_ESTIMATION_SUCCESS,
        payload: projectEstimationData,
    }
};


export const projectEstimationError = (error) => {
    console.log(error)
    return {
        type: types.PROJECT_ESTIMATION_ERROR,
        payload: error,
    }
};

