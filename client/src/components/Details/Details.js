import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../features/commentSlice";
import * as recipeService from "../../services/recipeService";
import * as commentService from "../../services/commentService";
import * as myRecipeService from "../../services/myRecipesService";
import Comment from "../Comment/Comment";
import SingleIngredient from "../AddRecipe/SingleIngredient";
import AuthContext from "../../context/authContext";

const Details = () => {
    const [recipeInfo, setRecipeInfo] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const dispatch = useDispatch();
    const commentsArray = useSelector((state) => state.comments);
    const navigate = useNavigate();
    const { _id } = useParams();
    useEffect(() => {
        recipeService.getOne(_id)
            .then(res => {
                setRecipeInfo(res.recipe);
                dispatch(getComments({ comments: res.comments, recipeId: _id }));
                res.recipe.userId.toString() === userInfo._id ? setIsCreator(true) : setIsCreator(false)
            })
            .catch(err => console.log(err))
    }, [_id, dispatch, userInfo]);
    const deleteRecipeHandler = async () => {
        const response = await myRecipeService.deleteRecipe({ _id: recipeInfo._id, userId: userInfo._id });

        if (response.status === 'ok') {
            navigate('/recipe/my-recipes');
        }
        else {
            throw new Error('Couldnot delete recipe');
        }

    }
    const addCommentHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        const commentInfo = {
            recipeId: recipeInfo._id,
            userId: userInfo._id,
            username: userInfo.username,
            comment
        }
        await commentService.addComment({ commentInfo });
    };

    return (
        <section className="recipe-details">
            <article className="recipe-info-article">
                <img alt="img" src={recipeInfo.image} className="details-img"></img>
                <article className="info-article">
                    <article className="category-portions">
                        <p>Category: {recipeInfo.category}</p>
                        <p>Portion: {recipeInfo.portions}</p>
                    </article>
                    { recipeInfo.ingredients ? recipeInfo.ingredients.map(x => <SingleIngredient ingredient={x} key={x.ingredientName + x.metric} />) : null}
                    <p>Instructions:</p>
                    <p>{recipeInfo.instructions}</p>
                    <p className="creator">Created by:{recipeInfo.username}</p>
                </article>
            </article>
            {
                isCreator ?
                    <button className="delete-btn" onClick={deleteRecipeHandler}>Delete recipe</button>
                    :
                    null
            }
            <article className="add-comment">
                {
                    userInfo._id ?
                        <form className="add-comment-form" onSubmit={addCommentHandler}>
                            <textarea name="comment"></textarea>
                            <button type="submit">Add comment</button>
                        </form>
                        :
                        null
                }
            </article>
            <article className="comment-section-aerticle">
                {
                    commentsArray.length > 0 ?
                        commentsArray.map(x => <Comment comment={x} key={x._id} />)
                        :
                        <p>Be the first one to comment on this recipe!</p>
                }
            </article>
        </section>
    )
}

export default Details;