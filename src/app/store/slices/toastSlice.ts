import { createSlice } from "@reduxjs/toolkit"
import { ToastProps } from "../../types/toast"

const initialState: ToastProps = {
    id: null,
    message: '',
    position: "top-right",
    icon: null,
    duration: 3000,
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        fillToastInfo(state, action) {
            state.id = action.payload.id
            state.message = action.payload.message
            state.position = action.payload.position
            state.icon = action.payload.icon || null
            state.duration = action.payload.duration || 3000
        },
        clearToastInfo(state) {
            state.id = null
            state.message = ''
            state.position = "top-right"
            state.icon = null
            state.duration = 3000
        }
    }
})

export const { fillToastInfo, clearToastInfo } = toastSlice.actions

export const selectToastInfo = (state: { toast: { id: string | null, message: string, position: string, icon: any, duration: number } }) => state.toast

export default toastSlice.reducer