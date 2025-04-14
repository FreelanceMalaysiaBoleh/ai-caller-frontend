import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage
import authReducer from "./authSlice";
import viewReducer from "./viewSlice";

const persistConfigAuth = {
    key: "auth", // Unique key for storage
    storage: storageSession, // Use sessionStorage instead of localStorage
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

const persistConfigView = {
    key: "view", // Unique key for storage
    storage: storageSession, // Use sessionStorage instead of localStorage
};

const persistedViewReducer = persistReducer(persistConfigView, viewReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        view: persistedViewReducer
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;