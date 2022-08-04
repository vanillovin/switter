import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { displayedAt } from 'utils';
import SweetEdit from './SweetEdit';
import SweetComments from './SweetComments';
import SweetActionButtons from './SweetActionButtons';
import { deleteStorageFile, deleteSweet, likeSweet, updateSweet } from 'services/sweets';

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

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
    if (sweet.attachmentUrl !== '') {
      deleteStorageFile(sweet.attachmentUrl).catch((err) => {
        console.log('deleteStorageFile err', err);
      });
    }
    deleteSweet(sweet.id).catch((err) => {
      console.log('deleteSweet err', err);
    });
  };

  const handleLikeSweet = () => {
    const liked = new Set(sweet.likes).has(userObj.uid);
    likeSweet(liked, sweet.id, userObj.uid).catch((err) => {
      console.log('likeSweet err', err);
    });
  };

  const handleUpdateSweet = (text) => {
    // const sweetData = getState().sweetsReducer.sweets.data.find((sweet) => sweet.id === id);
    // if (!sweetData.id) return;
    updateSweet(sweet.id, text)
      .then((res) => {
        setEditing(false);
      })
      .catch((err) => {
        console.log('updateSweet err', err);
      });
  };

  return (
    <div className={darkMode ? 'sweet dark' : 'sweet'} onClick={goToSweetDetailPage}>
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
                src={profilePhoto || `${process.env.PUBLIC_URL}/default-profile.png`}
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
              handleLikeSweet={handleLikeSweet}
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
