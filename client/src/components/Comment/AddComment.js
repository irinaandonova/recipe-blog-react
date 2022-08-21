import { useContext } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../../context/authContext";
import * as commentService from "../../services/commentService";
import { addComment } from "../../features/commentSlice";

const AddComment = ({recipeId}) => {
    const { userInfo } = useContext(AuthContext);
    const dispatch = useDispatch();
    const addCommentHandler = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        const commentInfo = {
            recipeId,
            userId: userInfo._id,
            username: userInfo.username,
            comment
        }
        let response = await commentService.addComment({ commentInfo });
        if (response.status === 'ok') {
            e.target.reset();
            dispatch(addComment({comment: response.comment}));
        }
    }
    return (
        <form className="add-comment-form" onSubmit={addCommentHandler}>
            <textarea name="comment" maxLength={2000} className="comment-textarea"></textarea>
            <button type="submit">Add comment</button>
        </form>
    )
}

export default AddComment;