console.log(typeof 1);
console.log(typeof "str");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof Symbol());
// 원시타입인데 타입을 찍어보면 객체임 - 버그임 ㅋ
console.log(typeof null);

console.log("null === undefined", null === undefined); // false
console.log("null==undifined", null == undefined); // true
