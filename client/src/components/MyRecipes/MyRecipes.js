import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import * as myRecipesService from "../../services/myRecipesService";
import Recipe from "../Recipe/Recipe";

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const { userInfo } = useContext(AuthContext);
    useEffect(() => {
        myRecipesService.getAll({ userId: userInfo._id })
            .then(res => setMyRecipes(res))
            .catch(err => console.log(err))
    }, [userInfo])
    return (
        <section className="recipes-section">
            <ul>
                {
                    myRecipes.length > 0 ?
                        myRecipes.map(x => <Recipe recipe={x} key={x._id} />)
                        :
                        <p className="no-recipes-message">No recipes yet</p>}
            </ul>
        </section>
    )
}

export default MyRecipes;