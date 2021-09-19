/*
https://programmers.co.kr/learn/courses/30/lessons/12949

행렬의 곱셈
문제 설명

2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.

제한 조건

행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
곱할 수 있는 배열만 주어집니다.

입출력 예

arr1	arr2	return
[[1, 4], [3, 2], [4, 1]]	[[3, 3], [3, 3]]	[[15, 15], [15, 15], [15, 15]]
[[2, 3, 2], [4, 2, 4], [3, 1, 4]]	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]	[[22, 22, 11], [36, 28, 18], [29, 20, 14]]

*/

function solution(arr1, arr2) {
  let answer = [];
  let a = arr1.length;
  let b = arr2[0].length;

  for (let i = 0; i < a; i++) {
    let arr = [];
    for (let j = 0; j < b; j++) {
      arr.push(arr1[i].reduce((t, c, k) => t + c * arr2[k][j], 0));
    }
    answer.push(arr);
  }

  return answer;
}

/*
a행렬의 가로 와 b 행렬의 세로가 새로운 행렬의 형태인 것으로
문제의 a와 b 는 각각 가로와 세로의 새로운 행렬을 나타내고
arr1[i]의 요소와 arr2[k][j] 요소를 곱한 값을 더한 값을 b번 만큼 반복해서 배열 형태로 answer에 넣어주게 됐다.


*/
