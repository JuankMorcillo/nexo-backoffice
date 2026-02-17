import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice'
import reloadReducer from './slices/reloadSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        clients: clientsReducer,
        reload: reloadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch