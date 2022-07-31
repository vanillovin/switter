import React, { useState } from 'react';
import SweetComment from './SweetComment';

function SweetComments({ handleAddComment, handleDeleteComment, comments, userObj }) {
  const [comment, setComment] = useState('');

  const onChange = (e) => setComment(e.target.value);

  const clearComment = () => setComment('');

  const onHandleAddComment = (e) => {
    e.preventDefault();
    handleAddComment(comment, clearComment);
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
              value={comment}
              onChange={onChange}
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
              comment={comment}
              isOwner={comment.uid === userObj.uid}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SweetComments;
