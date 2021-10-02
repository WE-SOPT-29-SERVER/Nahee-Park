var variableVar = "123";
// 재선언 불가, 재할당 가능
let variableVar = "321";
console.log("variableVar", variableVar);

// 재선언,재할당 불가
const variableConst = "123";
const variableConst = "321";
console.log("variableConst", variableConst);

// 이렇게만 선언 가능, 나중에 재할당 할 수 있기 때문
var someVer;
let someLet;
// 얘는 에러남 -> 실행해봐야 안다 . . 
const someConst;