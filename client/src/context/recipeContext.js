import { createContext, useState } from "react";
import * as recipeService from "../services/recipeService";

const initialState = { name: "", category: '', portions: 0, ingredients: [] };
const RecipeContext = createContext();

export const RecipeContextProvider = ({ children }) => {
    const [recipeInfo, setRecipeInfo] = useState(initialState);
    const addRecipeInfo = ({ name, category, portions, userId }) => {
        setRecipeInfo({ name, category, portions, userId });
    }
    const addIngredient = (ingredient) => {
        const allIngredients = recipeInfo.ingredients.push(ingredient);
        setRecipeInfo(allIngredients);
        return;
    }
    
    const createRecipe = async({recipeInfo}) => {
        console.log(recipeInfo);
        try {
            const response = await recipeService.createRecipe({recipeInfo});
            if(response === 'ok') {
                setRecipeInfo(initialState);
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    return (
        <RecipeContext.Provider value={{ recipeInfo, addRecipeInfo, addIngredient, createRecipe }}>
            {{ children }}
        </RecipeContext.Provider>
    )
}

export default RecipeContext;