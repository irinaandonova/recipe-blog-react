import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    portions: 0,
    userId: '',
    category: '',    
    ingredients: []
}

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        addRecipeInfo: (state, action) => {
            state.name = action.payload.name;
            state.portions = action.payload.portions;
            state.userId = action.payload.userId;
            state.category = action.payload.category;            
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        createRecipe: (state) => {
            state = initialState;
        }
    }
})

export const { addRecipeInfo, addIngredient, createRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;