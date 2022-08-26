import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import * as recipeService from "../../services/recipeService";
import { likeRecipe } from "../../features/likeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faThumbsUp, faSolid } from "@fortawesome/free-solid-svg-icons";

const Likes = () => {
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams();
    const likes = useSelector((state) => state.likes);
    const dispatch = useDispatch();
    const thumbsUp =  <FontAwesomeIcon icon={ faThumbsUp } />

    const likeRecipeHandler = async () => {
        try {
            const response = await recipeService.likeRecipe({ _id, userId: userInfo._id });
            dispatch(likeRecipe({ userId: userInfo._id }));
        }
        catch (err) {
            console.log(err);
        }
    }
    const likesMessage = () => {
        let message = ''
        if (likes.likes.length < 1) {
            message = <p>Nobody has liked this recipe yet!</p>
        }
        else {
            if (likes.hasLiked && likes.likes.length == 1) {
                message = <p>Only you have liked this recipe by far.</p>
            }
            else if (likes.hasLiked && likes.likes.length === 2) {
                message = <p>'You and one other person have liked this recipe</p>
            }
            else if (likes.hasLiked && likes.likes.length > 2) {
                message = <p>You and {likes.likes.length - 1} people have liked this recipe</p>
            }
            else if (!likes.hasLiked && likes.likes.length === 1) {
                message = <p>One person has liked this recipe</p>
            }
            else {
                message = <p>{likes.likes.length} people have liked this recipe</p>
            }
        }
        return message;
    };
    const likeButtons = () => {
        if (userInfo._id && likes.hasLiked) {
            return <button className="basic-btn" onClick={likeRecipeHandler}>{thumbsUp}</button>
        }
        else if (userInfo._id && !likes.hasLiked) {
            return <button className="basic-btn like" onClick={likeRecipeHandler}>{thumbsUp}</button>
        }
        else {
            return <p>Login to your profile to like this recipe</p>
        }
    }
    return (
        <article className="likes-article" >
            {likesMessage()}
            {likeButtons()}
        </article>
    )
}

export default Likes;