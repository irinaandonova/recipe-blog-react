import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
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
        removeIngredient: (state, action) => {
            const index = state.ingredients.findIndex(x => x.name === action.payload.name && x.metric === action.payload.metric);
            
            if(index !== -1) {
                state.ingredients.splice(index, 1);
            }
        },
        clearState: () => initialState,
        addInstructions: (state, action) => {
            state.instructions = action.payload;
        }
    }
})

export const { addRecipeInfo, addIngredient, removeIngredient, clearState, addInstructions } = recipeSlice.actions;
export default recipeSlice.reducer;