import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarExpanded: true,
    theme: 'light',
    mainContentMargin: 'lg:ml-[260px]',
    willDisplay: true,
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
        },
        setWillDisplay(state, action) {
            if (action.payload.includes('orders/my_orders')) {
                state.willDisplay = false
            } else {
                state.willDisplay = true
            }
        }
    }
})

export const { toggleSidebar, toggleMargin, setWillDisplay } = uiSlice.actions

export const selectSidebarExpanded = (state: { ui: { sidebarExpanded: boolean } }) => state.ui.sidebarExpanded;
export const selectMainContentMargin = (state: { ui: { mainContentMargin: string } }) => state.ui.mainContentMargin;
export const selectWillDisplay = (state: { ui: { willDisplay: boolean } }) => state.ui.willDisplay;

export default uiSlice.reducer