import { Link } from 'react-router-dom';

type ErrorProps = {
  msg: string;
  onRetry?: () => void;
};

export default function Error({ msg, onRetry }: ErrorProps) {
  return (
    <div className="error-page">
      <p>에러가 발생했습니다 : {msg}</p>
      {onRetry && <button onClick={onRetry}>다시 시도하기</button>}
      <Link to="/">홈으로 이동하기</Link>
    </div>
  );
}
