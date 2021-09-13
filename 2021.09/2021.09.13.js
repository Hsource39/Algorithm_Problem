/*
https://programmers.co.kr/learn/courses/30/lessons/43162

네트워크
문제 설명
네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항
컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
computer[i][i]는 항상 1입니다.
입출력 예
n	computers	return
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1
*/

function solution(n, computers) {
  var answer = 0;
  let network = new Array(n).fill(false);
  let queue = [];
  const eq = (num) => queue.push(num),
    dq = () => queue.shift();

  for (let i = 0; i < n; i++) {
    if (network[i] === false) {
      eq(computers[i]);
      while (queue.length > 0) {
        let arr = dq();
        arr.forEach((el, j) => {
          if (el === 1 && network[j] === false && i !== j) {
            eq(computers[j]);
            network[j] = true;
          }
        });
      }
      answer++;
    }
  }
  return answer;
}

/*
dfs / bfs 문제
일단 문제는 너비 우선 탐색으로 풀었다.
먼저 큐를 만들고 n크기 만큼의 배열 요소에 false 값을 집어넣어준다.
n만큼 반복문을 돌리는데 배열 요소에 false 라면
while 문으로 큐를 돌려준다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/76502

괄호 회전하기
문제 설명
다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.

(), [], {} 는 모두 올바른 괄호 문자열입니다.
만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다. 예를 들어, [] 가 올바른 괄호 문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
만약 A, B가 올바른 괄호 문자열이라면, AB 도 올바른 괄호 문자열입니다. 예를 들어, {} 와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.
대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 이 s를 왼쪽으로 x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.

제한사항
s의 길이는 1 이상 1,000 이하입니다.
입출력 예
s	result
"[](){}"	3
"}]()[{"	2
"[)(]"	0
"}}}"	0
*/

function solution(s) {
  var answer = 0;
  if (s.length % 2 === 1) return 0;
  let queue = s.split("");

  for (let i = 0; i < s.length; i++) {
    if (check(queue)) answer++;
    let pop = queue.shift();
    queue.push(pop);
  }
  return answer;
}

const check = (str) => {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") stack.push(str[i]);
    if (str[i] === ")" && stack[stack.length - 1] === "(") stack.pop();
    else if (str[i] === ")") return false;
    if (str[i] === "{") stack.push(str[i]);
    if (str[i] === "}" && stack[stack.length - 1] === "{") stack.pop();
    else if (str[i] === "}") return false;
    if (str[i] === "[") stack.push(str[i]);
    if (str[i] === "]" && stack[stack.length - 1] === "[") stack.pop();
    else if (str[i] === "]") return false;
  }
  return true;
};

/*
먼저 문자열 s를 돌려주는 반복문을 만들고
문자열 s가 조건에 맞는지 확인하는 함수를 만들어서 
반복문을 돌리면서 트루일때 answer의 값에 1을 더해줬다.
*/
