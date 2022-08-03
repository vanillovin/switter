import React, { useRef, useState } from 'react';
import { FaComment, FaPencilAlt, FaTrash, FaHeart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { displayedAt } from 'utils';
import SweetEdit from './SweetEdit';
import useToggle from 'hooks/useToggle';
import SweetShareButton from './SweetShareButton';
import SweetComments from './SweetComments';

const Sweet = ({ userObj, sweet, isOwner, darkMode }) => {
  const toggleRef = useRef();
  const history = useHistory();
  const comments = sweet.comments.sort((a, b) => b.createdAt - a.createdAt);
  const [editing, setEditing] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [toggle, onToggleChange] = useToggle(toggleRef);

  const toggleEditing = () => setEditing((prev) => !prev);

  const goToSweetDetail = (e) => {
    if (e.target !== e.currentTarget) return;
    // e.stopImmediatePropagation();
    history.push(`/sweet/${sweet.id}`);
  };

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
  };

  const handleUpdateSweet = (text) => {};

  const handleSweetLike = () => {
    // const liked = sweet.likes.includes(userObj.uid);
  };

  const handleAddComment = (comment, clearComment) => {
    if (comment === '') return;
    clearComment();
  };

  const handleDeleteComment = (cid) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
  };

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'} onClick={goToSweetDetail}>
      {editing ? (
        <SweetEdit
          text={sweet.text}
          onSubmit={handleUpdateSweet}
          closeEdit={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="hello">
            <div className="info">
              <img
                alt="profile"
                src={
                  // data?.[sweet?.creatorId] ||
                  `${process.env.PUBLIC_URL}/default-profile.png`
                }
              />
              <span className="dname">{sweet.dName || '♥'}</span>
              <span className="mini">{displayedAt(sweet.createdAt)}</span>
            </div>
            {isOwner && (
              <div className="sweet__actions">
                <span onClick={handleDeleteSweet}>
                  <FaTrash />
                </span>
                <span onClick={toggleEditing}>
                  <FaPencilAlt />
                </span>
              </div>
            )}
          </div>
          <p className="sweet__text" onClick={goToSweetDetail}>
            {sweet.text}
          </p>
          {sweet.attachmentUrl && (
            <img alt="img" src={sweet.attachmentUrl} onClick={goToSweetDetail} />
          )}
          <>
            <div className="bottom">
              <button onClick={handleSweetLike}>
                <FaHeart color={sweet.likes.includes(userObj.uid) ? '#e05d5d' : ''} />
                <span>{` ${sweet.likes.length}`}</span>
              </button>
              <button onClick={() => setAddComment(!addComment)}>
                <FaComment />
                <span>{` ${sweet.comments.length}`}</span>
              </button>
              <SweetShareButton
                toggle={toggle}
                toggleRef={toggleRef}
                onToggleChange={onToggleChange}
                sweetId={sweet.id}
              />
            </div>
            {addComment && (
              <SweetComments
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
                comments={comments}
                userObj={userObj}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};

export default Sweet;
