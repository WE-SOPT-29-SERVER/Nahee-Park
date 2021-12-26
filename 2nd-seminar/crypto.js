const crypto = require("crypto");

const password = "qwerty";
//base16
const hex = crypto.createHash("sha512").update(password).digest("hex");
//base64 더 짧게 표현됨
const base64 = crypto.createHash("sha512").update(password).digest("base64");

const salt = "QxLUF1bglAdeQXbv5PehSMfV11CdYYLmfY6lehjZMQ";
const iterations = 100000;
const keylen = 64;
const digest = "sha512";
const callback = (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString("hex"));
};
crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);

//비밀번호 암호화
const encrypt = (salt, password) => {
  //비번, 솔트값 string, 반복 횟수, 출력 바이트, 해시 알고리즘, 콜백
  crypto.pbkdf2(
    password,
    salt.toString(),
    1,
    32,
    "sha512",
    (err, derivedKey) => {
      if (err) throw err;
      const hashed = derivedKey.toString("hex");
      console.log("salt : ", salt);
      console.log("hashed : ", hashed);
    }
  );
};

//비밀번호
const password2 = "fl0wer";
//임의의 문자열 salt
const salt2 = crypto.randomBytes(32).toString("hex");
encrypt(salt2, password2);
