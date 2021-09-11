/*
https://programmers.co.kr/learn/courses/30/lessons/12951

JadenCase 문자열 만들기
문제 설명

JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

제한 조건

s는 길이 1 이상인 문자열입니다.
s는 알파벳과 공백문자(" ")로 이루어져 있습니다.
첫 문자가 영문이 아닐때에는 이어지는 영문은 소문자로 씁니다. ( 첫번째 입출력 예 참고 )

입출력 예

s	return
"3people unFollowed me"	"3people Unfollowed Me"
"for the last week"	"For The Last Week"

*/

function solution(s) {
  var answer = "";
  let arr = [];
  s = s.toLowerCase().split(" ");
  s.forEach((el) => {
    arr.push(el.substring(0, 1).toUpperCase() + el.substring(1));
  });
  answer = arr.join(" ");
  return answer;
}

/*
먼저 모든 문자열을 소문자로 만들어 준 뒤 문자열의 0번째 인덱스를 대문자로 바꿔주고 나머지 문자열과 합쳐서 배열에 넣어준다. 그 뒤에 .join(" ") 을 이용하여 리턴해준다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/12953

N개의 최소공배수
문제 설명

두 수의 최소공배수(Least Common Multiple)란 입력된 두 수의 배수 중 공통이 되는 가장 작은 숫자를 의미합니다. 예를 들어 2와 7의 최소공배수는 14가 됩니다. 정의를 확장해서, n개의 수의 최소공배수는 n 개의 수들의 배수 중 공통이 되는 가장 작은 숫자가 됩니다. n개의 숫자를 담은 배열 arr이 입력되었을 때 이 수들의 최소공배수를 반환하는 함수, solution을 완성해 주세요.

제한 사항

arr은 길이 1이상, 15이하인 배열입니다.
arr의 원소는 100 이하인 자연수입니다.

입출력 예

arr	result
[2,6,8,14]	168
[1,2,3]	6

*/

function solution(arr) {
  var answer = 0;
  let lcm = 1;

  while (answer === 0) {
    let check = [];
    for (let el of arr) {
      if (lcm % el === 0) {
        check.push(el);
      }
    }
    if (check.length === arr.length) answer = lcm;
    else lcm++;
  }

  return answer;
}

/*
1부터 arr의 요소로 나눌 때 나머지가 0이 된다면 배열에 넣고 arr 배열과 check배열의 길이가 같을 때의 숫자를 리턴해줬다.
*/
