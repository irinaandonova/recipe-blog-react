import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/authContext";
import { addRecipeInfo, clearState } from "../../features/recipeSlice";


const AddRecipeInfo = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(clearState());

    const addRecipeInfoHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const portions = formData.get('portions');
        const category = formData.get('category');
        const image = formData.get('image');

        dispatch(addRecipeInfo({ name, portions, userId: userInfo._id, category, username: userInfo.username, image, createdBy: userInfo.username }));
        navigate('/recipe/add/ingredients');
    }

    return (
        <section className="add-recipe-section">
            <form className="basic-form" onSubmit={addRecipeInfoHandler}>
                <label htmlFor="name">Recipe name:</label>
                <input name="name" type="string" minLength={2} />
                <label htmlFor="portions">Portions:</label>
                <input name="portions" type="number" min={1} />
                <label htmlFor="image">Image:</label>
                <input name="image" type="string" />
                <select name="category">
                    <option value="meat">Recipe with meat</option>
                    <option value="vegetarian">Vegeterian recipe</option>
                    <option value="fish">Fish and seafood recipe</option>
                    <option value="dessert">Dessert</option>
                </select>
                <button type="submit" className="add-ngredient-btn">Add ingredients</button>
            </form>
        </section>
    );
}

export default AddRecipeInfo;
