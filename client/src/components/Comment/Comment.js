const Comment = ({ comment }) => {
    return(
        <article>
            <p className="user-comment">{comment.username}</p>
            <p className="comment-text">{comment.text}</p>
            <p className="comment-created-at">{comment.createdAt}</p>
        </article>
    )
}

export default Comment;