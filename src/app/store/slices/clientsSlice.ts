import {
    getClients,
    createClient,
    getClientById,
    editClient
} from "@/src/lib/api/clients";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Client, FetchClientsPayload } from "@/src/app/types/clients";

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
    processMessage: '',
    success: false,
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

export const fetchClientById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
    'clients/fetchClientById',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await getClientById(token, id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const createClientSlice = createAsyncThunk<any, Client, { rejectValue: string }>(
    'clients/createClient',
    async (clientData, { rejectWithValue }) => {
        try {
            const { token, ...data } = clientData;

            const response = await createClient(token || '', data);

            return response;

        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const editClientSlice = createAsyncThunk<any, Client, { rejectValue: string }>(
    'clients/editClient',
    async (clientData, { rejectWithValue }) => {
        try {
            const { token, ...data } = clientData;

            const response = await editClient(token || '', data);

            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error || 'Error desconocido';
            return rejectWithValue(errorMessage);
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
        clearProcessMessage(state) {
            state.processMessage = '';
        }
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

        // Fetch Client By ID
        builder
            .addCase(fetchClientById.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchClientById.fulfilled, (state, action) => {
                state.loading = false;
                state.message = 'Client fechted successfully'
            })
            .addCase(fetchClientById.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Failed to create client';
            })

        // Create Client
        builder
            .addCase(createClientSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(createClientSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload.message || 'Client created successfully'
                state.success = true;
            })
            .addCase(createClientSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Failed to create client';
                state.success = false;
            })

        // Edit Client
        builder
            .addCase(editClientSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(editClientSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload.message || 'Client updated successfully'
                state.success = true;
            })
            .addCase(editClientSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Failed to edit client';
                state.success = false;
            })
    },
})

export const { setParams, clearMessage, clearProcessMessage } = clientsSlice.actions;

// Selectors
export const selectClients = (state: any) => state.clients.clients;
export const selectTotalClients = (state: any) => state.clients.total;
export const selectClientsParams = (state: any) => state.clients.params;
export const selectClientsLoading = (state: any) => state.clients.loading;
export const selectClientsSuccess = (state: any) => state.clients.success;
export const selectClientsMessage = (state: any) => state.clients.message;
export const selectClientsProcessMessage = (state: any) => state.clients.processMessage;

export default clientsSlice.reducer;