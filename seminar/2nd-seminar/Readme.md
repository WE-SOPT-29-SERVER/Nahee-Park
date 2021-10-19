# 1. 비동기처리

- JS는 디폴트로 호이스팅이 완료되면 동기적으로 실행
- 비동기적으로 사용하고 싶을 때 아래와 같은 방식들을 사용

## 1-2. 콜백함수

- 일급 객체인 JS 함수는 다른 함수의 인자로 넘길 수 있다
- 특정 함수를 비동기적으로 호출되도록 콜백함수로 넘김
- 콜백 지옥 웩

## 1-3. Promise

- new Promise() 메서드를 호출하면 일단 pending상태 -> resolve() 부르면 fulfilled 상태 / reject() 부르면 rejected 상태
- 이행 상태 -> .then()으로 전달
- 실패 상태 -> catch()로 전달

## 1-4. Async/Await

- async/await을 통해 동기적인 느낌의 코드로 작성 가능!

# 2. 모듈

## 2-1. 모듈 뜻

- 독립된 기능을 하는 함수, 변수 집합 -> 이 자체가 하나의 프로그램이자 다른 프로그램의 부품
- 재사용 용이

## 2-2. crypto : 문자열 암호화, 복호화, 해싱 모듈

### crypto 모듈 사용방법

- 문자열을 암호화 복호화(암호화 반대) hashing하는 모듈

```javascript
const crypto = require("crypto");

const password = "qwerty"; // 기존 비밀번호
const hex = crypto.createHash("sha512").update(password).digest("hex");
// crypto 모듈을 활용해 암호화한 비밀번호.
```

- createHash() md5, sha256, sha512 등의 알고리즘 입력. (주로 sha512 사용). 해시 값을 반환한다.
- update() 변환할 문자열을 입력한다
- digest() base64, hex 등의 인고딩 알고리즘을 입력한다.

### 비밀번호 저장하는 방법

1. 단순 텍스트 : 범죄다 nope
2. hashing

- 입력받은 암호 해싱해서 저장,
- avalanche 효과 ) 입력값 조금만 바뀌어도 출력값 크게 변해서 보안 굳
- 그렇지만 흔한 비밀번호에 대한 해시값 리스트로 저장해두고 무작위 공격하는 rainbow attack에 취약

3. hashing with salt

- salt : 암호화 중 해싱할 때 쓰는 임의의 문자열 ) DB에 salt와 password를 같이 저장해줘야한다
- 패스워드에 소금 쳐서 암호화하는 것-> salt 추가하므로 더욱 보안이 좋아짐

4. ket stretching

- hashing with salt N번 실행

### pbkdf2

- 비밀번호 암호화에서 자주 사용하는 알고리즘
- crypto에 내장되어있기에 crypto.pbkdf2 (비번, 솔트 값, 반복 횟수, 출력 byte, 해시 알고리즘, callback) 로 사용하면 된다!

## 2-3. File system module

- 파일 시스템에 접근하는 모듈
- 파일 생성, 삭제, 읽기, 쓰기 등 수행 OR 폴더 생성, 삭제

### 비동기 방식

- Promise를 지원하지 않아 callback을 사용한다.
- readFile(path, [option], callback)
- writeFile(file, data, [option], callback)

### 동기 방식

- readFileSync(path, [options])
- writeFileSync(file, data, [options])

# 3. express

- public, view ) 프론트 붙일 때 씀
- app.js ) 스타트폴더 -> 핵심적 서버 역할, 미들웨어 관리, 라우팅의 시작점
- package.json ) 디펜던시의 모음
