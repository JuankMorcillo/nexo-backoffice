import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        clients: clientsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch