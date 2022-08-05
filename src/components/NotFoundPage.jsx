import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFoundPage({ message = '존재하지 않는 페이지입니다' }) {
  const history = useHistory();
  return (
    <div className="notFound">
      <h1>{message}</h1>
      <button onClick={() => history.push('/')}>홈으로 돌아가기</button>
    </div>
  );
}

export default NotFoundPage;
