<p align="center">
  <img src="https://github.com/yangtory/2024-Team-Voca/assets/151486114/2d3158b0-5cc9-4f01-8c5c-674a9e75480c">
</p>

## 프로젝트 소개
- 단어라는 나무가 모여 숲이 된다는 의미로 'Forest Voca' 가 되었습니다.
- 함께하는 단어장 공부로 커뮤니티에서 서로 단어장을 공유할 수 있습니다.
- 개발기간 : 2024.02.26 ~ 2024.03.13 (17일)
- 플랫폼 : Web
</br>

## 팀원 구성
|양정연|김승희|이연수|
|---|---|---|
|<img width="200px" alt="image" src="https://github.com/yangtory/2024-Team-Mem/assets/151486114/4dd13ed9-5ed4-4c9e-b40c-ff42a4ac6900">|<img width="200px" src="https://github.com/yangtory/2024-Team-Mem/assets/151486114/22a1d0f1-9b66-45ed-b9c3-174d8606d992">|<img width="200px" src="https://github.com/yangtory/2024-Team-Voca/assets/151486114/bad4851d-4b19-4661-b10f-e7d199346c81">|
|[@yangtory](https://github.com/yangtory)|[@Kwinhui](https://github.com/Kwinhui)|[@Yeonsu1027](https://github.com/Yeonsu1027)|
<br/>

## 1. 개발환경
- 언어 : Javascript, Pug, HTML5, CSS
- 서버 : NodeJS, Express
- 프레임워크 : Express, Sequelize
- DB : MySQL
- API, 라이브러리 : Google Cloud API(Translate API), Multer, Session, UUID
- 협업 : Github, Notion
<br/>

## 2. 역할분담
### 🐱 양정연
- 로그인, 회원가입, 퀴즈, 튜토리얼, 구글API 셋팅
- 설정(프로필 수정/비공개 계정 전환/프리미엄 구매/튜토리얼 다시보기)

### 🐹 이연수
- 단어장/단어 추가, 프로젝트 컨셉 및 CSS 담당

### 🐶 김승희
- 노션 회의 기록, 커뮤니티(댓글 CRUD/좋아요 기능)
<br/>

## 3. ERD
<img width="877" alt="image" src="https://github.com/yangtory/2024-Team-Voca/assets/151486114/3a90d0b9-6cc2-469c-aace-e62b950c8789">

- 1주차 (2월 26일 - 3월 2일) 기획서 발표, 논리적 모델링, 물리적 모델링, 요구사항 분석 ,테이블 작성, 기능 분석, UI 예시
- 2주차 (3월 3일 - 3월 9일) 페이지 구성, 기능 구현, 역할 분담, 테이블 구조 변경, 번역 API 추가, 프로젝트 중간 발표
- 3주차 (3월 10일 - 3월 13일) 논리적 모델링, 물리적 모델링, 테이블 변경, 번역 기능 구현, 통합 테스트, 최종 발표

## 4. 페이지
### [로그인/회원가입]
- session 을 이용한 로그인 구현
- 로그인, 회원가입 유효성 및 중복 검사
- 회원가입 시 프로필사진 등록 가능
  
|초기화면|로그인|회원가입|
|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/2baaff64-a473-4a9a-bc9e-b80ddcd128d1)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/c70ef2f8-69fe-4a90-8edd-e02d8b2f0663)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/b8c5a5fa-5077-446e-a427-915a1ad83461)|
<br/>

### [튜토리얼]
- 회원가입 후 첫 로그인 시 튜토리얼 진행 여부 확인
 
|튜토리얼1|튜토리얼2|튜토리얼3|
|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/5b03fd0b-8874-4b41-bff1-6d861a11eec4)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/ff4c39c0-71e6-4543-b612-1fd7a28cb071)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/6899e8d9-d167-49a7-9c13-afe34d1be16b)|
<br/>

### [초기화면/단어장 서랍]
- 하단의 서랍을 클릭하면 나의 단어장 리스트 확인 가능
  
|초기화면|단어장 서랍|
|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/2c7d4412-4d99-4bef-9ed8-d3be9d8a3942)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/fcf3fe72-574d-4edd-aa71-9a0de5f88ea3)|
<br/>

### [단어장 생성/단어 추가]
- 단어장 공개, 비공개 설정 (커뮤니티 공유 설정)
- 단어 입력 후 자동완성 클릭 시 스펠링 작성됨

|단어장 메뉴버튼|단어장 추가|단어추가|
|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/dbbaf4f7-d8b7-4de2-8e63-c0ddccc0c490)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/9ebf5d73-6132-4784-bdff-498b1a6d9416)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/538c6b67-c048-4484-bd24-2ec4105293d9)|
<br/>

### [단어장 리스트]
- 홈 에서 하단 서랍 클릭하면 나의 단어장 리스트 확인할 수 있음
- 단어장 클릭 시 단어 리스트 확인할 수 있음

|홈에서 하단바 클릭|단어장 리스트|
|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/af229302-df92-40dd-af5a-baf26029bfc8)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/6c7bf294-1ca9-4286-a53e-603166496d60)|
<br/>

### [커뮤니티]
- 다른 사람들의 단어장을 볼 수 있음
- 좋아요를 누르면 좋아요한 단어장만 따로 볼 수 있음

|커뮤니티 메뉴 버튼|커뮤니티 단어장 리스트|
|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/f1761050-c1f4-4a5c-ac83-307e8b97f1ca)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/982edab5-61c6-415e-9098-9254b441fff6)|

|단어장 클릭 > 단어+댓글리스트|단어장만 보기|댓글 CRUD|
|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/07f88935-fe82-4d32-ac27-63a870355f19)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/4cd70ff9-ab21-4a5a-990c-faadd9c9ce11)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/c5878ab0-6de9-4088-b4cc-3432b7642c54)|
<br/>

### [퀴즈]
- 나의 단어장, 좋아요 누른 단어장 중 선택하여 진행
- 스펠링, 뜻 퀴즈 선택 후 퀴즈 진행

|퀴즈 메뉴버튼|단어장 선택1|단어장 선택2|퀴즈 진행|
|----|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/eb9a36ec-440c-4b3b-aecc-ac58daf275b5)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/377e976c-9711-4271-bcef-ce5e3e000c6f)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/e04fd5cc-7a65-45c2-bf7f-cd12574239c5)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/1f39d325-9d70-4441-8ce2-cbf56ab7e4b4)|
<br/>

### [설정]
- 비공개 계정 전환
- 프리미엄 구매 기능 (기존 회원은 단어장 5개 생성 제한)

|설정 메뉴버튼|설정 화면|프리미엄 구매 모달|프리미엄 해지 모달|
|----|----|----|----|
|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/edea2549-a78e-4e8d-982f-2037afa3267d)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/99478e0d-00db-4a4e-b148-2fe1bbad56ce)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/83d3002c-5e4c-4742-b915-038792ec18a6)|![image](https://github.com/yangtory/2024-Team-Voca/assets/151486114/60c94348-a1f1-4992-8cc8-d89995d6dc60)|
