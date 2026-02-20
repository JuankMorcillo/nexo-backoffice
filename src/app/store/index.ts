import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice'
import reloadReducer from './slices/reloadSlice';
import toastReducer from './slices/toastSlice';
import equipmentReducer from './slices/EquipmentSlice';
import branchesReducer from './slices/branchesSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        clients: clientsReducer,
        reload: reloadReducer,
        toast: toastReducer,
        equipments: equipmentReducer,
        branches: branchesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch