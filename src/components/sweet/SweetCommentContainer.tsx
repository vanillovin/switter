import useInput from '../../hooks/useInput';
import SweetComment from './SweetComment';
import { Comment } from '../../types/Sweet';
import useSweetService from '../../hooks/useSweetService';

function SweetCommentContainer({
  sweetId,
  comments,
}: {
  sweetId: string;
  comments: Comment[];
}) {
  const { value, onChangeValue, onClearValue } = useInput();
  const { onAddComment, onDeleteComment } = useSweetService();

  return (
    <div className="comments-container">
      <div style={{ marginTop: 10 }}>
        <form
          className="commentForm"
          onSubmit={(e) => {
            e.preventDefault();
            onAddComment(sweetId, value);
            onClearValue();
          }}
        >
          <div className="commentInput__container">
            <input
              className="commentInput__input"
              type="text"
              name="comment"
              value={value}
              onChange={onChangeValue}
              placeholder="댓글 달기"
              // autoComplete={false}
              required
            />
            <input type="submit" className="commentInput__arrow" value="&rarr;" />
          </div>
        </form>
        <div className="comments">
          {comments?.map((comment, i) => (
            <SweetComment
              key={i}
              comment={comment}
              deleteComment={() => onDeleteComment(comment.id, sweetId, comments)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SweetCommentContainer;
