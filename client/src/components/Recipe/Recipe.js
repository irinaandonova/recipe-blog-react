import { useNavigate } from 'react-router-dom';

const Recipe = ({ recipe }) => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate(`/recipe/${recipe._id}`);
    }
    return(
        <article className="recipe" onClick={navigateHandler}>
            <img src={recipe.image} className="dashboard-recipe-image"/>
            <p className="recipe-name">{recipe.name}</p>
        </article>
    )
}

export default Recipe;