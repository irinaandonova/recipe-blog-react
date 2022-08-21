import { useNavigate } from 'react-router-dom';

const Recipe = ({ recipe }) => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate(`/recipe/${recipe._id}`);
    }
    return(
        <article className="recipe" onClick={navigateHandler}>
            <article className='img-article'>
            <img src={recipe.image} className="dashboard-recipe-image"/>
            </article>
            <p className="recipe-name">{recipe.name}</p>
        </article>
    )
}

export default Recipe;