import { configureStore } from '@reduxjs/toolkit';
import commentSlice from '../features/commentSlice';
import likeSlice from '../features/likeSlice';
import ratingSlice from '../features/ratingSlice';
import recipeSlice from '../features/recipeSlice';

export const store = configureStore({
    reducer: {
        recipe: recipeSlice,
        comments: commentSlice,
        likes: likeSlice,
        rating: ratingSlice
    }
})

