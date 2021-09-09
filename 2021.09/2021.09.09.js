/*
https://programmers.co.kr/learn/courses/30/lessons/12911

다음 큰 숫자
문제 설명
자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.

조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.

자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.

제한 사항
n은 1,000,000 이하의 자연수 입니다.
입출력 예
n	result
78	83
15	23
입출력 예 설명
입출력 예#1
문제 예시와 같습니다.
입출력 예#2
15(1111)의 다음 큰 숫자는 23(10111)입니다.
*/
function solution(n) {
  var answer = 0;
  let howMuchN = howMuch(n);
  while (answer === 0) {
    n++;
    let newNum = howMuch(n);
    if (howMuchN === newNum) answer = n;
  }

  return answer;
}
const howMuch = (n) => {
  let two = String(n.toString(2));
  let answer = 0;
  for (let i = 0; i < two.length; i++) {
    if (two[i] === "1") answer++;
  }
  return answer;
};

/*
이진수로 나타내는 법이 숫자.toString(2) 라는 것을 처음 알았다.
먼저 n의 2진수의 1의 개수를 구한 뒤
n이 1씩 올라가면서 이진수를 구하고 그 이진수의 1과 n의 2진수의 1의 개수가 같으면 n에서 1씩 올라간 수를 리턴해준다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/12939

최댓값과 최솟값
문제 설명
문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요.
예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

제한 조건
s에는 둘 이상의 정수가 공백으로 구분되어 있습니다.
입출력 예
s	return
"1 2 3 4"	"1 4"
"-1 -2 -3 -4"	"-4 -1"
"-1 -1"	"-1 -1"
*/

function solution(s) {
  let arr = s.split(" ");
  arr = arr.map((el) => Number(el)).sort((a, b) => a - b);

  return arr[0] + " " + arr[arr.length - 1];
}
