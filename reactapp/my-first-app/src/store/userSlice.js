import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../network/apiService';

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ username, password }) => {
        if (process.env.REACT_APP_BYPASS === 'true') {
            return { 'result': { 'token': "mockToken", 'user': { 'username': "Rafiur" } } };
        }
        const response = await post('/login/', { username, password }, false); // Assume this function returns user data
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('User logged in:', action.payload.result.token);
                // localStorage.setItem('token', action.payload.result.token);
                state.user = action.payload.result.user;
                state.token = action.payload.result.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
