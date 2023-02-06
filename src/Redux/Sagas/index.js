import { all } from 'redux-saga/effects';
import bestOfferSaga from './bestOffersSaga';
import userSaga from './userSaga';
import projectEstimationSaga from './projectEstimationSaga'
import registerAsProfessionalSaga from './registerAsProfessionalSaga'
import servicesSaga from './serviceSaga';
import updateProfileSaga from './updateProfileSaga';
import bannerSaga from './bannersSaga';
import addToCartSaga from './addToCartSaga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        projectEstimationSaga(),
        registerAsProfessionalSaga(),
        bestOfferSaga(),
        servicesSaga(),
        updateProfileSaga(),
        bannerSaga(),
        addToCartSaga(),
    ])
}