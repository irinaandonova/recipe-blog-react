const SingleIngredient = (ingredient) => {
    return(
        <artice className="single-ingredient">
            <p>{ingredient.ingredientName}</p>
            <p>{ingredient.metric}</p>
        </artice>
    )
}

export default SingleIngredient;