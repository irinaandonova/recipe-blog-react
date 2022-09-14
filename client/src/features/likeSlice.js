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

            if (index > -1) {
                state.hasLiked = true;
            }
        },
        likeRecipe: (state, action) => {
            const index = state.likes.findIndex(x => x.toString() === action.payload.userId);

            if (index === -1) {
                state.likes.push(action.payload.userId);
                state.hasLiked = true;
            }
            else {
                state.likes.splice(index, 1);
                state.hasLiked = false;
            }
        }
    }
})

export const { getLikes, likeRecipe } = likesSlice.actions;
export default likesSlice.reducer; 