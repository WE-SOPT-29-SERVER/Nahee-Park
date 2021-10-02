/* json : 자바스크립트 객체 표현식, js는 아니기 때문에 함수를 넣을 순 없다. 오로지 데이터만 갖고 있음 + key값이 무조건 ""로 묶여있어야 한다
-> JS object와 혼동하지 말 것
*/

//이건 js 객체, JSON.stringify(sopt)를 통해 json string으로 변환 가능
const sopt = {
  name: "WE SOPT",
  slogan: "우리가 SOPT입니다",
  part: ["plan", "design", "android", "iOS", "server", "web"],
  number: 199,
  printName: function () {
    console.log("name : ", this.name);
  },
  printNum: function () {
    console.log("number : ", this.number);
  },
};

console.log("typeof sopt : " + typeof sopt);

console.log("1. sopt : " + sopt); //[object object]
console.log("2. sopt : ", sopt); // js object형태로 출력
console.log("sopt :" + JSON.stringify(sopt)); //js object를 json string으로 변환(함수는 자동으로 사라짐)
//일반적으로 JSON.stringify를 쓰는 경우) http에서 메시지가 문자열로 전송되기 때문에 이걸 이용해 json string으로 변환
//JSON타입 그 자체는 서버와 클라이언트가 데이터를 주고 받을 때 사용한다.

sopt.printName();
sopt.number = 190;
sopt.printNum();

const dogs = [
  { name: "식빵", family: "웰시코기", age: 1, weight: 2.14 },
  { name: "콩콩", family: "포메라니안", age: 3, weight: 2.5 },
  { name: "두팔", family: "푸들", age: 7, weight: 3.1 },
];

console.log("dogs : " + dogs);
console.log("dogs : ", dogs);
console.log("dogs :" + JSON.stringify(dogs));

dogs.forEach((dog) =>
  console.log(
    dog.name +
      "이는 종이 " +
      dog.family +
      "이고, 나이가 " +
      dog.age +
      "세입니다 ~"
  )
);
