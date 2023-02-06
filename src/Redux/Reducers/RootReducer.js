import { combineReducers } from "redux";
import bestOffersReducer from "./bestOffersReducer";
import userReducer from "./userReducer";
import projectEstimationeducer from "./projectEstimationeducer";
import registerAsProfessionalReducer from "./registerAsProfessionalReducer"
import servicesReducer from "./servicesReducer";
import updateProfileReducer from "./updateProfileReducer";
import bannersReducer from "./bannersReducer";
import addToCartReducer from "./addToCartReducer";

const rootReducer = combineReducers({
    userData: userReducer,
    projectEstimationData: projectEstimationeducer,
    registerAsProfessionalData: registerAsProfessionalReducer,
    bestOffers: bestOffersReducer,
    services : servicesReducer,
    updateProfileReducer:updateProfileReducer,
    banners :bannersReducer,
    cartItems: addToCartReducer,
});

export default rootReducer;