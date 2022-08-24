import {  useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from "../../services/recipeService";
import Recipe from "../Recipe/Recipe";

const LikedRecipes = () => {
    const [recipes, setRecipes] = useState({});
    const { _id } = useParams();
    useEffect(() => {
        recipeService.getLikedRecipes(_id)
        .then(res => setRecipes(res.likedRecipes))
        .catch(err => console.log(err))
    })
    return(
        <section className="recipes-section">
            {
                recipes.length > 0 ?
                    recipes.map(x => <Recipe recipe={x} key={x._id} />)
                    :
                    <p className="no-recipes-message">No liked recipes yet!</p>
            }
        </section>
    )
}

export default LikedRecipes;