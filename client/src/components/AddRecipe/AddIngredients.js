import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeContext from "../../context/recipeContext";
import SingleIngredient from "./SingleIngredient";

const AddIngredient = () => {
    const { recipeInfo, addIngredient, createRecipe } = useContext(RecipeContext);
    const [ingredientsCount, setIngredientsCount] = useState(0);
    const navigate = useNavigate();
    const addIngredientHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const ingredientName = formData.get('ingredientName');
        const metric = formData.get('metric');
        const ingredient = {
            ingredientName,
            metric
        }
        addIngredient(ingredient);
        const newCount = ingredientsCount + 1;
        setIngredientsCount(newCount)
        formData.reset();
    }

    const createRecipeHandler = async() => {
        const response = await createRecipe({ recipeInfo });
        if(response === 'ok') {
            navigate('/')
        }
    }
    return (
        <section className="add-ingredients-section">
            <form className="add-ingredient-form" onSubmit={addIngredientHandler}>
                <label htmlFor="ingredient-name">Ingredient name:</label>
                <input name="ingredientName" type="string" />
                <label htmlFor="metric">Metric:</label>
                <input name="metric" type="string" />
                <button type="submit">Add ingredient</button>
            </form>
            <ul>
                {ingredientsCount > 0 ?
                    recipeInfo.ingredients.map((x, index) => <SingleIngredient ingredient={x} key={index} />)
                    :
                    null
                }
            </ul>
            <button onClick={createRecipeHandler}>Create recipe</button>
        </section>

    )
}

export default AddIngredient;