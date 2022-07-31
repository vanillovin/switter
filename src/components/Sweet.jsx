import React, { useRef, useState } from 'react';
import { FaComment, FaPencilAlt, FaTrash, FaHeart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { displayedAt } from 'utils';
import SweetEdit from './SweetEdit';
import useToggle from 'hooks/useToggle';
import SweetShareButton from './SweetShareButton';
import SweetComments from './SweetComments';
import { useDispatch } from 'react-redux';
import {
  createSweetComment,
  deleteSweet,
  deleteSweetComment,
  likeSweet,
  updateSweet,
} from 'services/actions/sweetsAction';

const Sweet = ({ userObj, sweetObj, isOwner, darkMode }) => {
  const dispatch = useDispatch();
  const toggleRef = useRef();
  const history = useHistory();
  const comments = sweetObj.comments.sort((a, b) => b.createdAt - a.createdAt);
  const [editing, setEditing] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [toggle, onToggleChange] = useToggle(toggleRef);

  const toggleEditing = () => setEditing((prev) => !prev);

  const goToSweetDetail = (e) => {
    if (e.target !== e.currentTarget) return;
    // e.stopImmediatePropagation();
    history.push(`/sweet/${sweetObj.id}`);
  };

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
    dispatch(deleteSweet(sweetObj.id, sweetObj.attachmentUrl));
  };

  const handleUpdateSweet = (text) => {
    dispatch(updateSweet(sweetObj.id, text));
    setEditing(false);
  };

  const handleSweetLike = () => {
    const liked = sweetObj.likes.includes(userObj.uid);
    dispatch(likeSweet(sweetObj, liked, userObj.uid));
  };

  const handleAddComment = (comment, clearComment) => {
    if (comment === '') return;
    dispatch(createSweetComment(sweetObj, userObj, comment));
    clearComment();
  };

  const handleDeleteComment = (cid) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    // console.log('comment', uid, 'delete comment createdAt', cid);
    dispatch(deleteSweetComment(sweetObj, cid));
  };

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'} onClick={goToSweetDetail}>
      {editing ? (
        <SweetEdit
          text={sweetObj.text}
          onSubmit={handleUpdateSweet}
          closeEdit={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="hello">
            <div className="info">
              <span className="dname">{sweetObj.dName || '♥'}</span>
              <span className="mini">{displayedAt(sweetObj.createdAt)}</span>
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
            {sweetObj.text}
          </p>
          {sweetObj.attachmentUrl && (
            <img alt="img" src={sweetObj.attachmentUrl} onClick={goToSweetDetail} />
          )}
          <>
            <div className="bottom">
              <button onClick={handleSweetLike}>
                <FaHeart color={sweetObj.likes.includes(userObj.uid) ? '#e05d5d' : ''} />
                <span>{` ${sweetObj.likes.length}`}</span>
              </button>
              <button onClick={() => setAddComment(!addComment)}>
                <FaComment />
                <span>{` ${sweetObj.comments.length}`}</span>
              </button>
              <SweetShareButton
                toggle={toggle}
                toggleRef={toggleRef}
                onToggleChange={onToggleChange}
                sweetId={sweetObj.id}
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
