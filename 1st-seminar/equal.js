const num = 1;
const str = "1";

//동등 연산자 : 값만 비교 (특별한 상황에서만 쓰임)
// == <-> !=
console.log(num == str);
// 동적타이핑이라 맘대로 타입 바꿔서 계산해버림
console.log(typeof (num + str));

console.log(String(num) + String(str));
console.log(typeof (String(num) + String(str)));

// 일치 연산자 : 값과 타입 비교 (대부분의 경우에는 이것이 안전하다!)
// === <-> !==
console.log(num === str);

/* 
우리가 사용할 db에서는 숫자와 문자열 구분을 안함
"1"===1 //자스에서는 false
자스는 명확하지 않음 .. 명확하게 하고자하면 타입 지정을 해주어야
*/
