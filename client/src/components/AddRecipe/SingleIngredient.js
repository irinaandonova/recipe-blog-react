const SingleIngredient = ({ ingredient }) => {
    return(
        <article className="single-ingredient">
            <p>{ingredient.ingredientName}</p>
            <p>{ingredient.metric}</p>
        </article>
    )
}

export default SingleIngredient;