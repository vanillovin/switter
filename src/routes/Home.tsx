import Error from './Error';
import SweetItem from '../components/sweet/SweetItem';
import LoadingScreen from '../components/LoadingScreen';
import SweetFactory from '../components/sweet/SweetFactory';
import { useTheme } from '../contexts/ThemeProvider';
import { useSweets } from '../hooks/useFetchSweets';

function Home() {
  const { darkMode } = useTheme();
  const { loading, error, data: sweets, retry } = useSweets();

  if (loading) return <LoadingScreen msg="스윗을 불러오는 중" />;

  if (error) return <Error msg={error.message} onRetry={retry} />;

  return (
    <div className={darkMode ? 'container dark' : 'container'}>
      <SweetFactory />
      <div className="sweet-container" style={{ marginTop: 30 }}>
        {sweets?.map((sweet, i) => (
          <SweetItem key={i} sweet={sweet} />
        ))}
      </div>
    </div>
  );
}

export default Home;
