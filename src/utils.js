export const handleCopy = (sweetId) => {
  navigator.clipboard.writeText(
    `https://vanillovin.github.io/switter/#/sweet/${sweetId}`
  );
  alert('클립보드로 복사됐습니다');
};

export const shareSns = (sns, id) => {
  const title = 'Switter';
  const pageUrl = 'https://vanillovin.github.io/switter';

  if (sns === 'twitter') {
    window.open(
      `https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}/%23/sweet/${id}`,
      'popup제목',
      'width=500, height=400, scrollbars=yes'
    );
  } else if (sns === 'facebook') {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}/%23/sweet/${id}`);
  } else {
    return;
  }
};

export function displayedAt(createdAt) {
  const milliSeconds = new Date() - createdAt;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

// export const getCreatedAt = () => {
//   const month = new Date(sweetObj.createdAt).getMonth() + 1;
//   const date = new Date(sweetObj.createdAt).getDate();
//   const hour = new Date(sweetObj.createdAt).getHours();
//   const min = new Date(sweetObj.createdAt).getMinutes();
//   return `${displayedAt(sweetObj.createdAt)}`;
// };
