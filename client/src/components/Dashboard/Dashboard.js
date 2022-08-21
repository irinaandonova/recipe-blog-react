import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import * as recipeService from "../../services/recipeService";
import Recipe from "../Recipe/Recipe";

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        recipeService.getRecipes(category)
            .then(res => setRecipes(res.recipes))
            .catch(err => console.log(err))
    }, [category])
    return (
        <section className="recipes-section">
            {
                recipes.length > 0 ?
                    recipes.map(r => <Recipe recipe={r} key={r._id} />)
                    :
                    <p className="no-recipes-message">No recipes yet!</p>
            }
        </section>
    )
}

export default Dashboard;