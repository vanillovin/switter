type LoadingScreenProps = {
  msg?: string;
};

function LoadingScreen({ msg }: LoadingScreenProps) {
  return (
    <div className="loading-component">
      <div className="loading"></div>
      <p>{msg ? msg : '로딩 중'}...</p>
    </div>
  );
}

export default LoadingScreen;
