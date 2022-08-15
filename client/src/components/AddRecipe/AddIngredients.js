import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, addInstructions, createRecipe } from "../../features/recipeSlice";
import SingleIngredient from "./SingleIngredient";
import * as recipeService from "../../services/recipeService";

const AddIngredient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const recipeInfo = useSelector((state) => state.recipe);
    const ingredientsArray = recipeInfo.ingredients;

    const addIngredientHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const ingredientName = formData.get('ingredientName');
        const metric = formData.get('metric');
        const ingredient = {
            ingredientName,
            metric
        }
        dispatch(addIngredient(ingredient));
    }

    const createRecipeHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const instructions = formData.get('instructions');
        console.log(instructions);
        if(instructions.length < 1) {
            throw new Error('You must add intructions for recipe!')
        }
        dispatch(dispatch(addInstructions( instructions )));
        const response = await recipeService.createRecipe(recipeInfo);

        if (response.status === 'ok') {
            dispatch(createRecipe());
            navigate('/recipe/my-recipes');
        }
        else {
            throw new Error('Couldnot create recipe!')
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
                {ingredientsArray.length > 0 ?
                    ingredientsArray.map(x => <SingleIngredient ingredient={x} />)
                    :
                    null
                }
            </ul>
            <form onSubmit={createRecipeHandler}>
                <p>Add instrictions:</p>
                <textarea name="instructions"></textarea>
                <button type="submit">Create recipe</button>
            </form>
        </section>

    )
}

export default AddIngredient;