import { createBranch, getBranches } from "@/src/lib/api/branches";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Branch } from "../../types/branches";

const initialState = {
    branches: [],
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

export const fetchBranches = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'branches/fetchBranches',
    async ({ token, params }, { rejectWithValue }) => {
        try {
            const response = await getBranches(token, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const createBranchSlice = createAsyncThunk<any, { branch: Branch, token: string }, { rejectValue: string }>(
    'branches/createBranch',
    async (branchData, { rejectWithValue }) => {
        try {
            const { token, ...data } = branchData;

            const response = await createBranch(token || '', data.branch);

            return response;

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

const branchesSlice = createSlice({
    name: 'branches',
    initialState,
    reducers: {
        setParamsBranch(state, action) {
            state.params = { ...state.params, ...action.payload };
        },
        clearMessageBranch(state) {
            state.message = '';
        },
        clearProcessMessageBranch(state) {
            state.processMessage = '';
        },
        setSuccessBranch(state, action) {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch Branches
        builder
            .addCase(fetchBranches.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar las sucursales';
            })

        // Create Branch
        builder
            .addCase(createBranchSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
                state.success = false;
            })
            .addCase(createBranchSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = 'Sucursal creada exitosamente';
                state.success = true;
            })
            .addCase(createBranchSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al crear la sucursal';
                state.success = false;
            })
    }
})

export const { setParamsBranch, clearMessageBranch, clearProcessMessageBranch, setSuccessBranch } = branchesSlice.actions;

export const selectBranchesLoading = (state: any) => state.branches.loading;
export const selectBranchesMessage = (state: any) => state.branches.message;
export const selectBranchesProcessMessage = (state: any) => state.branches.processMessage;
export const selectBranchesSuccess = (state: any) => state.branches.success;

export default branchesSlice.reducer;
