/* Level2
자신의 조원들을 소개할 수 있는 json array만들기
팀원들 이름, 사는 곳, 나이, 취미 출력 함수 포함 */
const group = {
  members: [
    { name: "박나희", station: "혜화", age: 22, hobby: "배드민턴 치기" },
    { name: "설지원", station: "왕십리", age: 23, hobby: "자기" },
    { name: "이다은", station: "혜화", age: 22, hobby: "틱구 치기" },
    { name: "채정아", station: "동대문", age: 19, hobby: "방탈출 하기" },
  ],
};

console.log("저희 조원들을 소개합니다!");

group.members &&
  group.members.map((member) => {
    console.log(
      `이름은 ${member.name}이고 ${member.station}에 살고, 나이는 ${member.age}, 취미는 ${member.hobby}입니다`
    );
  });
