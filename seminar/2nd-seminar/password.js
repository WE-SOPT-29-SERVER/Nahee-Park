/*password.txt 읽어와서 crypto 모듈로 암호화 hashed.txt 작성 */
const crypto = require("crypto");
// async await 쓰고 싶어서 사용
const fs = require("fs").promises;

// 읽어온 애 암호화해서 file작성
const encrypt = (salt, password) => {
  crypto.pbkdf2(
    password,
    salt.toString(),
    1,
    32,
    "sha512",
    (err, derivedKey) => {
      if (err) throw err;
      const hashed = derivedKey.toString("hex");
      fs.writeFile("hashed.txt", hashed);
    }
  );
};

// main
const main = async () => {
  // 비동기적으로 패스워드 읽어옴
  const readPassword = await fs.readFile("seminar/2nd-seminar/password.txt");
  //   받아온 password , 임의의 salt값으로 암호화
  const salt = crypto.randomBytes(32).toString("hex");
  const password = readPassword.toString();
  encrypt(salt, password);
};

main();
