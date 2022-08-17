const SingleIngredient = ({ ingredient }) => {
    return(
        <article className="single-ingredient">
            <p>{ingredient.name}</p>
            <p>:</p>
            <p>{ingredient.metric}</p>
        </article>
    )
}

export default SingleIngredient;