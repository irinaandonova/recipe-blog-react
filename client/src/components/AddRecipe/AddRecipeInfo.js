import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/authContext";
import { addRecipeInfo } from "../../features/recipeSlice";


const AddRecipeInfo = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addRecipeInfoHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const portions = formData.get('portions');
        const category = formData.get('category');
        dispatch(addRecipeInfo({ name, portions, userId: userInfo._id, category }));
        navigate('/recipe/add/ingredients');
    }
    return (
        <section className="add-recipe-section">
            <form className="add-recipe-form" onSubmit={addRecipeInfoHandler}>
                <label htmlFor="name">Recipe name:</label>
                <input name="name" type="string" />
                <label htmlFor="portions">Portions:</label>
                <input name="portions" type="number" min={1}/>
                <select name="category">
                    <option value="meat">Recipe with meat</option>
                    <option value="vegetarian">Vegeterian recipe</option>
                    <option value="fish">Fish and seafood recipe</option>
                    <option value="dessert">Dessert</option>
                </select>     
                <button type="submit">Add ingredients</button>        
            </form>
        </section>
    )
}

export default AddRecipeInfo;
