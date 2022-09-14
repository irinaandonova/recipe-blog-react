import { createSlice } from "@reduxjs/toolkit";

const initialState = { comments: [] };

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        getComments: (state, action) => {
            state.comments = action.payload.comments;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload.comment);
        },
        deleteComment: (state, action) => {
            let index = state.comments.indexOf(action.payload._id);
            state.comments.splice(index, 1);
        },
        editComment: (state, action) => {
            let index = state.comments.findIndex(x => x._id.toString() === action.payload.comment._id);
            state.comments[index].comment = action.payload.comment.comment;
            state.comments[index].createdAt = action.payload.comment.createdAt;
        }
    }
})

export const { getComments, addComment, deleteComment, editComment } = commentsSlice.actions;
export default commentsSlice.reducer; 