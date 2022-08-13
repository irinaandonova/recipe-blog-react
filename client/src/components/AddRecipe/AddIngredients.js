import { useContext } from "react";
import RecipeContext from "../../context/recipeContext";
import SingleIngredient from "./SingleIngredient";

const AddIngredient = () => {
    const { recipeInfo, addIngredient } = useContext(RecipeContext);
    const [ingredientsCount, setIngredientsCount] = useState(0);
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
        </section>
        
    )
}

export default AddIngredient;