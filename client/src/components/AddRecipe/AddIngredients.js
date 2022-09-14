import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient } from "../../features/recipeSlice";
import SingleIngredient from "./SingleIngredient";
import * as recipeService from "../../services/recipeService";

const AddIngredient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const recipeInfo = useSelector((state) => state.recipe);
    const ingredientsArray = recipeInfo.ingredients;

    const addIngredientHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('ingredientName');
        const metric = formData.get('metric');
        const ingredient = {
            name,
            metric
        }
        dispatch(addIngredient(ingredient));
        e.target.reset();
    }

    const createRecipeHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const instructions = formData.get('instructions');

        if (instructions.length < 1) {
            throw new Error('You must add intructions for recipe!')
        }

        const response = await recipeService.createRecipe(recipeInfo, instructions);

        if (response.status === 'ok') {
            navigate('/recipe/my-recipes');
        }
        else {
            throw new Error('Couldnot create recipe!')
        }
    }

    return (
        <section className="add-ingredients-section">
            <form className="basic-form" onSubmit={addIngredientHandler}>
                <label htmlFor="ingredient-name">Ingredient name:</label>
                <input name="ingredientName" type="string" minLength={2} />
                <label htmlFor="metric">Metric:</label>
                <input name="metric" type="string" minLength={1} />
                <button type="submit">Add ingredient</button>
            </form>
            <ul>
                {ingredientsArray.length > 0 ?
                    ingredientsArray.map((x, index) => <SingleIngredient ingredient={x} editable={true} key={x.name + index + new Date()} />)
                    :
                    null
                }
            </ul>
            <form onSubmit={createRecipeHandler} className="add-instructions-form">
                <p>Add instrictions:</p>
                <textarea name="instructions" className="instructions"></textarea>
                <button type="submit" className="submit-recipe" >Create recipe</button>
            </form>
        </section>
    );
}

export default AddIngredient;