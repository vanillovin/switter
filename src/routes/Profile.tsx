import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Profile } from '../types/Profile';
import { userAtom } from '../atoms/userAtom';
import LoadingScreen from '../components/LoadingScreen';
import NotFoundPage from '../components/NotFoundPage';
import ProfileEdit from '../components/profile/ProfileEdit';
import { useTheme } from '../contexts/ThemeProvider';
import { fetchProfileData } from '../services/firebase/userService';
import { isUserConfirmed } from '../utils/utils';
import { authService } from '../services/firebase/firebaseConfig';

function Profile() {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useTheme();
  const user = useAtomValue(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'sweets' | 'comments' | 'likes'>('sweets');
  const timeline = (profile?.[activeTab] ?? []).sort((a, b) => b.createdAt - a.createdAt);

  useEffect(() => {
    setLoading(true);
    fetchProfileData(id!)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      // Cleanup Function
      setProfile(undefined);
    };
  }, [id]);

  const onLogOut = () => {
    if (isUserConfirmed('정말 로그아웃하시겠습니까?')) authService.signOut();
  };

  if (loading) return <LoadingScreen />;

  if (profile === undefined) {
    return <NotFoundPage message="존재하지 않는 사용자입니다" />;
  }

  return (
    <div className={`right ${darkMode ? 'dark' : ''}`}>
      <div className={darkMode ? ' profileContainer dark' : ' profileContainer'}>
        <div className="profileInfoContainer">
          <div className="profileInfo">
            {!isEditing ? (
              <div>
                <img
                  alt="profile"
                  className="profileImage"
                  src={profile?.profileImageURL}
                />
                <div>
                  <h2 className="dname">{profile?.displayName}</h2>
                  <p className="email">@{profile?.email.split('@')[0]}</p>
                </div>
                <p className="aboutMe">{profile?.about}</p>
              </div>
            ) : (
              <ProfileEdit profile={profile} onCloseEdit={() => setIsEditing(false)} />
            )}

            {user && profile?.uid === user?.uid && !isEditing && (
              <div className="profileBtns">
                <button className="profileEditButton" onClick={() => setIsEditing(true)}>
                  프로필 수정
                </button>
                <button className="logoutBtn" onClick={onLogOut}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <ul className="profileTimeline">
            {[
              ['sweets', '스윗'],
              ['comments', '댓글'],
              ['likes', '마음에 들어요'],
            ].map(([tab, text], i) => (
              <li
                key={i}
                className={tab === activeTab ? 'active' : ''}
                onClick={() => setActiveTab(tab as 'sweets' | 'comments' | 'likes')}
              >
                {text}
              </li>
            ))}
          </ul>
          <section className="timeline_sweets">
            {/* {JSON.stringify(profile?.[activeTab] ?? [])} */}
            {timeline.map((item) => (
              <article className="timeline_sweet">
                <Link to={`/sweet/${item.sweetId}`}>
                  <figure>
                    <img src={item.profileImageURL} />
                  </figure>
                  <div className="info">
                    <div className="">
                      <h3>{item.displayName}</h3>
                      <time>{convertTimestampToFormattedDate(item.createdAt)}</time>
                    </div>
                    <p className="content">{item.content}</p>
                    {item.attachmentURL && item.attachmentURL !== '' && (
                      <img src={item.attachmentURL} />
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;

function convertTimestampToFormattedDate(timestamp: number): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하기 때문에 1을 더해줍니다.
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}
