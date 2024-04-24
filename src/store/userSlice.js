import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
            } else {
                console.log('Không có thông tin user khi login');
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
