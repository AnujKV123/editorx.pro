import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';


const persistConfig = {
    key: 'root',
    storage,
    transforms: [
      encryptTransform({
        secretKey: process.env.REACT_APP_REDUX_KEY,
        onError: function (error) {
          console.log("Transform-Error :",error)
        },
      }),
    ],
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // reducer: {}
})

export const persistor = persistStore(store)