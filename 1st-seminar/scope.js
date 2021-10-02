//function scope
//var
if (true) {
  var x = "var";
}
//var는 function scope이기 때문에 접근 가능
console.log(`var: ${x}`);

function colorFunction() {
  if (true) {
    var x = "var";
  }
  console.log(`var: ${x}`);
}

// 여기선 함수를 벗어났으므로 접근 불가능
console.log(`var: ${x}`);

//block scope
//let -> 블록단위(for문 내부 변수 등등)에서 유용
if (true) {
  let y = "let";
  //   접근 가능
  console.log(`let: ${let}`);
}
// 접근 불가능
console.log(`let: ${let}`);
