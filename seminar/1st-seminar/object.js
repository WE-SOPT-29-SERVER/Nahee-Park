//객체 생성
const person = new Object();

//프로퍼티 추가
person.name = "roxie"; //점 표기법
person.part = "Server";
person["group"] = "YB"; //브라켓 표기법
// person.sayHello = () => {
//   console.log(`안녕하세요 ${this.name}입니다.`);
// };
person.sayHello = function () {
  console.log(`안녕하세요 ${this.name} 입니다.`);
};

console.log(typeof person);
console.log(person);

person.sayHello();

console.log("=====================");

/* 객체 리터럴 (가장 일반적인 자바스크립트의 객체 생성 방식) */
const emptyObject = {};

const animal = {
  animalType: "dog",
  animalName: "뽀삐",
  animalFriends: ["코코", "초코", "쿠키"],
  bark: function () {
    console.log(`${this.animalName} : 멍멍 `);
  },
  /*  thisFriends: function () {
    this.animalFriends.forEach(friend => {
      console.log(`${this.animalName}의 친구: ${friend}`);
    }); 
    과 아래의 코드가 같음
    화살표함수로 사용하려면 파라미터로 받아오면 됨
  */
  thisFriends: (animalFriends) => {
    animalFriends.forEach((friend) => {
      //this 못씀
      console.log(`${animal.animalName}의 친구: ${friend}`);
    });
  },
};

console.log(animal);
animal.bark();
animal.thisFriends(animal.animalFriends);
