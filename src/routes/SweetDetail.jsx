import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';

import useToggle from 'hooks/useToggle';
import SweetComments from '../components/sweet/SweetComments';
import SweetEdit from 'components/sweet/SweetEdit';
import {
  addSweetComment,
  deleteStorageFile,
  deleteSweet,
  deleteSweetComment,
  fetchSweet,
  likeSweet,
  updateSweet,
} from 'services/sweets';
import Loading from 'components/Loading';
import SweetActionButtons from 'components/sweet/SweetActionButtons';
import NotFoundPage from 'components/NotFoundPage';
import { UsersProfileContext } from 'contexts/UsersProfileContext';
import { updateUsersProfileData } from 'services/users';

const regex = /[\s\uFEFF\xA0]+$/gi;

const initialSweet = {
  loading: true,
  data: null,
  error: null,
};

function SweetDetail({ userObj, darkMode }) {
  const [sweetData, setSweetData] = useState(initialSweet);
  const { loading, data: sweet, error } = sweetData;
  const topToggleRef = useRef();
  const params = useParams();
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [topToggle, onTopToggleChange] = useToggle(topToggleRef);
  const isOwner = sweet?.creatorId === userObj.uid;
  const { usersProfilePhoto, usersProfileData } = useContext(UsersProfileContext);
  const profileData = usersProfileData?.[userObj?.uid];

  const clearSweet = () => setSweetData(initialSweet);

  useEffect(() => {
    fetchSweet(
      params.id,
      (doc) => {
        // console.log(doc.data());
        setSweetData((prev) => ({
          ...prev,
          loading: false,
          data: doc.data(),
        }));
      },
      (err) => {
        console.log('fetchSweet error', err);
        setSweetData((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );

    return () => {
      fetchSweet();
      clearSweet();
    };
  }, [params.id]);

  const handleDeleteSweet = () => {
    if (!window.confirm('스윗을 삭제하시겠습니까?')) return;
    if (sweet?.attachmentUrl !== '') {
      deleteStorageFile(sweet.attachmentUrl).catch((err) => {
        console.log('deleteStorageFile err', err);
      });
    }
    deleteSweet(params?.id)
      .then((res) => {
        history.goBack();
        updateUsersProfileData(userObj?.uid, {
          ...profileData,
          likesSweets: profileData.likesSweets.filter(
            (lSweet) => lSweet.id !== params?.id
          ),
          commentedSweets: profileData.commentedSweets.filter(
            (cSweet) => cSweet.id !== params?.id
          ),
          writtenSweets: profileData.writtenSweets.filter(
            (wSweet) => wSweet.id !== params?.id
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
    const liked = new Set(sweet?.likes).has(userObj?.uid);
    likeSweet(liked, params?.id, userObj?.uid)
      .then((res) => {
        updateUsersProfileData(userObj?.uid, {
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
    updateSweet(params?.id, text)
      .then((res) => {
        setEditing(false);
        updateUsersProfileData(userObj?.uid, {
          ...profileData,
          likesSweets: profileData.likesSweets.map((lSweet) =>
            lSweet.id === params?.id ? { ...lSweet, text } : lSweet
          ),
          writtenSweets: profileData.writtenSweets.map((wSweet) =>
            wSweet.id === params?.id ? { ...wSweet, text } : wSweet
          ),
        });
      })
      .catch((err) => {
        console.log('updateSweet err', err);
      });
  };

  const handleAddComment = (text, clearText) => {
    const commentObj = {
      id: params.id,
      uid: userObj?.uid,
      createdAt: Date.now(),
      dName: userObj?.displayName,
      text,
      likes: [],
      nestedComments: [],
    };
    addSweetComment(params.id, commentObj)
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
    deleteSweetComment({ ...sweet, id: params?.id }, cid)
      .then((res) => {
        updateUsersProfileData(userObj?.uid, {
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

  if (loading) return <Loading />;

  if (!sweet) return <NotFoundPage message="존재하지 않는 스윗입니다" />;

  return (
    <div className={darkMode ? 'sweetDetailContainer dark' : 'sweetDetailContainer'}>
      <div className="sweetDetailTop">
        <button onClick={() => history.push('/')}>←</button>
        스레드
      </div>
      <div className="sweetDetail">
        {editing ? (
          <SweetEdit
            text={sweet?.text}
            onSubmit={handleUpdateSweet}
            closeEdit={() => setEditing(false)}
          />
        ) : (
          <>
            <div className="sweetDetailTopInfo">
              <div
                className="userInfo"
                onClick={() => history.push(`/profile/${sweet?.creatorId}`)}
              >
                <img
                  alt="profile"
                  className="profile"
                  src={
                    usersProfilePhoto[sweet?.creatorId] ||
                    `${process.env.PUBLIC_URL}/default-profile.png`
                  }
                />
                <div className="text">
                  <span className="dname">{sweet?.dName || '♥'}</span>
                  <span className="email">@{sweet?.email?.split('@')[0]}</span>
                </div>
              </div>
              <div className="rightButtons" ref={topToggleRef}>
                {isOwner && (
                  <>
                    <button className="rToggleBtn" onClick={onTopToggleChange}>
                      <FaEllipsisH />
                    </button>
                    {topToggle && (
                      <div className="buttons">
                        <button onClick={handleDeleteSweet}>
                          <FaTrash /> 삭제하기
                        </button>
                        <button onClick={() => setEditing((prev) => !prev)}>
                          <FaPencilAlt /> 수정하기
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <p className="sweetDetailContent">{sweet?.text.replace(regex, '')}</p>
            {sweet?.attachmentUrl && <img alt="img" src={sweet?.attachmentUrl} />}
          </>
        )}
        <div className="sweetDetailInfo">
          <div className="commentText">
            <span>{sweet?.comments?.length}</span> 답글
          </div>
          <div>
            <span>{sweet?.likes?.length}</span> 마음에 들어요
          </div>
        </div>
        <SweetActionButtons
          type="detail"
          id={params.id}
          likes={sweet.likes}
          liked={sweet.likes.includes(userObj?.uid)}
          comments={sweet.comments}
          handleLikeSweet={handleLikeSweet}
          handleAddComment={() => {}}
        />
        <SweetComments
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          comments={sweet?.comments.sort((a, b) => b.createdAt - a.createdAt)}
          userObj={userObj}
        />
      </div>
    </div>
  );
}

export default SweetDetail;
