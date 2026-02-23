import {
  getUsers,
} from "@/src/lib/api/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
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

export const fetchUsers = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
  'users/fetchUsers',
  async ({ token, params }, { rejectWithValue }) => {
    try {
      const response = await getUsers(token, params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


const usersSlice = createSlice({
  name: 'users',
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
    },
    setSuccess(state, action) {
      state.success = action.payload;
    }
  },
  extraReducers(builder) {
    // Fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Error al consultar los usuarios';
      });
  },
})

export const { setParams, clearMessage, clearProcessMessage, setSuccess } = usersSlice.actions;

// Selectors
export const selectUsers = (state: any) => state.clients.users;
export const selectTotalUsers = (state: any) => state.users.total;
export const selectUsersParams = (state: any) => state.users.params;
export const selectUsersLoading = (state: any) => state.users.loading;
export const selectUsersSuccess = (state: any) => state.users.success;
export const selectUsersMessage = (state: any) => state.users.message;
export const selectUsersProcessMessage = (state: any) => state.users.processMessage;

export default usersSlice.reducer;