SELECT * FROM "user";

/-- "user" 데이터의 개수 --/
SELECT COUNT(*) FROM "user";

/-- 둘의 차이를 비교해보세요~ --/
/-- 1. 오름차순 2. 내림차순 3. 특정 조건에 해당하는 필드만--/
SELECT username FROM "user" ORDER BY username;
SELECT username FROM "user" ORDER BY username DESC;
SELECT username, email FROM "user" WHERE id=5;

/-- INSERT 의 두 가지 방법 비교해보기 --/
-- 언제나 가능
INSERT INTO "user" (username, id_firebase, email, phone) VALUES ('Anne', 'sA75idsd34E', 'Anne@sopt.org', '010-738-8304');
-- 모든 필수데이터 다 넣어줬을 때에만 가능
INSERT INTO "user" VALUES ('Conan', 'h43Dgbg68fDF23', 'Conan@sopt.org', '010-766-2514');

/-- 특정 id를 갖고 있는 사용자의 이름 바꾸기 --/
UPDATE "user" SET username='gngsn' WHERE id=3;
SELECT * FROM "user" WHERE id=3;

/-- 특정 id를 갖고 있는 사용자를 지우기 --/
DELETE FROM "user" WHERE id=3;
SELECT * FROM "user" WHERE id=3;