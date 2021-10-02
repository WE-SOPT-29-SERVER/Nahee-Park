/*
1. 함수 선언식 ) function exam(params){} 이런 식으로 함수를 선언 
-> 호이스팅 영향 받음 
2. 함수 표현식 ) 변수에 함수를 담음 
-> 호이스팅의 영향을 받지 않음
*/

//함수 선언식 실습
function add(x, y) {
  return x + y;
}
console.log(add(2, 3));

//함수 표현식 실습
const addStr = function (x, y) {
  return x + y;
};
console.log(addStr("안녕", "하세요"));

//함수 표현식 실습 - 화살표 함수
const add = (x, y) => x + y;
const square = (x) => x * x;

//아래 두 코드는 같은 코드임
// 화살표 함수 ver
const person = (name, age) => ({ name: name, age: age });
// 일반 함수 ver
const person = function (name, age) {
  return {
    name: name,
    age: age,
  };
};
