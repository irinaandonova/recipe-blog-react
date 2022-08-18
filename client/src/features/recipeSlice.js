import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    portions: 0,
    userId: '',
    createdBy: '',
    category: '',    
    ingredients: [],
    instructions: '',
    image: ''
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
            state.image = action.payload.image;      
            state.createdBy = action.payload.createdBy;    
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        createRecipe: () => initialState,
        addInstructions: (state, action) => {
            state.instructions = action.payload;
            console.log(state.instructions);
        }
    }
})

export const { addRecipeInfo, addIngredient, createRecipe, addInstructions } = recipeSlice.actions;
export default recipeSlice.reducer;