import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    reload: false,
}

const reloadSlice = createSlice({
    name: 'reload',
    initialState,
    reducers: {
        triggerReload(state) {
            state.reload = !state.reload
        },
    }
})

export const { triggerReload } = reloadSlice.actions

export const selectReload = (state: { reload: { reload: boolean } }) => state.reload.reload

export default reloadSlice.reducer