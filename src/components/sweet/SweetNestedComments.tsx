import { FaTimes } from 'react-icons/fa';

import { displayedAt } from '../../utils/utils';
import useInput from '../../hooks/useInput';

function SweetNestedComments({
  nestedComments,
  isOwner,
  handleAddNestedComment,
  handleDeleteNestedComment,
}) {
  const { value, onChangeValue, onClearValue } = useInput();
  const onSubmit = (e) => {
    e.preventDefault();
    handleAddNestedComment(value, onClearValue);
  };
  return (
    <div className="nestedCommentsContainer">
      <form className="commentForm" onSubmit={onSubmit}>
        <div className="commentInput__container">
          <input
            className="commentInput__input"
            type="text"
            name="comment"
            value={value}
            onChange={onChangeValue}
            placeholder="댓글 달기"
            required
          />
          <input
            className="commentInput__arrow"
            type="submit"
            value="&rarr;"
            onSubmit={onSubmit}
          />
        </div>
      </form>
      <div className="comments">
        {nestedComments?.map((comment) => (
          <div key={comment.createdAt}>
            <div className="hello">
              <div className="info">
                <span className="dname">{comment.name || '♥'}</span>
                <span className="mini">{displayedAt(comment.createdAt)}</span>
              </div>
              {isOwner && (
                <button
                  className="delcommentBtn"
                  onClick={() => handleDeleteNestedComment(comment.createdAt)}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="ctext">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SweetNestedComments;
