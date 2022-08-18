import { createSlice } from "@reduxjs/toolkit";

const initialState =  {recipeId: '', comments: []};
const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        getComments: (state, action) => {
            if(state.recipeId !== action.payload.recipeId) {
                state.recipeId = action.payload.recipeId;                
            }
            console.log(action.payload.comments)
            state.comments = action.payload.comments;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload.comment);
        },
        deleteComment: (state, action) => {
            let index = state.comments.indexOf(action.payload._id);
            state.comments.splice(index, 1);
        }
    }  
})

export const { getComments, addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;