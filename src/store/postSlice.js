import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        postItemInfo: [],
        postId: '',
    },
    reducers: {
        detailPostInfo: (state, action) => {
            state.postItemInfo = action.payload;
            //   console.log(action.payload);
        },

        PostIdFromTour: (state, action) => {
            state.postId = action.payload;
            // console.log(action.payload);
        },
    },
});

export const { detailPostInfo, PostIdFromTour } = postSlice.actions;
export const selectedPost = (state) => state.post;
export default postSlice.reducer;
