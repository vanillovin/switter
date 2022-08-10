import React, { useContext, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { displayedAt } from 'utils';
import SweetEdit from './SweetEdit';
import SweetComments from './SweetComments';
import SweetActionButtons from './SweetActionButtons';
import {
  addSweetComment,
  deleteStorageFile,
  deleteSweet,
  deleteSweetComment,
  likeSweet,
  updateSweet,
} from 'services/sweets';
import { updateUsersProfileData } from 'services/users';
import { UsersProfileContext } from 'contexts/UsersProfileContext';

const Sweet = ({ userObj, sweet, isOwner, darkMode }) => {
  const history = useHistory();
  const comments = sweet.comments.sort((a, b) => b.createdAt - a.createdAt);
  const [editing, setEditing] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const {
    usersProfileData: { data },
    usersProfilePhoto,
  } = useContext(UsersProfileContext);
  const profileData = data?.[sweet?.creatorId];
  const profilePhoto = usersProfilePhoto?.[sweet?.creatorId];

  const toggleEditing = () => setEditing((prev) => !prev);

  const goToSweetDetailPage = (e) => {
    if (e.target !== e.currentTarget) return;
    // e.stopImmediatePropagation();
    history.push(`/sweet/${sweet?.id}`);
  };

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
    if (sweet.attachmentUrl !== '') {
      deleteStorageFile(sweet.attachmentUrl).catch((err) => {
        console.log('deleteStorageFile err', err);
      });
    }
    deleteSweet(sweet.id)
      .then((res) => {
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          likesSweets: profileData.likesSweets.filter((lSweet) => lSweet.id !== sweet.id),
          commentedSweets: profileData.commentedSweets.filter(
            (cSweet) => cSweet.id !== sweet.id
          ),
          writtenSweets: profileData.writtenSweets.filter(
            (wSweet) => wSweet.id !== sweet.id
          ),
        }).catch((err) => {
          console.log('updateUsersProfileData delComment err', err);
        });
      })
      .catch((err) => {
        console.log('deleteSweet err', err);
      });
  };

  const handleLikeSweet = () => {
    const liked = new Set(sweet.likes).has(userObj.uid);
    likeSweet(liked, sweet.id, userObj.uid)
      .then((res) => {
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          likesSweets: liked
            ? profileData.likesSweets.filter((lSweet) => lSweet.id !== sweet.id)
            : [...profileData.likesSweets, sweet],
        })
          .then((res) => {
            console.log('updateProfileLikesSweets res', res);
          })
          .catch((err) => {
            console.log('updateProfileLikesSweets err', err);
          });
      })
      .catch((err) => {
        console.log('likeSweet err', err);
      });
  };

  const handleUpdateSweet = (text) => {
    // const sweetData = getState().sweetsReducer.sweets.data.find((sweet) => sweet.id === id);
    // if (!sweetData.id) return;
    updateSweet(sweet.id, text)
      .then((res) => {
        setEditing(false);
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          likesSweets: profileData.likesSweets.map((lSweet) =>
            lSweet.id === sweet.id ? { ...lSweet, text } : lSweet
          ),
          writtenSweets: profileData.writtenSweets.map((wSweet) =>
            wSweet.id === sweet.id ? { ...wSweet, text } : wSweet
          ),
        });
      })
      .catch((err) => {
        console.log('updateSweet err', err);
      });
  };

  const handleAddComment = (text, clearText) => {
    const commentObj = {
      id: sweet.id,
      uid: userObj.uid,
      createdAt: Date.now(),
      dName: userObj.displayName,
      text,
      likes: [],
      nestedComments: [],
    };
    addSweetComment(sweet.id, commentObj)
      .then((res) => {
        clearText();
        // console.log('addSweetComment res', res);
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          commentedSweets: [...profileData.commentedSweets, commentObj],
        })
          .then((res) => {
            console.log('updateUsersCommentedSweets res', res);
          })
          .catch((err) => {
            console.log('updateUsersCommentedSweets err', err);
          });
      })
      .catch((err) => {
        console.log('addSweetComment err', err);
      });
  };

  const handleDeleteComment = (cid) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    deleteSweetComment(sweet, cid)
      .then((res) => {
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          commentedSweets: profileData.commentedSweets
            .filter((cSweet) => cSweet.createdAt !== cid)
            .filter((s) => s.commentId !== cid),
        })
          .then((res) => {
            console.log('updateUsersCommentedSweets delete res', res);
          })
          .catch((err) => {
            console.log('updateUsersCommentedSweets delete err', err);
          });
      })
      .catch((err) => console.log('deleteSweetComment err', err));
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
            <div
              className="info"
              onClick={() => history.push(`/profile/${sweet.creatorId}`)}
            >
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
              liked={new Set(sweet.likes).has(userObj.uid)}
              comments={sweet.comments}
              handleLikeSweet={handleLikeSweet}
              handleAddComment={() => setAddComment((prev) => !prev)}
            />
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
