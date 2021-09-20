/*
https://programmers.co.kr/learn/courses/30/lessons/12945

피보나치 수
문제 설명

피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.

예를들어

F(2) = F(0) + F(1) = 0 + 1 = 1
F(3) = F(1) + F(2) = 1 + 1 = 2
F(4) = F(2) + F(3) = 1 + 2 = 3
F(5) = F(3) + F(4) = 2 + 3 = 5
와 같이 이어집니다.

2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.

제한 사항

n은 1이상, 100000이하인 자연수입니다.
입출력 예

n	return
3	2
5	5
입출력 예 설명

피보나치수는 0번째부터 0, 1, 1, 2, 3, 5, ... 와 같이 이어집니다.


*/

function solution(n) {
  var answer = 0;
  let arr = [0, 1];

  if (n < 2) {
    return arr[n];
  } else {
    for (let i = 2; i <= n; i++) {
      arr.push((arr[i - 1] + arr[i - 2]) % 1234567);
    }
  }
  answer = arr[n];

  return answer;
}

/*
부트캠프에서 배운 메모제이션을 활용한 재귀로 문제를 풀었었지만 런타임 오류가 나서 문제 푸는데 실패했다.
그래서 재귀가 아니라 그냥 반복문을 활용하여 문제를 풀었다.
n이 0,1 일 경우 각각 0과 1을 리턴해주고 2이상일 경우 전전 수와 전 수를 더해서 배열에 넣어주고 마지막에 배열의 n번째 인덱스를 넣어주면 정답이 나오게 된다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/12914

멀리 뛰기
문제 설명

효진이는 멀리 뛰기를 연습하고 있습니다. 효진이는 한번에 1칸, 또는 2칸을 뛸 수 있습니다. 칸이 총 4개 있을 때, 효진이는
(1칸, 1칸, 1칸, 1칸)
(1칸, 2칸, 1칸)
(1칸, 1칸, 2칸)
(2칸, 1칸, 1칸)
(2칸, 2칸)
의 5가지 방법으로 맨 끝 칸에 도달할 수 있습니다. 멀리뛰기에 사용될 칸의 수 n이 주어질 때, 효진이가 끝에 도달하는 방법이 몇 가지인지 알아내, 여기에 1234567를 나눈 나머지를 리턴하는 함수, solution을 완성하세요. 예를 들어 4가 입력된다면, 5를 return하면 됩니다.

제한 사항

n은 1 이상, 2000 이하인 정수입니다.

입출력 예

n	result
4	5
3	3
입출력 예 설명

입출력 예 #1
위에서 설명한 내용과 같습니다.

입출력 예 #2
(2칸, 1칸)
(1칸, 2칸)
(1칸, 1칸, 1칸)
총 3가지 방법으로 멀리 뛸 수 있습니다.
*/

function solution(n) {
  var answer = 0;
  let arr = [1, 2];

  if (n < 2) {
    return arr[n - 1];
  } else {
    for (let i = 2; i <= n; i++) {
      arr.push((arr[i - 1] + arr[i - 2]) % 1234567);
    }
  }
  answer = arr[n - 1];
  return answer;
}

//전 문제인 피보나치와 다른 점이 없는 문제 였다. 인덱스만 한 칸씩 낮아지고 다른것은 다 똑같다.
