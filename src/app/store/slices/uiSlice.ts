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
    }
})

export const { toggleSidebar } = uiSlice.actions

export const selectSidebarExpanded = (state: { ui: { sidebarExpanded: boolean } }) => state.ui.sidebarExpanded;

export default uiSlice.reducer