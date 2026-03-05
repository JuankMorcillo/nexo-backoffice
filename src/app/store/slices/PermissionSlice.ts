import { getPermissions, createPermission } from "@/src/lib/api/permissions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Permission } from "../../types/permissions";

const initialState = {
  permissions: [],
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
  processMessageEqu: '',
  success: false,
}

export const fetchPermissions = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
  'permissions/fetchPermissions',
  async ({ token, params }, { rejectWithValue }) => {

    try {
      const response = await getPermissions(token, params);

      return response;
    } catch (error: any) {
      const errorMessage = error || 'Error desconocido';
      return rejectWithValue(errorMessage);
    }

  }
)

export const createPermissionSlice = createAsyncThunk<any, { permission: Permission, token: string }, { rejectValue: string }>(
  'permissions/createPermission',
  async (permission, { rejectWithValue }) => {

    try {
      const result = await createPermission(permission.token || '', permission.permission);

      return result;
    } catch (error: any) {
      const errorMessage = error || 'Error desconocido';
      return rejectWithValue(errorMessage);
    }

  }
)

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setParams(state, action) {
      state.params = { ...state.params, ...action.payload };
    },
    clearMessage(state) {
      state.message = '';
    },
    clearProcessMessagePermission(state) {
      state.processMessageEqu = '';
    },
    setSuccessPermission(state, action) {
      state.success = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Permission
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Error al cargar los Permisos';
      })

    // Create Permission
    builder
      .addCase(createPermissionSlice.pending, (state) => {
        state.loading = true;
        state.processMessageEqu = '';
      })
      .addCase(createPermissionSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.processMessageEqu = action.payload.message || 'Permiso creado exitosamente';
        state.success = true;
      })
      .addCase(createPermissionSlice.rejected, (state, action) => {
        state.loading = false;
        state.processMessageEqu = action.payload || 'Error al crear el Permis';
        state.success = false;
      })

  }
})

export const { setParams, clearMessage, clearProcessMessagePermission, setSuccessPermission } = permissionSlice.actions;

export const selectPermissionLoading = (state: any) => state.permissions.loading;
export const selectPermissionSuccess = (state: any) => state.permissions.success;
export const selectPermissionMessage = (state: any) => state.permissions.message;
export const selectPermissionProcessMessage = (state: any) => state.permissions.processMessageEqu;

export default permissionSlice.reducer;