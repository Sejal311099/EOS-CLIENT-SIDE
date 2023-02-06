import * as types from "../ActionTypes/projectestimationActionTypes";

const initalState = {
    projectEstimationData: [],
}

const projectEstimationeducer = (state = initalState, action) => {
    switch (action.type) {
        case types.PROJECT_ESTIMATION_START:
            return {
                ...state,
            };

        case types.PROJECT_ESTIMATION_SUCCESS:
            return {
                ...state,
                projectEstimationData: action.payload
            };

        case types.PROJECT_ESTIMATION_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default projectEstimationeducer;