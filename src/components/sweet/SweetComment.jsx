import React, { useContext } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { displayedAt } from 'utils';
import SweetActionButtons from './SweetActionButtons';
import useModal from 'hooks/useModal';
import { updateSweetNestedComment } from 'services/sweets';
import { updateUsersProfileData } from 'services/users';
import SweetNestedComments from './SweetNestedComments';
import { UsersProfileContext } from 'contexts/UsersProfileContext';

function SweetComment({ comments, comment, userObj, handleDeleteComment }) {
  const { modal, handleModal } = useModal();
  const isOwner = comment.uid === userObj.uid;
  const { usersProfileData } = useContext(UsersProfileContext);
  const profileData = usersProfileData[userObj.uid];

  const onHandleDeleteComment = () => handleDeleteComment(comment.createdAt);

  const handleLikeComment = () => {
    const liked = new Set(comment.likes).has(userObj.uid);
    const newComments = comments.map((pComment) =>
      pComment.createdAt === comment.createdAt
        ? {
            ...comment,
            likes: liked
              ? comment.likes.filter((uid) => uid !== userObj.uid)
              : [...comment.likes, userObj.uid],
          }
        : pComment
    );
    updateSweetNestedComment(comment.id, newComments)
      .then((res) => {
        console.log('handleLikeComment res', res);
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          likesSweets: liked
            ? profileData.likesSweets.filter((lSweet) => lSweet.id !== comment.id)
            : [...profileData.likesSweets, comment],
        })
          .then((res) => {
            console.log('updateProfileLikesComments res', res);
          })
          .catch((err) => {
            console.log('updateProfileLikesComments err', err);
          });
      })
      .catch((err) => {
        console.log('handleLikeComment err', err);
      });
  };

  const handleAddNestedComment = (text, onClearValue) => {
    const nestedComment = {
      commentId: comment.createdAt,
      id: comment.id,
      createdAt: Date.now(),
      uid: userObj.uid,
      name: userObj.displayName,
      text,
    };
    const newComments = comments.map((pComment) =>
      pComment.createdAt === comment.createdAt
        ? { ...comment, nestedComments: [...comment.nestedComments, nestedComment] }
        : pComment
    );
    updateSweetNestedComment(comment.id, newComments)
      .then((res) => {
        // console.log('updateSweetNestedComment res', res);
        onClearValue();
        updateUsersProfileData(userObj?.uid, {
          ...profileData,
          commentedSweets: [...profileData.commentedSweets, nestedComment],
        })
          .then((res) => {
            console.log('updateUsersCommentedSweets res', res);
          })
          .catch((err) => {
            console.log('updateUsersCommentedSweets err', err);
          });
      })
      .catch((err) => {
        console.log('updateSweetNestedComment err', err);
      });
  };

  const handleDeleteNestedComment = (id) => {
    if (!window.confirm('답글을 삭제하시겠습니까?')) return;
    const newComments = comments.map((pComment) =>
      pComment.createdAt === comment.createdAt
        ? {
            ...comment,
            nestedComments: comment.nestedComments.filter(
              (nComment) => nComment.createdAt !== id
            ),
          }
        : pComment
    );
    updateSweetNestedComment(comment.id, newComments)
      .then((res) => {
        // console.log('deleteSweetNestedComment res', res);
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          commentedSweets: profileData.commentedSweets.filter(
            (cSweet) => cSweet.createdAt !== id
          ),
        })
          .then((res) => {
            console.log('updateUsersCommentedSweets res', res);
          })
          .catch((err) => {
            console.log('updateUsersCommentedSweets err', err);
          });
      })
      .catch((err) => {
        console.log('deleteSweetNestedComment err', err);
      });
  };

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
      <SweetActionButtons
        type="comment"
        id="id"
        likes={comment.likes}
        liked={new Set(comment.likes).has(userObj.uid)}
        comments={comment.nestedComments}
        handleLikeSweet={handleLikeComment}
        handleAddComment={handleModal}
      />

      {modal && (
        <SweetNestedComments
          nestedComments={comment.nestedComments.sort(
            (a, b) => b.createdAt - a.createdAt
          )}
          isOwner={isOwner}
          handleAddNestedComment={handleAddNestedComment}
          handleDeleteNestedComment={handleDeleteNestedComment}
        />
      )}
    </div>
  );
}

export default SweetComment;
