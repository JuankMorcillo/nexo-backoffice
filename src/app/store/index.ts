import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice'
import reloadReducer from './slices/reloadSlice';
import toastReducer from './slices/toastSlice';
import equipmentReducer from './slices/EquipmentSlice';
import branchesReducer from './slices/branchesSlice';
import orderReducer from './slices/ordersSlice';
import orderTypesReducer from './slices/orderTypesSlice';
import usersReducer from './slices/usersSlice';
import questionTypesReducer from './slices/questionTypesSlice';
import formsReducer from './slices/formsSlice';
import permissionReducer from './slices/PermissionSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        clients: clientsReducer,
        reload: reloadReducer,
        toast: toastReducer,
        equipments: equipmentReducer,
        branches: branchesReducer,
        orders: orderReducer,
        order_types: orderTypesReducer,
        users: usersReducer,
        question_types: questionTypesReducer,
        forms: formsReducer,
        permissions: permissionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch