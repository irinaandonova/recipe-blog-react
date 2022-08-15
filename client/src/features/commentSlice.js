import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    recipeId: '',
    comments: []
}
const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        getComments: (state, action) => {
            state.recipeId = action.payload.recipeId;
            state.comments = action.payload.comments;
        }
    }
});

export const { getComments } = commentSlice.actions;
export default commentSlice.reducer;