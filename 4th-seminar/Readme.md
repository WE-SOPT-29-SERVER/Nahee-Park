# 01. DB

- 클 <-> 서 <-> DB 요런 느낌
- 중복된 데이터를 없애고 자료 구조화, 체계화된 데이터의 집합!
- DBMS : 데이터베이스를 관리하는 미들웨어

## 1-1 RDB

- Relational Database
- column, attriute / row, tuple

### 테이블을 구성하는 용어

1. Primary Key : 다른데이터와 구별하기 위한 식별자의 역할 (id : index의 줄임말 , unique key, 주로 primary key로 많이 쓰임)

- 어떤 경우엔 두 개의 테이블이 용합될 수 있음 -> 하나 이상의 primary key

2. Foreign Key : 한 테이블 column 중 다른 테이블의 row를 식별할 수 있는 key

- user테이블에서 Primary Key가 post테이블에선 Foreign key의 역할을 함 -> post 와 user의 join

### 세가지 관계

1. 1 : 1 관계 : 이름 - 주민등록번호 ) 하나의 테이블에 때려넣음
2. 1 : N 관계 : 이름 - 이메일, 게시글 (여러 개일 수 있음, 그러나 하나의 이메일이나 게시글이 여러명의 유저를 가지지는 않음)
   -> 하나의 테이블에 때려넣을 수 없음 ! 스트링으로 때려넣어버리지 말 것. 그럼 배열은? 넣을 수 있는 SQL이 있고 안되는 SQL이 있음. postgresql은 배열타입 지원, SQL은 배열 타입 지원하지 않음. 그렇지만 배열로 저장하는 건 권장되지 않는 방식임
   then, how?

- email 테이블을 만들어서 이메일별로 primary Key를 두고, user의 primary key를 foreign key로 둠
- 1 : N 에서 N인 곳이 foreign key를 가짐

3. M : N 관계 : user - site

- user와 site 테이블 각각 만들고 그 둘을 Foreign key로 갖는 새로운 중간 테이블(Joint table)을 또 둠

### 정규화

- RDB 설계를 논리적, 직관적으로 만드는 과정
- 불필요한 데이터 제거
- 데이터 다루면서 생기는 이상현상 방지
- 개발 중 데이터 변화가 생겨도 설계 재구성할 필요성 감소

#### 이상현상

- 삽입이상
- 갱신이상
- 삭제이상

1. 1차 정규화

- 컬럼은 원자값을 가져야 한다.

2. 2차 정규화

- 모든 컬럼은 완전함수적 종속을 만족해야 한다? 뭔소리지 ) primary key 중에 특정 컬럼에만 종속된 컬럼이 없어야 함

- primary key가 특정해주는 정보가 부분적으로 특정 칼럼들을 종속시키는 key까지 종속시켜버리면 안됨
  -> Primary key가 과목 Key까지 종속시켜버리면 안됨 -> primary key가 제 역할을 다하지 못하고 있음 ) 따라서 2차 정규화를 통해 primary key가 제 역할을 다 할 수 있도록 테이블을 분리시켜주는 것인 2차 정규화

3. 3차 정규화

- 이행적 함수 종속이 없어야 한다 이건 또 뭔소리일까 ) 기본키 외의 칼럼이 다른 칼럼을 결정할 수 없다는 뜻

**결론 쪼갤 수 있을 만큼 테이블을 쪼개는 게 정규화**

4. BCNF

### 역정규화

- 다시 쪼갠 테이블을 합침 -> Join
- join 연산이 많을수록 느려짐. 뭐 그래도 그렇게까지 느려지진 않음
- 근데 님들이 아무리 조인해봤자 그렇게까지 느려지진 않을테니 일단 정규화 갈기기
- 그러다가 너무 타고타고가서 정보를 찾아야 해서 귀찮아지는 그런 시점에 역 정규화 join갈길 생각 ..
- 정규화하다가! 빡치면 역정규화!

## SQL

- notnull 등등 여부는 구현하고자 하는 것에 따라 달라짐
- general한 데이터들
  -> created at, updated at, is_deleted
- timetable은 다이나믹하게 움직이는 값들에 전부 있음. 이게 없으면 복잡하고 효율적인 비즈니스 모델을 짤 수 없음
- soft delete를 주로 사용할 것 (<->hard delete)

- foreign key는 약간 eslint바이브 -> 이거 설정하면 인덱스 생성돼서 속도 조금 빨라지지만 마음대로 삭제할 수 없고 빠른 작업을 할 때에 있어서 방해가 될 수 있음
- text형은 명확하게 string 길이 모를 때 사용

- jump to query console에서 INSERT SELECT UPDATE DELETE등 테스트 가능
- datagrip 자동완성 죽임 - join연산할 때 엄청 편함

- ISUD(INSERT, SELECT, UPDATE, DELETE) 연산들에서 쓸 수 없는 테이블 이름들이 있음
  ex) user -> public.user 또는 "user"로 이용
  -> 그래서 alias(애칭)을 지정해서 u라고 간단하게 지정함 !

- 조건(WHERE) 을 안 걸어주면 일괄 적용됨에 주의
- 내부 정보를 업데이트 할 때에는 updated_at도 바꿔줘야 함

- DELETE연산은 우린 사용하지 않을 예정임 ) 우린 오히려 UPDATE POST is_deleted true로 바꾸는 식으로 지울 거임 (soft delete)
- 콘솔에 찍히게 하고 싶을 때에는 RETURNING을 걸어줘야 함
- 그렇게 연산 하나가 끝나면 세미콜론으로 끝났음을 알려줘야함

## Node js에 연동

- userDB 등의 이름으로 모아두게 될 거임
- 우리가 지금 orm을 만들고 있음
- column명은 스네이크 케이스로 하는 게 좋다 ) 우리의 멘탈에

- db/db.js
  db랑 node js랑 연결해주는 포인트
- db/comment.js
- db/index.js
- db/post.js
- db/user.js

- 스네이크를 카멜로 바꿔주는 미들웨어를 제공해드림여 ㄷ ㄷ

## 과제

1. DB 설계하기
2. datagrip으로 데이터 채워넣고 실습하기

### +) 헷갈리는 조인 정리

- INNER JOIN = 교집합
- LEFT / RIGHT JOIN = 부분집합
- OUTER JOIN = 합집합 ) MYSQL은 없어서 LEFT + RIGHT JOIN 해야한다고 함
  -> [링크](https://pearlluck.tistory.com/46)
