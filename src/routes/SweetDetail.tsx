import { useAtomValue } from 'jotai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaPencilAlt, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { DocumentSnapshot, FirestoreError } from 'firebase/firestore';

import Loading from '../components/LoadingScreen';
import SweetEdit from '../components/sweet/SweetEdit';
import NotFoundPage from '../components/NotFoundPage';
import { defaultProfileImageURL } from '../components/auth/AuthForm';
import SweetCommentContainer from '../components/sweet/SweetCommentContainer';
import SweetActionButtons from '../components/sweet/SweetActionButtons';
import useToggle from '../hooks/useToggle';
import { userAtom } from '../atoms/userAtom';
import { useTheme } from '../contexts/ThemeProvider';
import { fetchSweet } from '../services/firebase/sweetService';
import type { Sweet } from '../types/Sweet';
import useSweetService from '../hooks/useSweetService';

const regex = /[\s\uFEFF\xA0]+$/gi;

type SweetState = {
  loading: boolean;
  data: Sweet | null;
  error: null | Error | FirestoreError;
};

function SweetDetail() {
  const user = useAtomValue(userAtom);
  const { darkMode } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [sweetData, setSweetData] = useState<SweetState>({
    loading: false,
    data: null,
    error: null,
  });
  const { loading, data: sweet } = sweetData;
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const topToggleRef = useRef<HTMLDivElement | null>(null);
  const { toggle, onToggleChange } = useToggle(topToggleRef);
  const liked = sweet?.likes?.find((like) => like.uid === user?.uid);
  const isLiked = user ? !!liked : false;
  const { onToggleLikeSweet, onDeleteSweet, onUpdateSweet } = useSweetService();

  useEffect(() => {
    setSweetData((prev) => ({
      ...prev,
      loading: true,
    }));
    fetchSweet(
      id as string,
      (doc: DocumentSnapshot) => {
        // console.log('fetchSweet data', doc.data());
        setSweetData((prev: SweetState) => ({
          ...prev,
          loading: false,
          data: doc.data() as Sweet,
        }));
      },
      (err: FirestoreError) => {
        console.error('fetchSweet error', err);
        setSweetData((prev: SweetState) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );
  }, [id]);

  const handleDeleteSweet = () => {
    onDeleteSweet(id as string, () => navigate(-1));
  };

  if (loading) return <Loading />;

  if (sweet === undefined || sweet === null) {
    return <NotFoundPage message="존재하지 않는 스윗입니다" />;
  }

  // if(error) return <Error message />

  return (
    <div className={`right ${darkMode ? 'dark' : ''}`}>
      <div className={` sweetDetailContainer ${darkMode ? 'dark' : ''}`}>
        <div className="sweetDetailTop">
          <button onClick={() => navigate('/')}>←</button>
          스레드
        </div>
        <div className="sweetDetail">
          {editing ? (
            <SweetEdit
              oldContent={sweet?.content ?? ''}
              onSubmit={(newContent: string) =>
                onUpdateSweet(sweet?.id, sweet?.attachmentURL, newContent)
              }
              closeEdit={() => setEditing(false)}
            />
          ) : (
            <>
              <div className="sweetDetailTopInfo">
                <Link to={`/profile/${sweet?.user?.uid}`} className="userInfo">
                  <img
                    alt="profile"
                    className="profile"
                    src={sweet?.user.profileImageURL ?? defaultProfileImageURL}
                  />
                  <div className="text">
                    <span className="dname">{sweet?.user.displayName || '♥'}</span>
                    <span className="email">@{sweet?.user?.email.split('@')[0]}</span>
                  </div>
                </Link>
                <div className="rightButtons" ref={topToggleRef}>
                  {sweet?.user.uid === user?.uid && (
                    <>
                      <button className="rToggleBtn" onClick={onToggleChange}>
                        <FaEllipsisH />
                      </button>
                      {toggle && (
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
              <p className="sweetDetailContent">{sweet?.content.replace(regex, '')}</p>
              {sweet?.attachmentURL && <img alt="img" src={sweet?.attachmentURL} />}
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
            id={sweet?.id}
            likesLength={sweet?.likes?.length}
            isLiked={isLiked}
            commentsLength={sweet?.comments.length}
            handleLikeSweet={() => onToggleLikeSweet({ ...sweet, id: id as string })}
            handleAddComment={() => {}}
          />
          <SweetCommentContainer
            sweet={{ ...sweet, id: id as string }}
            comments={sweet?.comments}
          />
        </div>
      </div>
    </div>
  );
}

export default SweetDetail;
