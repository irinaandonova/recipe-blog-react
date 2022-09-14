import { useDispatch } from "react-redux";
import { removeIngredient } from "../../features/recipeSlice";

const SingleIngredient = ({ ingredient, editable }) => {
    const dispatch = useDispatch();

    const removeIngredientHandler = () => {
        dispatch(removeIngredient({ ...ingredient }))
    }

    return (
        <article className="single-ingredient">
            <p>{ingredient.name}</p>
            <p>:</p>
            <p>{ingredient.metric}</p>
            {
                editable ?
                    <button onClick={removeIngredientHandler} className="basic-btn">Remove ingredient</button>
                    :
                    null
            }
        </article>
    );
}

export default SingleIngredient;