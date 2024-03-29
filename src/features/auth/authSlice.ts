import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { LoginData } from 'src/models/datas/dataModel';
import { AuthState } from 'src/models/states/stateModel';
import { reissue, signIn, signOut } from "src/services/authApi";
import apiClient from "../../services/lib/mitdAxios";

const initialState: AuthState = {
    isLogout: false,
    isAuthenticated: false,
    status: 'idle'
};

export const loginAsync = createAsyncThunk(
    'auth/sign-in',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            return await signIn(data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const logOutAsync = createAsyncThunk(
    'auth/sign-out',
    async (data, { rejectWithValue }) => {
        try {
            return await signOut()
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const reissueAsync = createAsyncThunk(
    'auth/reissue',
    async (data, { rejectWithValue }) => {
        try {
            return await reissue();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // sign in
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload && action.payload.status === 200 && action.payload.data.accessToken) {
                    apiClient.defaults.headers['Authorization'] = `Bearer ${action.payload.data.accessToken}`;
                    state.isLogout = false;
                    state.isAuthenticated = true;
                }
            })
            .addCase(loginAsync.rejected, (state) => {
                state.status = 'failed';
            })
            // sign out
            .addCase(logOutAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(logOutAsync.fulfilled, state => {
                state.status = 'idle';
                apiClient.defaults.headers['Authorization'] = null;
                state.isLogout = true;
                state.isAuthenticated = false;
            })
            .addCase(logOutAsync.rejected, state => {
                state.status = 'failed';
            })
            // reissue
            .addCase(reissueAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(reissueAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload && action.payload.status === 200 && action.payload.data) {
                    apiClient.defaults.headers['Authorization'] = `Bearer ${action.payload.data}`;
                    state.isLogout = false;
                    state.isAuthenticated = true;
                }
            })
            .addCase(reissueAsync.rejected, state => {
                state.status = 'failed';
            });
    },
});

export const authSliceActions = {...authSlice.actions};
export const selectAuth = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
