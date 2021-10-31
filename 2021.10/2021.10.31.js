/*
https://programmers.co.kr/learn/courses/30/lessons/42628

이중우선순위큐
문제 설명

이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.

명령어	수신 탑(높이)
I 숫자	큐에 주어진 숫자를 삽입합니다.
D 1	큐에서 최댓값을 삭제합니다.
D -1	큐에서 최솟값을 삭제합니다.
이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.

제한사항

operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
operations의 원소는 큐가 수행할 연산을 나타냅니다.
원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.

입출력 예

operations	return
["I 16","D 1"]	[0,0]
["I 7","I 5","I -5","D -1"]	[7,5]
입출력 예 설명
16을 삽입 후 최댓값을 삭제합니다. 비어있으므로 [0,0]을 반환합니다.
7,5,-5를 삽입 후 최솟값을 삭제합니다. 최대값 7, 최소값 5를 반환합니다.
*/

function solution(operations) {
  let queue = [];
  for (let op of operations) {
    if (op[0] === "I") {
      op = op.slice(2) - 0;
      queue.push(op);
    } else if (op === "D 1" && queue.length > 0) {
      const max = Math.max(...queue),
        idx = queue.indexOf(max);
      queue.splice(idx, 1);
    } else if (op === "D -1" && queue.length > 0) {
      const min = Math.min(...queue),
        idx = queue.indexOf(min);
      queue.splice(idx, 1);
    }
  }
  if (queue.length === 0) return [0, 0];
  queue.sort((a, b) => b - a);
  return [queue[0], queue[queue.length - 1]];
}
/*
문제에서는 힙을 이용해서 풀어야하는데

힙을 어떻게 해야할까 싶다가 그냥 삭제를 할 때 최대값, 최소값을 구한 뒤 삭제 해주는 방법으로 진행했다.

먼저 I가 첫번째 알파벳일 경우는 그냥 queue에 넣어줬고

D 1 일때는 최대값을 splice를 이용하여 빼주고

D -1 일때는 최소값을 splice를 이용해서 빼줬다.

그리고 마지막에 queue의 길이가 0이라면 [0,0]을 리턴해주고 그렇지 않다면
정렬 후 최대 값 최소 값 을 리턴해줬다.

다른 문제풀이를 보는데 while을 이용해서 최솟값에서 점점 올라가면서 숫자가 맞는 곳에 넣는 queue를 만드는 작업을 봤고 가장 적절하지 않을까 싶었다.

문제를 당장 해결하기 보다는 보다 어떻게 어떤 공식을 이용해서 풀어야하는지 알아야하는데 이게 생각보다 힘들다.
*/
