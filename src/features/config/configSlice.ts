import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { ConfigState } from 'src/models/states/stateModel';

const initialState: ConfigState = {
    themeName: localStorage.getItem('appTheme') || 'NebulaFighterTheme',
    sidebarToggle: false,
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setThemeName: (state: ConfigState, action: PayloadAction<string>) => {
            state.themeName = action.payload;
            localStorage.setItem('appTheme', action.payload);
        },
        setSidebarToggle: (state: ConfigState, action: PayloadAction<void>) => {
            state.sidebarToggle = !state.sidebarToggle;
        },
    },
});

export const configSliceAction = {...configSlice.actions};
export const selectTheme = (state: RootState) => state["config"].themeName;
export const selectSidebarToggle = (state: RootState) => state["config"].sidebarToggle;

export default configSlice.reducer;
