//original code
hoistFunction();

function hoistFunction() {
  console.log(x);
  var x = "var";
  console.log(x);
}

// JS engine이 해석한 코드 -> 선언부를 위로 끌어올림 ) 이게 호이스팅!
function hoistFunction() {
  var x;
  console.log(x);
  x = "var";
  console.log(x);
}
hoistFunction();

/* 호이스팅 -> 가급적 일어나지 않도록 하는 것이 좋다 ) 스코프꼬임 현상 발생할 수 있음. 선언 먼저하고 실행하면 웬만하면 에러 안 남.

var, 함수 -> 호이스팅 일어남
var말고 let, const 사용하기
 */
