# **Switter** (Sweet + Twitter)

Cloning Twitter with React and Firebase.

<br>

**배포 링크**: https://switter.vercel.app/

<br>

> **테스트용 계정**<br>
> 이메일: test@test.com<br>
> 비밀번호: 123456

<br>

## 🚀 기술 스택

- Front
  - React.js
  - TypeScript
  - Jotai
  - Radix UI
- Back
  - Firebase (Database, Authentication)

이 프로젝트는 Vercel을 사용하여 호스팅되고 있습니다.

<br>

## 🌲 디렉터리 구조

```
📦src
 ┣ 📂atoms
 ┃ ┗ 📜userAtom.ts # Jotai 상태 원자 관리 파일
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜AuthForm.tsx # 인증 폼 컴포넌트
 ┃ ┃ ┣ 📜github-btn.tsx # GitHub 로그인 버튼 컴포넌트
 ┃ ┃ ┗ 📜google-btn.tsx # Google 로그인 버튼 컴포넌트
 ┃ ┣ 📂profile
 ┃ ┃ ┗ 📜ProfileEdit.tsx # 프로필 수정 컴포넌트
 ┃ ┣ 📂sweet
 ┃ ┃ ┣ 📜SweetActionButtons.tsx # 스윗 액션 버튼 컴포넌트
 ┃ ┃ ┣ 📜SweetComment.tsx # 스윗 댓글 컴포넌트
 ┃ ┃ ┣ 📜SweetCommentContainer.tsx # 스윗 댓글 컨테이너 컴포넌트
 ┃ ┃ ┣ 📜SweetEdit.tsx # 스윗 수정 컴포넌트
 ┃ ┃ ┣ 📜SweetFactory.tsx # 스윗 생성 폼 컴포넌트
 ┃ ┃ ┗ 📜SweetItem.tsx # 개별 스윗 아이템 컴포넌트
 ┃ ┣ 📜App.tsx # 메인 애플리케이션 컴포넌트
 ┃ ┣ 📜Dialog.tsx # 다이얼로그 모달 컴포넌트
 ┃ ┣ 📜DropdownMenu.tsx # 드롭다운 메뉴 컴포넌트
 ┃ ┣ 📜layout.tsx # 전반적인 레이아웃 컴포넌트
 ┃ ┣ 📜LoadingScreen.tsx # 로딩 화면 컴포넌트
 ┃ ┣ 📜Navigation.tsx # 네비게이션 바 컴포넌트
 ┃ ┣ 📜NotFoundPage.tsx # 404 에러 페이지 컴포넌트
 ┃ ┗ 📜styles.css # 전역 CSS 스타일 파일
 ┣ 📂contexts
 ┃ ┣ 📜ModalContext.tsx # 모달 컨텍스트 관리 파일
 ┃ ┗ 📜ThemeProvider.tsx # 테마 프로바이더 컨텍스트 파일
 ┣ 📂hooks
 ┃ ┣ 📜useBoolean.ts # 불리언 상태를 다루는 훅
 ┃ ┣ 📜useFetchSweets.ts # 스윗 데이터를 가져오는 훅
 ┃ ┣ 📜useInput.ts # 입력 필드를 다루는 훅
 ┃ ┣ 📜useSweetService.ts # 스윗 서비스와 관련된 훅
 ┃ ┗ 📜useToggle.ts # 토글 상태를 다루는 훅
 ┣ 📂routes
 ┃ ┣ 📜Auth.tsx # 인증 관련 페이지 컴포넌트
 ┃ ┣ 📜Error.tsx # 오류 페이지 컴포넌트
 ┃ ┣ 📜Home.tsx # 홈 페이지 컴포넌트
 ┃ ┣ 📜Message.tsx # 메시지 페이지 컴포넌트
 ┃ ┣ 📜Profile.tsx # 프로필 페이지 컴포넌트
 ┃ ┣ 📜protected-route.tsx # 인증이 필요한 루트 컴포넌트
 ┃ ┗ 📜SweetDetail.tsx # 스윗 상세 페이지 컴포넌트
 ┣ 📂services
 ┃ ┗ 📂firebase
 ┃ ┃ ┣ 📜firebaseConfig.ts # Firebase 구성 파일
 ┃ ┃ ┗ 📜sweetService.ts # 스윗 관련 Firebase 서비스 파일
 ┣ 📂types
 ┃ ┣ 📜Profile.ts
 ┃ ┣ 📜Sweet.ts
 ┃ ┗ 📜User.ts
 ┣ 📂utils
 ┃ ┣ 📜errorMessages.ts
 ┃ ┣ 📜storage.ts
 ┃ ┗ 📜utils.ts
 ┣ 📜config.ts
 ┣ 📜main.tsx
 ┣ 📜reportWebVitals.js
 ┣ 📜styles.css
 ┗ 📜vite-env.d.ts
```

<br>

## ✨ 주요 기능

### 메인

- 스윗을 조회, 작성하고 다른 사용자와 공유할 수 있습니다.
- 스윗과 댓글을 작성, 수정, 삭제, 좋아요가 가능합니다.

![스윗 조회](https://github.com/vanillovin/switter/assets/70941696/7af6e099-f97f-47d4-bd27-9db4ec346da0)

![스윗 게시](https://github.com/vanillovin/switter/assets/70941696/cc1a05d2-cb3d-452b-a9f9-6d672a5a0f23)

### 스윗 상세

- 선택한 스윗의 자세한 내용을 확인하고 상호작용할 수 있습니다.

![스윗 디테일](https://github.com/vanillovin/switter/assets/70941696/b3e93744-4bc2-4899-8fed-ca5760932775)

### 프로필

- 회원 정보를 수정하고 로그아웃할 수 있습니다.
- 사용자가 작성한 스윗과 댓글, 좋아요한 스윗의 타임라인 데이터를 조회할 수 있습니다.

![프로필](https://github.com/vanillovin/switter/assets/70941696/2294ecac-0ccf-44f2-9ac2-89cd94b34f82)

### 메시지

- 말풍선을 클릭할 때마다 무작위로 생성된 메시지를 표시합니다. 메시지를 통해 예상치 못한 감동을 느껴보세요!

![메시지](https://github.com/vanillovin/switter/assets/70941696/09618366-ba58-4f51-9655-065f3a181c82)

### 모달과 드롭다운 메뉴

- 로그인하지 않은 사용자가 서비스 이용 시 편리한 경험을 위해 모달이 표시됩니다.
- 편의성과 접근성을 위해 웹 접근성 표준을 준수하는 Radix UI 라이브러리로 구현하였습니다.

![dialog](https://github.com/vanillovin/switter/assets/70941696/c8ba0171-a93f-4f4f-9e85-299e9543f5e7)

### 로그인/회원가입

- 이메일과 소셜(구글, 깃허브) 로그인과 회원가입이 가능합니다.
- 오류 코드에 대응하는 메시지를 반환해 에러 메시지를 효과적으로 처리했습니다.

![로그인](https://github.com/vanillovin/switter/assets/70941696/04a26129-c12e-49eb-b1e8-e636a5957db9)

![회원가입](https://github.com/vanillovin/switter/assets/70941696/8e8d6c0b-f37d-4706-8c69-0ad8d41c52fb)

### 다크 모드

- 다크 모드를 지원해 시각적 편안함, 사용자 선호도를 제공합니다.

![다크모드](https://github.com/vanillovin/switter/assets/70941696/72b44d05-9ff2-478b-b514-07bd0f68c16c)
