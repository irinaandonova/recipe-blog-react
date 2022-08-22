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

    const likeRecipe = async () => {
        const response = await recipeService.likeRecipe({ _id, userId: userInfo._id });

        if (response.status === 'ok') {
            dispatch(likeRecipe({ userId: userInfo._id }));
        }
    }
    
    return (
        <article className="likes-article" >
            {
                likes.likes.length < 1 ?
                    <p>Nobody has liked this recipe yet!</p>
                    :
                    <p>{likes.length} people have liked this recipe</p>
            }
            {
                likes.hasLiked ?
                    <button className="basic-btn" onClick={likeRecipe}>Remove recipe from likes?</button>
                    :
                    <button className="basic-btn" onClick={likeRecipe}>Like this recipe</button>
            }
        </article>
    )
}

export default Likes;