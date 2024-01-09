import { useNavigate } from 'react-router-dom';

function NotFoundPage({ message = '존재하지 않는 페이지입니다' }) {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <h1>{message}</h1>
      <div>
        <button onClick={() => navigate(-1)}>이전으로 돌아가기</button>
        <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
