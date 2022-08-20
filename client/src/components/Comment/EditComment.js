import { useDispatch } from "react-redux";
import { editComment } from "../../features/commentSlice";
import * as commentService from "../../services/commentService";

const EditComment = ({ commentInfo, commentStateHandler }) => {
    const dispatch = useDispatch();
    const editCommentHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const comment = formData.get('comment');
            
            let response = await commentService.editComment({ comment });
            if (response.status === 'ok') {
                commentStateHandler();
                dispatch(editComment({comment: response.comment}));
               
            }
        }
        catch(err) {
            console.log(err);
        }
        
    }
    return (
        <form className="add-comment-form" onSubmit={editCommentHandler}>
            <textarea name="comment" maxLength={2000} className="comment-textarea" defaultValue={commentInfo.comment}></textarea>
            <button type="submit">Edit comment</button>
        </form>
    )
}

export default EditComment;