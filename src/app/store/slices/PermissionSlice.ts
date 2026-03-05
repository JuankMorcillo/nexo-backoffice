import { getPermissions, createPermission, getPermissionById, editPermission } from "@/src/lib/api/permissions";
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
  processMessagePermission: '',
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

export const fetchPermissionById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
  'permissions/fetchPermissionById',
  async ({ token, id }, { rejectWithValue }) => {

    try {
      const response = await getPermissionById(token, id);

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


export const editPermissionSlice = createAsyncThunk<any, { permission: Permission, token: string }, { rejectValue: string }>(
  'permissions/ediPermission',
  async (permission, { rejectWithValue }) => {

    try {

      const result = await editPermission(permission.token || '', permission.permission);

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
      state.processMessagePermission = '';
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

    // Fetch Permission By Id
    builder
      .addCase(fetchPermissionById.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(fetchPermissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload.data || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchPermissionById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload || 'Error al cargar el Permiso';
      })

    // Create Permission
    builder
      .addCase(createPermissionSlice.pending, (state) => {
        state.loading = true;
        state.processMessagePermission = '';
      })
      .addCase(createPermissionSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.processMessagePermission = action.payload.message || 'Permiso creado exitosamente';
        state.success = true;
      })
      .addCase(createPermissionSlice.rejected, (state, action) => {
        state.loading = false;
        state.processMessagePermission = action.payload || 'Error al crear el Permiso';
        state.success = false;
      })

    // Edit Permission
    builder
      .addCase(editPermissionSlice.pending, (state) => {
        state.loading = true;
        state.processMessagePermission = '';
      })
      .addCase(editPermissionSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.processMessagePermission = action.payload.message || 'Permiso editado exitosamente';
        state.success = true;
      })
      .addCase(editPermissionSlice.rejected, (state, action) => {
        state.loading = false;
        state.processMessagePermission = action.payload || 'Error al editar el Permiso';
        state.success = false;
      })

  }
})

export const { setParams, clearMessage, clearProcessMessagePermission, setSuccessPermission } = permissionSlice.actions;

export const selectPermissionLoading = (state: any) => state.permissions.loading;
export const selectPermissionSuccess = (state: any) => state.permissions.success;
export const selectPermissionMessage = (state: any) => state.permissions.message;
export const selectPermissionProcessMessage = (state: any) => state.permissions.processMessagePermission;

export default permissionSlice.reducer;