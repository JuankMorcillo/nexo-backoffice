import { createQuestionType, editQuestionType, getQuestionTypeById, getQuestionTypes } from "@/src/lib/api/question_types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestionType } from "../../types/forms";

const initialState = {
    questionTypes: [],
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

export const fetchQuestionTypes = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'question-types/fetchQuestionTypes',
    async ({ token, params }, { rejectWithValue }) => {

        try {
            const response = await getQuestionTypes(token, params);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const fetchQuestionTypeById = createAsyncThunk<any, { token: string; id: number }, { rejectValue: string }>(
    'question-types/fetchQuestionTypeById',
    async ({ token, id }, { rejectWithValue }) => {

        try {
            const response = await getQuestionTypeById(token, id);

            return response;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const createQuestionTypeSlice = createAsyncThunk<any, { question_type: QuestionType, token: string }, { rejectValue: string }>(
    'question-types/createQuestionType',
    async (questionType, { rejectWithValue }) => {

        try {
            const result = await createQuestionType(questionType.token || '', questionType.question_type);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

export const editQuestionTypeSlice = createAsyncThunk<any, { question_type: QuestionType, token: string }, { rejectValue: string }>(
    'question-types/editQuestionType',
    async (questionType, { rejectWithValue }) => {

        try {

            const result = await editQuestionType(questionType.token || '', questionType.question_type);

            return result;
        } catch (error: any) {
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }

    }
)

const questionTypesSlice = createSlice(
    {
        name: 'question_types',
        initialState,
        reducers: {
            setQuestionTypesParams: (state, action) => {
                state.params = { ...state.params, ...action.payload }
            },
            clearMessageQuestionTypes: (state) => {
                state.message = '';
            },
            clearProcessMessageQuestionTypes: (state) => {
                state.processMessage = '';
            },
            setSuccessQuestionTypes: (state, action) => {
                state.success = action.payload;
            }
        },
        extraReducers: (builder) => {
            // fetch question types
            builder
                .addCase(fetchQuestionTypes.pending, (state) => {
                    state.loading = true;
                    state.message = '';
                    state.success = false;
                })
                .addCase(fetchQuestionTypes.fulfilled, (state, action) => {
                    state.loading = false;
                    state.questionTypes = action.payload.data;
                    state.total = action.payload.total;
                })
                .addCase(fetchQuestionTypes.rejected, (state, action) => {
                    state.loading = false;
                    state.message = action.payload || 'Error al cargar los tipos de preguntas';
                    state.success = false;
                })

            // fetch question type by id
            builder
                .addCase(fetchQuestionTypeById.pending, (state) => {
                    state.loading = true;
                    state.message = '';
                })
                .addCase(fetchQuestionTypeById.fulfilled, (state, action) => {
                    state.loading = false;
                    state.questionTypes = action.payload.data || [];
                    state.total = action.payload.total || 0;
                })
                .addCase(fetchQuestionTypeById.rejected, (state, action) => {
                    state.loading = false;
                    state.message = action.payload || 'Error al cargar el tipo de pregunta';
                })

            // create question type
            builder
                .addCase(createQuestionTypeSlice.pending, (state) => {
                    state.loading = true;
                    state.processMessage = '';
                })
                .addCase(createQuestionTypeSlice.fulfilled, (state, action) => {
                    state.loading = false;
                    state.processMessage = action.payload.message || 'Tipo de pregunta creado exitosamente';
                    state.success = true;
                })
                .addCase(createQuestionTypeSlice.rejected, (state, action) => {
                    state.loading = false;
                    state.processMessage = action.payload || 'Error al crear el tipo de pregunta';
                    state.success = false;
                })

            // edit question type
            builder
                .addCase(editQuestionTypeSlice.pending, (state) => {
                    state.loading = true;
                    state.processMessage = '';
                })
                .addCase(editQuestionTypeSlice.fulfilled, (state, action) => {
                    state.loading = false;
                    state.processMessage = action.payload.message || 'Tipo de pregunta editado exitosamente';
                    state.success = true;
                })
                .addCase(editQuestionTypeSlice.rejected, (state, action) => {
                    state.loading = false;
                    state.processMessage = action.payload || 'Error al editar el tipo de pregunta';
                    state.success = false;
                })
        }
    }
)

export const { setQuestionTypesParams, clearMessageQuestionTypes, clearProcessMessageQuestionTypes, setSuccessQuestionTypes } = questionTypesSlice.actions;

export const selectQuestionTypesLoading = (state: any) => state.question_types.loading;
export const selectQuestionTypesSuccess = (state: any) => state.question_types.success;
export const selectQuestionTypesMessage = (state: any) => state.question_types.message;
export const selectQuestionTypesProcessMessage = (state: any) => state.question_types.processMessage;

export default questionTypesSlice.reducer;