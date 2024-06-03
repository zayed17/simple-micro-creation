
const CommentList = ({ comments }) => {
    console.log(comments)
    return (
        <ul>
            {comments.map(comment => {
                let contentShow;
                if (comment.status === "rejected") {
                    contentShow = "Comment is rejected";
                } else if (comment.status === "pending") {
                    contentShow = "Comment is pending";
                } else {
                    contentShow = <li key={comment.id}>{comment.content}</li>;
                }
                return contentShow;
            })}
        </ul>
    );
}

export default CommentList;
