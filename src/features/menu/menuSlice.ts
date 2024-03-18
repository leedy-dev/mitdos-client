import { MenuState } from "../../models/states/stateModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MenuSearchData } from "../../models/datas/dataModel";
import { getMenuList } from "../../services/menuApi";

const initialState: MenuState = {
    status: 'idle',
    menuList: [],
};

export const getMenuAsync = createAsyncThunk(
    'menu/getList',
    async (data: MenuSearchData, { rejectWithValue }) => {
        try {
            return getMenuList(data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const menuSlice = createSlice({
   name: 'menuList',
   initialState,
   reducers: {},
   extraReducers: builder => {
       builder
           .addCase(getMenuAsync.pending, state => {
               state.status = 'loading';
           })
           .addCase(getMenuAsync.fulfilled, (state, action) => {
               state.status = 'idle';
               if (action.payload && action.payload.status === 200) {
                   state.menuList = action.payload.data;
               }
           })
           .addCase(getMenuAsync.rejected, state => {
               state.status = 'failed'
           })
   }
});

export const selectMenu = (state: RootState) => state['menu'];

export default menuSlice.reducer;