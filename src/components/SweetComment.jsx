import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { displayedAt } from 'utils';

function SweetComment({ comment, isOwner, handleDeleteComment }) {
  const onHandleDeleteComment = () => handleDeleteComment(comment.createdAt);

  return (
    <div className="comment" key={comment.createdAt}>
      <div className="hello">
        <div className="info">
          <span className="dname">{comment.name || '♥'}</span>
          <span className="mini">{displayedAt(comment.createdAt)}</span>
        </div>
        {isOwner && (
          <button className="delcommentBtn" onClick={onHandleDeleteComment}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      <div className="ctext">{comment.text}</div>
    </div>
  );
}

export default SweetComment;
