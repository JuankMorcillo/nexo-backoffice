import { createEquipment, editEquipment, getEquipmentById, getEquipments } from "@/src/lib/api/equipments";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Equipment } from "../../types/equipment";

const initialState = {
    equipments: [],
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

export const fetchEquipments = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'equipments/fetchEquipments',
    async ({ token, params }, { rejectWithValue }) => {

        try {
            const response = await getEquipments(token, params);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const fetchEquipmentById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
    'equipments/fetchEquipmentById',
    async ({ token, id }, { rejectWithValue }) => {

        try {
            const response = await getEquipmentById(token, id);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const createEquipmentSlice = createAsyncThunk<any, { equipment: Equipment, token: string }, { rejectValue: string }>(
    'equipments/createEquipment',
    async (equipment, { rejectWithValue }) => {

        try {
            const result = await createEquipment(equipment.token || '', equipment.equipment);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const editEquipmentSlice = createAsyncThunk<any, { equipment: Equipment, token: string }, { rejectValue: string }>(
    'equipments/editEquipment',
    async (equipment, { rejectWithValue }) => {

        try {

            const result = await editEquipment(equipment.token || '', equipment.equipment);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

const equipmentSlice = createSlice({
    name: 'equipments',
    initialState,
    reducers: {
        setParams(state, action) {
            state.params = { ...state.params, ...action.payload };
        },
        clearMessage(state) {
            state.message = '';
        },
        clearProcessMessageEqu(state) {
            state.processMessageEqu = '';
        },
        setSuccessEqu(state, action) {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch Equipments
        builder
            .addCase(fetchEquipments.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchEquipments.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchEquipments.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar los equipos';
            })

        // Fetch Equipment By Id
        builder
            .addCase(fetchEquipmentById.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchEquipmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchEquipmentById.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar el equipo';
            })

        // Create Equipment
        builder
            .addCase(createEquipmentSlice.pending, (state) => {
                state.loading = true;
                state.processMessageEqu = '';
            })
            .addCase(createEquipmentSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessageEqu = action.payload.message || 'Equipo creado exitosamente';
                state.success = true;
            })
            .addCase(createEquipmentSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessageEqu = action.payload || 'Error al crear el equipo';
                state.success = false;
            })

        // Edit Equipment
        builder
            .addCase(editEquipmentSlice.pending, (state) => {
                state.loading = true;
                state.processMessageEqu = '';
            })
            .addCase(editEquipmentSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessageEqu = action.payload.message || 'Equipo editado exitosamente';
                state.success = true;
            })
            .addCase(editEquipmentSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessageEqu = action.payload || 'Error al editar el equipo';
                state.success = false;
            })
    }
})

export const { setParams, clearMessage, clearProcessMessageEqu, setSuccessEqu } = equipmentSlice.actions;

export const selectEquipmentLoading = (state: any) => state.equipments.loading;
export const selectEquipmentSuccess = (state: any) => state.equipments.success;
export const selectEquipmentMessage = (state: any) => state.equipments.message;
export const selectEquipmentProcessMessage = (state: any) => state.equipments.processMessageEqu;

export default equipmentSlice.reducer;