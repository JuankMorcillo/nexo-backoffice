import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarExpanded: true,
    theme: 'light',
    mainContentMargin: 'lg:ml-[260px]',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebarExpanded = !state.sidebarExpanded
        },
        toggleMargin(state) {
            state.mainContentMargin = state.sidebarExpanded ? 'lg:ml-[260px]' : 'lg:ml-[100px]'
        }
    }
})

export const { toggleSidebar, toggleMargin } = uiSlice.actions

export const selectSidebarExpanded = (state: { ui: { sidebarExpanded: boolean } }) => state.ui.sidebarExpanded;
export const selectMainContentMargin = (state: { ui: { mainContentMargin: string } }) => state.ui.mainContentMargin;

export default uiSlice.reducer