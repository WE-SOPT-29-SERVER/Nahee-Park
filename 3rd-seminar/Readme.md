# 1. HTTP

## stateless protocol - 무상태 프로토콜

- 서버가 두 요청 간에 어떠한 데이터 상태도 유지하지 않음, 모든 요청이 상호 독립적
  -> 추후에 cookie, session, token 등을 사용해 극복

## HTTP apthem

- GET, DELETE : 리퀘스트 바디가 없음
  -> params랑 query로 구분함
- POST, PUT : 리퀘스트 바디가 있음

## 데이터 전달방식

- 2xx 성공
- 3xx 리다이렉션
- 4xx 요청 오류
- 5xx 서버 내부 오류
  외우기 !

## REQUEST

1. URL : param, query
2. header: 부가적인 정보를 전송
3. bodt: XML, JSON, MULTI FORM 등의 데이터

# 2. CRUD

| CRUD   | HTTP METHOD | SQL    |
| ------ | ----------- | ------ |
| POST   | CREATE      | INSERT |
| GET    | READ        | SELECT |
| PUT    | UPDATE      | UPDATE |
| DELETE | DELETE      | DELETE |

## req
- req.query
- req.params
- req.headers
- req.body
- req.file 
등등

## res
- res.status(xxx).send(json) : 고정적인 형태로 줘야 클라이언트 측에서 편안! ㄴ

# 3. Firebase Cloud Function

- 일단 콘솔 가서 프로젝트 생성 (프로젝트 이름이 프로젝트 아이디로 이어지므로 신경쓸 것)

```
firebase init
functions
use an existig project
프로젝트 아이디 입력
```

## 3-1 폴더구조

### 루트

- firebase.json : firebase에서 사용하기로 선택한 서비스들에 대한 설명
- .firebaserc : firebase프로젝트 관련 설정 저장

### functions 내부

- eslint/ prettire 예쁘게 쓰기 위해 넣을 것
- index.js ) serviceAccount에서 받은 서비스 계정 프라이빗 키 Json파일을 넣어둠
  -> 이때 프라이빗 키를 갖고 있는 json파일은 무조건 .gitignore처리를 해둘 것
- 필요한 모듈들은 `functions`파일 안에서 설치할 것 )

```
npm i exrpess cors cookie-parse dotenv hpp helmet eslint-config-prettier
```

- api/ -> api라우팅 하는 폴더
- constants -> responseMessage / statusCode 저장
- lib -> utils 저장
- dbMockup -> 임시 mock데이터 저장

## 3-2. 서버 실행

- finctions 디렉토리 안에서

```
npm run serve
```

= ✔ functions[asia-northeast3-api]: http function initialized (http://localhost:5001/wesopt29-2e38a/asia-northeast3/api). 이게 로컬 서버의 base URL

### 3-3. 서버 배포

- 일단 서버 끄고
- finctions 디렉토리 안에서

```
npm run deploy
```
