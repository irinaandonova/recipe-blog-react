import { configureStore } from '@reduxjs/toolkit';
import commentSlice from '../features/commentSlice';
import recipeSlice from '../features/recipeSlice';

export const store = configureStore({
    reducer: {
        recipe: recipeSlice,
        comment: commentSlice
    }
})

