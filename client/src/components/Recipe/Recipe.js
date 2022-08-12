const Recipe = ({ recipe }) => {
    return(
        <article className="recipe">
            <img src={recipe.img}/>
            <p className="recipe-name">{recipe.name}</p>
        </article>
    )
}

export default Recipe;