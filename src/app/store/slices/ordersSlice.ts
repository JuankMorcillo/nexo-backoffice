import { getOrders, getOrderById, createOrder, editOrder } from "@/src/lib/api/orders"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Equipment } from "../../types/equipment";
import { Order } from "../../types/orders";

const initialState = {
    orders: [],
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

export const fetchOrders = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'orders/fetchOrders',
    async ({ token, params }, { rejectWithValue }) => {

        try {
            const response = await getOrders(token, params);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const fetchOrderById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
    'orders/fetchOrderById',
    async ({ token, id }, { rejectWithValue }) => {

        try {
            const response = await getOrderById(token, id);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const createOrderSlice = createAsyncThunk<any, { order: Order, token: string }, { rejectValue: string }>(
    'orders/createOrder',
    async (order, { rejectWithValue }) => {

        try {
            const result = await createOrder(order.token || '', order.order);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const editOrderSlice = createAsyncThunk<any, { order: Order, token: string }, { rejectValue: string }>(
    'orders/editOrder',
    async (order, { rejectWithValue }) => {

        try {

            const result = await editOrder(order.token || '', order.order);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setParams(state, action) {
            state.params = { ...state.params, ...action.payload };
        },
        clearMessage(state) {
            state.message = '';
        },
        clearProcessMessageOrder(state) {
            state.processMessage = '';
        },
        setSuccessOrder(state, action) {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch Orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar las ordenes';
            })

        // Fetch Order By Id
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar la orden';
            })

        // Create Order
        builder
            .addCase(createOrderSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(createOrderSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload.message || 'Orden creada exitosamente';
                state.success = true;
            })
            .addCase(createOrderSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al crear la orden';
                state.success = false;
            })

        // Edit Order
        builder
            .addCase(editOrderSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(editOrderSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload.message || 'Orden editada exitosamente';
                state.success = true;
            })
            .addCase(editOrderSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al editar la orden';
                state.success = false;
            })
    }
})

export const { setParams, clearMessage, clearProcessMessageOrder, setSuccessOrder } = orderSlice.actions;

export const selectOrderLoading = (state: any) => state.orders.loading;
export const selectOrderSuccess = (state: any) => state.orders.success;
export const selectOrderMessage = (state: any) => state.orders.message;
export const selectOrderProcessMessage = (state: any) => state.orders.processMessage;

export default orderSlice.reducer;