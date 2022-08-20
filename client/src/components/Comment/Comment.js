import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import * as commentService from "../../services/commentService";
import { deleteComment, editComment } from "../../features/commentSlice";
const Comment = ({ comment }) => {
    const [onEdit, setOnEdit] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams();
    const dispatch = useDispatch();

    const deleteCommentHandler = async () => {
        try {
            const response = await commentService.deleteComment({ commentId: comment._id, recipeId: _id });
            if (response.status === 'ok') {
                dispatch(deleteComment({ _id: comment._id }));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
const editCommentBlock = () => setOnEdit(true);
    const editCommentHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const text = formData.get('comment');
            
            let response = await commentService.editComment({ recipeId: _id, text, commentId: comment._id });
            console.log(response);
            if (response.status === 'ok') {
                dispatch(editComment({ comment: response.comment }));
                setOnEdit(false);

               
            }
        }
        catch(err) {
            console.log(err);
        }
        
    }
    
    return (
        <article className="single-comment-article">
            <p className="user-comment">{comment.username}</p>
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-created-at">{comment.createdAt}</p>
            {
                userInfo._id === comment.userId ?
                    <article className="comment-creator">
                        <button onClick={editCommentBlock}>Edit comment</button>
                        <button onClick={deleteCommentHandler}>Delete comment</button>
                    </article>
                    :
                    null
            }
            {
                onEdit ?
                    <form className="add-comment-form" onSubmit={editCommentHandler}>
                        <textarea name="comment" maxLength={2000} className="comment-textarea" defaultValue={comment.comment}></textarea>
                        <button type="submit">Edit comment</button>
                    </form>
                    :
                    null
            }
        </article>
    )
}

export default Comment;