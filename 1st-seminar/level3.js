/*
랜덤으로 조를 짜는 알고리즘 작성 
ob, yb 비율 오차범위 최소한으로 유지하며 코드 작성 
1. yb배열, ob배열 생성
2. 몇 개의 조를 짤 지 입력받기 
3. yb를 받은 값으로 나누고, ob를 받은 값으로 나눠서 그 수만큼 랜덤 뽑기 + 새로운 배열 생성
4. 나머지 인원은 그냥 한 팀에 몰아넣기
5. 결과값 배열 리턴 

*/

//입력받기 위한 모듈
const readline = require('readline');
const members = require('../assignment/1st-assignment/members');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on('line', function (line) {
  //  line을 통해서 사용자가 입력한 문자열 받음
  input = line;
  //정수형태로 사용할려면 parseInt로 형변환 필요
  input = parseInt(line);
  //한줄을 받고 입력 종료
  rl.close();
}).on('close', function () {
  // 입력 받은 값을 이용해 실행시킬 함수
  getGroup(input);
  process.exit();
});

const getGroup = (input) => {
  const YB = [];
  const OB = [];

  //OB,YB 분류
  members.map((member) => {
    member.group == 'OB' ? OB.push(member) : YB.push(member);
  });

  //한 팀에 들어갈 YB, OB숫자 저장, 남은 인원은 랜덤조에 넣을 거임
  const YB_num = Math.floor(YB.length / input);
  const OB_num = Math.floor(OB.length / input);

  const YB_random = [];
  const OB_random = [];

  for (let i = 0; i < input; i++) {}
  // YB.length
  while (YB.length > 0) {
    let randomYB = YB.splice(Math.floor(Math.random() * YB.length), 1)[0];
    let randomOB = OB.splice(Math.floor(Math.random() * OB.length), 1)[0];
    YB_random.push(randomNum);
  }
  console.log(YB);
  console.log(YB_random);
};
