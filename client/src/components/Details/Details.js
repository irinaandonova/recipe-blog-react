import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../features/commentSlice";
import * as recipeService from "../../services/recipeService";
import * as commentService from "../../services/commentService";
import Comment from "../Comment/Comment";
import AuthContext from "../../context/authContext";

const Details = () => {
    const [recipeInfo, setRecipeInfo] = useState({});
    const { userInfo } = useContext(AuthContext);
    const dispatch = useDispatch();
    const commentsArray = useSelector((state) => state.comments);
    const { _id } = useParams();

    useEffect(() => {
        recipeService.getOne(_id)
            .then(res => {
                setRecipeInfo(res.recipe);
                dispatch(getComments({ comments: res.comments, recipeId: _id }))
            })
            .catch(err => console.log(err))
    }, [_id, dispatch]);
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
        await commentService.addComment({commentInfo});

    }
    return (
        <section className="recipe-details">
            <article className="recipe-info-article">
                <img alt="img" src={recipeInfo.image}></img>
                <p>Category: {recipeInfo.category}</p>
                <p>Portion: {recipeInfo.portions}</p>
                <p>Instructions:{recipeInfo.instructions}</p>
                <p>Created by:{recipeInfo.username}</p>
            </article>
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