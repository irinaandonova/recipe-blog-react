import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import * as commentService from "../../services/commentService";
import { deleteComment } from "../../features/commentSlice";

const Comment = ({ comment }) => {
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams();
    const dispatch = useDispatch();

    const deleteCommentHandler = async() => {
        try {
            const response = await commentService.deleteComment({ commentId: comment._id, recipeId: _id });
            if(response.status === 'ok') {
                dispatch(deleteComment({ _id: comment._id }));
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    return (
        <article>
            <p className="user-comment">{comment.username}</p>
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-created-at">{comment.createdAt}</p>
            {
                userInfo._id === comment.userId ?
                    <button onClick={deleteCommentHandler}>Delete button</button>
                    :
                    null
            }
        </article>
    )
}

export default Comment;