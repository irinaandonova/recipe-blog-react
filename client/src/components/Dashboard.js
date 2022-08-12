import { useEffect, useState } from "react"
import { getAll } from "../services/recipeService";

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAll()
        .then(res => setRecipes(res.recipes))
        .catch(err => console.log(err))
    })
    return(
        <section className="recipes-section">
            
        </section>
    )
}