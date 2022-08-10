import React from 'react';
import { useHistory } from 'react-router-dom';
import { displayedAt } from 'utils';

function ProfileTimelineData({ sweets, profilePhoto }) {
  const history = useHistory();

  return (
    <div className="timelineSweetcontainer">
      {sweets.length > 0 ? (
        sweets
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((sweet) => (
            <div
              className="sweet"
              key={sweet.createdAt}
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                history.push(`/sweet/${sweet?.id}`);
              }}
            >
              <div className="hello">
                <div
                  className="info"
                  onClick={(e) => {
                    if (e.target !== e.currentTarget) return;
                    history.push(`/profile/${sweet?.uid}`);
                  }}
                >
                  <img alt="profile" src={profilePhoto} />
                  <span className="dname">{sweet.dName || '♥'}</span>
                  <span className="mini">{displayedAt(sweet.createdAt)}</span>
                </div>
              </div>
              <p
                className="sweet__text"
                onClick={(e) => {
                  if (e.target !== e.currentTarget) return;
                  history.push(`/sweet/${sweet?.id}`);
                }}
              >
                {sweet.text}
              </p>
              {sweet.attachmentUrl && (
                <img
                  alt="img"
                  src={sweet.attachmentUrl}
                  onClick={(e) => {
                    if (e.target !== e.currentTarget) return;
                    history.push(`/sweet/${sweet?.id}`);
                  }}
                />
              )}
            </div>
          ))
      ) : (
        <p className="nothing">아직 아무것도 없습니다</p>
      )}
    </div>
  );
}

export default ProfileTimelineData;
