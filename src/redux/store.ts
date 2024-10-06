import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { registrationApi } from "../apis/registerapi";
import { cvApi } from "../apis/cvapi";
import cvReducer from './cvSlice'

const store = configureStore({
    reducer:{
        [registrationApi.reducerPath]: registrationApi.reducer,
        [cvApi.reducerPath] : cvApi.reducer,
        cv: cvReducer, // Add the cv slice to the stor
    },
middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat([registrationApi.middleware,cvApi.middleware]),
})

setupListeners(store.dispatch)
export default store