import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    commentsArray: []
}
const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        getComments: (state, action) => {
            state.commentsArray = action.payload.comments;
        }
    }
});

export const { getComments } = commentSlice.actions;
export default commentSlice.reducer;