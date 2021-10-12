/*
https://programmers.co.kr/learn/courses/30/lessons/12900

2 x n 타일링
문제 설명

가로 길이가 2이고 세로의 길이가 1인 직사각형모양의 타일이 있습니다. 이 직사각형 타일을 이용하여 세로의 길이가 2이고 가로의 길이가 n인 바닥을 가득 채우려고 합니다. 타일을 채울 때는 다음과 같이 2가지 방법이 있습니다.

타일을 가로로 배치 하는 경우
타일을 세로로 배치 하는 경우
예를들어서 n이 7인 직사각형은 다음과 같이 채울 수 있습니다.



직사각형의 가로의 길이 n이 매개변수로 주어질 때, 이 직사각형을 채우는 방법의 수를 return 하는 solution 함수를 완성해주세요.

제한사항

가로의 길이 n은 60,000이하의 자연수 입니다.
경우의 수가 많아 질 수 있으므로, 경우의 수를 1,000,000,007으로 나눈 나머지를 return해주세요.

입출력 예

n	result
4	5

*/

function solution(n) {
  let arr = [1, 2];
  for (let i = 0; i < n; i++) {
    arr.push((arr[i] + arr[i + 1]) % 1000000007);
  }
  return arr[n - 1];
}

function solution(n) {
  let arr = [1, 2];
  const recursion = (count = 2) => {
    arr.push((arr[count - 2] + arr[count - 1]) % 1000000007);
    if (count === n) {
      return;
    }
    recursion(count + 1);
  };
  if (n === 1 || n === 2) {
    return arr[n - 1];
  } else {
    recursion();
    return arr[n - 1];
  }
}

/*
가장 처음에는 메모제이션을 이용한 재귀로 문제를 해결하고자 했다.

하지만 효율성 테스트에서 모두 틀렸고 재귀를 사용하는게 문제인가 싶어서 하나씩 추가해주는 방법으로 진행을 해서 해결할 수 있었다.
*/
