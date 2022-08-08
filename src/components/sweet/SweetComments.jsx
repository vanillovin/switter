import React from 'react';
import useInput from 'hooks/useInput';
import SweetComment from './SweetComment';

function SweetComments({ handleAddComment, handleDeleteComment, comments, userObj }) {
  const { value, onChangeValue, onClearValue } = useInput();

  const onHandleAddComment = (e) => {
    e.preventDefault();
    handleAddComment(value, onClearValue);
  };

  return (
    <div className="comments-container">
      <div style={{ marginTop: 10 }}>
        <form className="commentForm" onSubmit={onHandleAddComment}>
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
              onSubmit={onHandleAddComment}
            />
          </div>
        </form>
        <div className="comments">
          {comments?.map((comment) => (
            <SweetComment
              key={comment.createdAt}
              comments={comments}
              comment={comment}
              userObj={userObj}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SweetComments;
