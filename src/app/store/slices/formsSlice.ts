import { createForm, editForm, getFormById, getForms } from "@/src/lib/api/forms";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Form } from "../../types/forms";

const initialState = {
    forms: [],
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

export const fetchForms = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'forms/fetchForms',
    async ({ token, params }, { rejectWithValue }) => {

        try {
            const response = await getForms(token, params);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const fetchFormById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
    'forms/fetchFormById',
    async ({ token, id }, { rejectWithValue }) => {

        try {
            const response = await getFormById(token, id);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const createFormSlice = createAsyncThunk<any, { form: Form, token: string }, { rejectValue: string }>(
    'forms/createForm',
    async (form, { rejectWithValue }) => {

        try {
            const result = await createForm(form.token || '', form.form);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const editFormSlice = createAsyncThunk<any, { form: Form, token: string }, { rejectValue: string }>(
    'forms/editForm',
    async (form, { rejectWithValue }) => {

        try {

            const result = await editForm(form.token || '', form.form);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setFormsParams: (state, action) => {
            state.params = { ...state.params, ...action.payload }
        },
        clearFormsMessage: (state) => {
            state.message = '';
        },
        clearFormsProcessMessage: (state) => {
            state.processMessage = '';
        },
        setFormsSuccess: (state, action) => {
            state.success = action.payload;
        }
    },
    extraReducers: (builder) => {
        // fetch forms
        builder
            .addCase(fetchForms.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchForms.fulfilled, (state, action) => {
                state.loading = false;
                state.forms = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchForms.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar los formularios';
            })

        // fetch form by id
        builder
            .addCase(fetchFormById.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(fetchFormById.fulfilled, (state, action) => {
                state.loading = false;
                state.forms = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchFormById.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Error al cargar el formulario';
            })

        // create form
        builder
            .addCase(createFormSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(createFormSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = 'Formulario creado exitosamente';
                state.success = true;
            })
            .addCase(createFormSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al crear el formulario';
                state.success = false;
            })

        // edit form
        builder
            .addCase(editFormSlice.pending, (state) => {
                state.loading = true;
                state.processMessage = '';
            })
            .addCase(editFormSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload.message || 'Formulario editado exitosamente';
                state.success = true;
            })
            .addCase(editFormSlice.rejected, (state, action) => {
                state.loading = false;
                state.processMessage = action.payload || 'Error al editar el formulario';
                state.success = false;
            })

    }
})

export const { setFormsParams, clearFormsMessage, clearFormsProcessMessage, setFormsSuccess } = formsSlice.actions;

export const selectForms = (state: any) => state.forms.forms;
export const selectFormsLoading = (state: any) => state.forms.loading;
export const selectFormsSuccess = (state: any) => state.forms.success;
export const selectFormsMessage = (state: any) => state.forms.message;
export const selectFormsProcessMessage = (state: any) => state.forms.processMessage;

export default formsSlice.reducer;