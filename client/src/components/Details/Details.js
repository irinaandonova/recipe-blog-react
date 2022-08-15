import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../features/commentSlice";
import * as recipeService from "../../services/recipeService";
import Comment  from "../Comment/Comment";

const Details = () => {
    const [recipeInfo, setRecipeInfo] = useState({});

    const dispatch = useDispatch();
    const commentsArray = useSelector((state) => state.comments);

    const { _id } = useParams();

    useEffect(() => {
        recipeService.getOne({ _id })
            .then(res => {
                setRecipeInfo(res);
                dispatch(getComments({ comments: res.comments, recipeId: _id }))
            })
            .catch(err => console.log(err))
    }, [_id])
    return (
        <section className="recipe-details">
            <article className="recipe-info-article">
                <img>{recipeInfo.image}</img>
                <p>Category: {recipeInfo.category}</p>
                <p>Portion: {recipeInfo.portions}</p>
                <p>Instructions:{recipeInfo.instructions}</p>
                <p>Created by:{recipeInfo.username}</p>
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