const num1 = 1;
const num2 = 2;
const str = "2";

// num2 과 str 비교하면 2 -> "2"가 됨

const bool = true;

console.log(num1 == bool);
//true
// 1 == true ,  false == 0

/*
JS의 값엔 대충 true인 애, 대충 false인 애 

대충 false ) false, 0, null, undefined, ''
대충 true ) 정수, str, true, [], {}

어떤 값이 있는지 없는지를 boolean으로 타입캐스팅 할 수 있다는 것이 장점임
*/

//파라미터로 null vs undefined 무엇을 넘겨야 하는가 -> 쿼리문 할 때 undefined 쓰지 말라

//postgresql
const query = `
    UPDATE post
    SET name = ${null} //NULL 
    WHERE id =1
`;
const query1 = `
    UPDATE post
    SET name = ${undefined}
    WHERE id =1
`;
