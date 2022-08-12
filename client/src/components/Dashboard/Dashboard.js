import { useEffect, useState } from "react"
import { getAll } from "../../services/recipeService";
import Recipe from "../Recipe/Recipe";

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAll()
            .then(res => setRecipes(res.recipes))
            .catch(err => console.log(err))
    })
    return (
        <section className="recipes-section">
            {
                recipes.length > 0 ?
                    recipes.map(r => <Recipe recipe={r} key={r._id} />)
                    :
                    <p>No recipes yet!</p>
            }
        </section>
    )
}

export default Dashboard;