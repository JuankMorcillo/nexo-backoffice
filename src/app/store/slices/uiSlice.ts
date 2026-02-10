import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarExpanded: true,
    theme: 'light',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebarExpanded = !state.sidebarExpanded
        },
        setSidebarExpanded(state, action) {
            state.sidebarExpanded = action.payload
        }
    }
})

export const { toggleSidebar, setSidebarExpanded } = uiSlice.actions

export const selectSidebarExpanded = (state: { ui: { sidebarExpanded: boolean } }) => state.ui.sidebarExpanded;

export default uiSlice.reducer