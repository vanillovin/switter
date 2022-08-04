import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { displayedAt } from 'utils';
import SweetEdit from './SweetEdit';
import SweetComments from './SweetComments';
import SweetActionButtons from './SweetActionButtons';

const Sweet = ({ userObj, sweet, isOwner, darkMode, profilePhoto }) => {
  const history = useHistory();
  const comments = sweet.comments.sort((a, b) => b.createdAt - a.createdAt);
  const [editing, setEditing] = useState(false);
  const [addComment, setAddComment] = useState(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  const goToSweetDetailPage = (e) => {
    if (e.target !== e.currentTarget) return;
    // e.stopImmediatePropagation();
    history.push(`/sweet/${sweet.id}`);
  };

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'} onClick={goToSweetDetailPage}>
      {editing ? (
        <SweetEdit
          text={sweet.text}
          onSubmit={() => {}}
          closeEdit={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="hello">
            <div className="info">
              <img
                alt="profile"
                src={profilePhoto || `${process.env.PUBLIC_URL}/default-profile.png`}
              />
              <span className="dname">{sweet.dName || '♥'}</span>
              <span className="mini">{displayedAt(sweet.createdAt)}</span>
            </div>
            {isOwner && (
              <div className="sweet__actions">
                <span onClick={() => {}}>
                  <FaTrash />
                </span>
                <span onClick={toggleEditing}>
                  <FaPencilAlt />
                </span>
              </div>
            )}
          </div>
          <p className="sweet__text" onClick={goToSweetDetailPage}>
            {sweet.text}
          </p>
          {sweet.attachmentUrl && (
            <img alt="img" src={sweet.attachmentUrl} onClick={goToSweetDetailPage} />
          )}
          <>
            <SweetActionButtons
              type="sweet"
              id={sweet.id}
              likes={sweet.likes}
              liked={sweet.likes.includes(userObj?.uid)}
              comments={sweet.comments}
              handleLikeSweet={() => alert('like!')}
              handleAddComment={() => setAddComment((prev) => !prev)}
            />
            {addComment && (
              <SweetComments
                handleAddComment={() => {}}
                handleDeleteComment={() => {}}
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
