import { getClients } from "@/src/lib/api/clients";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchClientsPayload } from "@/src/app/types/clients";

const initialState = {
    clients: [],
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
}

export const fetchClients = createAsyncThunk<any, FetchClientsPayload, { rejectValue: string }>(
    'clients/fetchClients',
    async ({ token, params }, { rejectWithValue }) => {
        try {
            const response = await getClients(token, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setParams(state, action) {
            state.params = { ...state.params, ...action.payload };
        },
        clearMessage(state) {
            state.message = '';
        },
    },
    extraReducers(builder) {
        // Fetch Clients
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Failed to fetch clients';
            });
    },
})

export const { setParams, clearMessage } = clientsSlice.actions;

// Selectors
export const selectClients = (state: any) => state.clients.clients;
export const selectTotalClients = (state: any) => state.clients.total;
export const selectClientsParams = (state: any) => state.clients.params;
export const selectClientsLoading = (state: any) => state.clients.loading;
export const selectClientsMessage = (state: any) => state.clients.message;

export default clientsSlice.reducer;