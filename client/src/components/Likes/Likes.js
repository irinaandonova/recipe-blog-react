import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import * as recipeService from "../../services/recipeService";
import { likeRecipe } from "../../features/likeSlice";
const Likes = () => {
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams(); 
    const likes = useSelector((state) => state.likes);
    const dispatch = useDispatch();

    const likeRecipeHandler = async () => {
        try {
            const response = await recipeService.likeRecipe({ _id, userId: userInfo._id });
            dispatch(likeRecipe({ userId: userInfo._id }))

        }
        catch(err) {
            console.log(err);
        }        
    }
    const likesMessage = () => {
        let message = ''
        if(likes.likes.length < 1) {
            message = <p>Nobody has liked this recipe yet!</p>
        }
        else {
            if(likes.hasLiked && likes.likes.length == 1) {
                message = <p>Only you have liked this recipe by far.</p>
            }
            else if(likes.hasLiked && likes.likes.length === 2) {
                message = <p>'You and one other person have liked this recipe</p>
            }
            else if(likes.hasLiked && likes.likes.length > 2) {
                message = <p>You and {likes.likes.length - 1} people have liked this recipe</p>
            }
            else if(!likes.hasLiked && likes.likes.length === 1) {
                message = <p>One person has liked this recipe</p>
            }
            else {
                message = <p>{likes.likes.length} people have liked this recipe</p>
            }
        }
        return message;
    }
    return (
        <article className="likes-article" >
            {likesMessage()}
            {
                likes.hasLiked ?
                    <button className="basic-btn" onClick={likeRecipeHandler}>Remove recipe from likes?</button>
                    :
                    <button className="basic-btn" onClick={likeRecipeHandler}>Like this recipe</button>
            }
        </article>
    )
}

export default Likes;