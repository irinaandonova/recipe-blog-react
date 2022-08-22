import { createSlice } from "@reduxjs/toolkit";

const initialState = { likes: [], hasLiked: false };
const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        getLikes: (state, action) => {
            state.hasLiked = false;
            state.likes = action.payload.likes;
            const index = state.likes.findIndex(x => x.toString() === action.payload.userId);
            if (index !== -1) {
                state.hasLiked = true;
            }
        },
        likeRecipe: (state, action) => {
            if (state.hasLiked) {
                const index = state.likes.findIndex(x => x.toString() === action.payload.userId);
                if (index !== -1) {
                    state.likes.splice(index, 1);
                }
                state.hasLiked = false;
            }
            else {
                state.likes.push(action.payload.like);
                state.hasLiked = true;
            }
        },


    }
})

export const { getLikes, likeRecipe } = likesSlice.actions;
export default likesSlice.reducer; 