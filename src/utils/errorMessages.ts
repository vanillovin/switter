const authErrorMessages: {
  [key: string]: string;
} = {
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다. 다시 시도해주세요.',
  'auth/user-not-found': '계정을 찾을 수 없습니다. 이메일을 다시 확인해주세요.',
  'auth/invalid-email': '잘못된 이메일 형식입니다. 올바른 이메일을 입력해주세요.',
  'auth/weak-password': '비밀번호는 6자 이상으로 설정해야 합니다.',
  'auth/network-request-failed':
    '네트워크 연결에 문제가 있습니다. 연결을 확인하고 다시 시도해주세요.',
  'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후에 다시 시도해주세요.',
  'auth/operation-not-allowed':
    '현재 로그인 방식은 사용할 수 없습니다. 다른 방식을 이용해주세요.',
  'auth/internal-error': '잘못된 요청입니다.',
};

export function getAuthErrorMessage(code: string): string {
  return authErrorMessages[code] || '로그인에 실패하였습니다. 다시 시도해주세요!';
}
