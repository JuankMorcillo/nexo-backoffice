import { createOrderType, getOrderTypes } from "@/src/lib/api/order_types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../types/orders";

const initialState = {
    orderTypes: [],
    total: 0,
    params: {
        page: 1,
        limit: 10,
        search: '',
        order: 'desc',
        orderBy: undefined,
    },
    loading: false,
    message: '',
    processMessage: '',
    success: false,
}

export const fetchOrderTypes = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'order-types/fetchOrderTypes',
    async ({ token, params }, { rejectWithValue }) => {

        try {
            const response = await getOrderTypes(token, params);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const createOrderTypeSlice = createAsyncThunk<any, { order_type: OrderType, token: string }, { rejectValue: string }>(
    'order-types/createOrderType',
    async (orderType, { rejectWithValue }) => {

        try {
            const result = await createOrderType(orderType.token || '', orderType.order_type);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

const orderTypesSlice = createSlice({
    name: 'order_types',
    initialState,
    reducers: {
        setOrderTypesParams(state, action) {
            state.params = { ...state.params, ...action.payload }
        },
        clearMessageOrderTypes(state) {
            state.message = ''
        },
        clearProcessMessageOrderTypes(state) {
            state.processMessage = ''
            state.message = ''
        },
        setSuccessOrderTypes(state, action) {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch order types
        builder
            .addCase(fetchOrderTypes.pending, (state) => {
                state.loading = true;
                state.message = '';
                state.success = false;
            })
            .addCase(fetchOrderTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.orderTypes = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchOrderTypes.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar los tipos de orden';
                state.success = false;
            })

        // create order type
        builder
            .addCase(createOrderTypeSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(createOrderTypeSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = 'Tipo de orden creado exitosamente';
                state.success = true;
            })
            .addCase(createOrderTypeSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al crear el tipo de orden';
                state.success = false;
            })

    }
})

export const { setOrderTypesParams, clearMessageOrderTypes, clearProcessMessageOrderTypes, setSuccessOrderTypes } = orderTypesSlice.actions

export const selectOrderTypesLoading = (state: any) => state.order_types.loading;
export const selectOrderTypesSuccess = (state: any) => state.order_types.success;
export const selectOrderTypesMessage = (state: any) => state.order_types.message;
export const selectOrderTypesProcessMessage = (state: any) => state.order_types.processMessage;


export default orderTypesSlice.reducer