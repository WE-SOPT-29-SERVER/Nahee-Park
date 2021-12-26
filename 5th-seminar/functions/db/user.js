// usef테이블과 상호작용하는 파일을 user.js에 정의해줌
const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllUsers = async (client) => {
  // deleted되지 않은 애들만 가져오겠다는 그런
  // "user"인 이유는 user는 예약된 이름이기 때문에
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE is_deleted = FALSE
    `,
  );
  // 결과를 받고 싶으니까 return함 근데 스네이크케이스 킹받으므로
  return convertSnakeToCamel.keysToCamel(rows);
};

const getUserById = async (client, userId) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적습니다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 됩니다!
    // 이렇게 하면 변수가 들어갈 곳에 sql문을 넣는 경우들을 걸러줌
    [userId],
  );
  // 위의 getAllUsers와는 달리, 이번에는 유저 하나만 가져오고 싶기 때문에 rows[0]만 리턴해 줍니다.
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUserByIdFirebase = async (client, idFirebase) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id_firebase = $1
      AND is_deleted = FALSE
    `,
    [idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUserByEmail = async (client, email) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE email = $1
      AND is_deleted = FALSE
    `,
    [email],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updateUser = async (client, username, phone, userId) => {
  // 1. 원래 객체를 먼저 불러온다
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "user"
    WHERE id = $1
       AND is_deleted = FALSE
    `,
    [userId],
  );

  // 없는 유저면 false로 return
  if (existingRows.length === 0) return false;

  // lodash의 메소드 merge를 이용. 왼쪽부터 보면서 겹치는 키가 있으면 바꾸고, 겹치는 키가 없으면 냅둔다. (무조건 대입하고 보는 게 아니라!)
  // 무조건 Camel케이스로 바꿔서 비교
  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });

  // 그냥 이것만 쓰면 phone이 null값일 때 undefined가 들어가버림
  // 그래서 merge로 재정의한 data값을 넣어준다
  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET username = $1, phone = $2, updated_at = now()
    WHERE id = $3
    RETURNING * 
    `,
    [data.username, data.phone, userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deleteUser = async (client, userId) => {
  // soft delete를 수행해야 하므로
  // WHERE문을 무조건 써줘야함. 안그러면 모든 row사라지는 대참사. delete할 땐 WHERE 또 또 검토하기
  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET is_deleted = TRUE, updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addUser = async (client, email, username, phone, idFirebase) => {
  const { rows } = await client.query(
    `
    INSERT INTO mockup_user
    (email, username, phone id_firebase)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `,

    [email, username, phone, idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllUsers, getUserById, getUserByIdFirebase, getUserByEmail, updateUser, deleteUser, addUser };
