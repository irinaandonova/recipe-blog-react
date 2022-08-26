import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../features/commentSlice";
import * as recipeService from "../../services/recipeService";
import * as myRecipeService from "../../services/myRecipesService";
import Comment from "../Comment/Comment";
import SingleIngredient from "../AddRecipe/SingleIngredient";
import AuthContext from "../../context/authContext";
import AddComment from "../Comment/AddComment";
import Likes from "../Likes/Likes";
import { getLikes } from "../../features/likeSlice";
import StarRating from "../StarRating/StarRating";
import { getRating } from "../../features/ratingSlice";
const Details = () => {
    const [recipeInfo, setRecipeInfo] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const { userInfo } = useContext(AuthContext);

    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments);
    const navigate = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        recipeService.getOne(_id)
            .then(res => {
                setRecipeInfo(res.recipe);
                dispatch(getComments({ comments: res.recipe.comments }));
                dispatch(getLikes({ userId: userInfo._id, recipeId: _id, likes: res.recipe.likes }));
                dispatch(getRating({ ratingArr: res.recipe.rating }))
                res.recipe.userId.toString() === userInfo._id ? setIsCreator(true) : setIsCreator(false);
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

    return (
        <section className="recipe-details">
            <article className="recipe-info-article">
                <img alt="img" src={recipeInfo.image} className="details-img" />
                <article className="info-article">
                    <article className="category-portions">
                        <p>Category: {recipeInfo.category}</p>
                        <p>Portion: {recipeInfo.portions}</p>
                    </article>
                    {recipeInfo.ingredients ? recipeInfo.ingredients.map(x => <SingleIngredient ingredient={x} editable={false} key={x._id} />) : null}
                    <p>Instructions:</p>
                    <p>{recipeInfo.instructions}</p>
                    <article className="creator-info">
                        {
                            isCreator ?
                                <button className="basic-btn" onClick={deleteRecipeHandler}>Delete recipe</button>
                                :
                                null
                        }
                        <p className="creator">Created by: {recipeInfo.createdBy}</p>
                    </article>
                </article>
            </article>
            <Likes />
            <StarRating />
            <article className="add-comment">
                {
                    userInfo._id ?
                        <AddComment recipeId={recipeInfo._id} />
                        :
                        null
                }
            </article>
            <article className="comment-section-aerticle">
                {
                    comments && comments.length > 0 ?
                        comments.map(x => <Comment comment={x} key={x._id} />)
                        :
                        <p>Be the first one to comment on this recipe!</p>
                }
            </article>
        </section>
    )
}

export default Details;