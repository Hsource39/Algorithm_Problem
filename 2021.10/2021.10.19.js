/*https://programmers.co.kr/learn/courses/30/lessons/81302

거리두기 확인하기
문제 설명

개발자를 희망하는 죠르디가 카카오에 면접을 보러 왔습니다.

코로나 바이러스 감염 예방을 위해 응시자들은 거리를 둬서 대기를 해야하는데 개발 직군 면접인 만큼
아래와 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있습니다.

대기실은 5개이며, 각 대기실은 5x5 크기입니다.
거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.

5개의 대기실을 본 죠르디는 각 대기실에서 응시자들이 거리두기를 잘 기키고 있는지 알고 싶어졌습니다. 자리에 앉아있는 응시자들의 정보와 대기실 구조를 대기실별로 담은 2차원 문자열 배열 places가 매개변수로 주어집니다. 각 대기실별로 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

제한사항

places의 행 길이(대기실 개수) = 5
places의 각 행은 하나의 대기실 구조를 나타냅니다.
places의 열 길이(대기실 세로 길이) = 5
places의 원소는 P,O,X로 이루어진 문자열입니다.
places 원소의 길이(대기실 가로 길이) = 5
P는 응시자가 앉아있는 자리를 의미합니다.
O는 빈 테이블을 의미합니다.
X는 파티션을 의미합니다.
입력으로 주어지는 5개 대기실의 크기는 모두 5x5 입니다.
return 값 형식
1차원 정수 배열에 5개의 원소를 담아서 return 합니다.
places에 담겨 있는 5개 대기실의 순서대로, 거리두기 준수 여부를 차례대로 배열에 담습니다.
각 대기실 별로 모든 응시자가 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 담습니다.

입출력 예

places	result
[["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]	[1, 0, 1, 1, 1]
*/

function solution(places) {
  var answer = [];
  places.forEach(room => {
    room.forEach(place => (place += "XX"));
    room.push("XXXXXXX");
    room.push("XXXXXXX");
    let isTrue = true;
    for (let i = 0; i < 5; i++) {
      if (!isTrue) break;
      for (let j = 0; j < 5; j++) {
        if (room[i][j] === "P") {
          if (room[i + 1][j] === "P" || room[i][j + 1] === "P") {
            isTrue = false;
            break;
          }
          if (room[i + 2][j] === "P" && room[i + 1][j] === "O") {
            isTrue = false;
            break;
          }
          if (room[i][j + 2] === "P" && room[i][j + 1] === "O") {
            isTrue = false;
            break;
          }
          if (room[i + 1][j + 1] === "P") {
            if (room[i + 1][j] === "O" || room[i][j + 1] === "O") {
              isTrue = false;
              break;
            }
          }
          if (room[i + 1][j - 1] === "P") {
            if (room[i + 1][j] === "O" || room[i][j - 1] === "O") {
              isTrue = false;
              break;
            }
          }
        }
      }
    }
    isTrue === true ? answer.push(1) : answer.push(0);
  });
  return answer;
}
/*

문제 풀이 방식을 사람들의 좌표를 구하고 맨해튼 거리에 해당하는 좌표에 칸막이가 있는지 확인하는 방법을 사용하려고 했으나

머리가 부족해서 진행하지 못했다. 그래서 새롭게 문제를 푸는 방법은 사람'P'의 맨해튼 거리 안에 칸막이 없이 있는 사람이 있다면 0을 정답에 넣어주고 그렇지 않다면 1을 넣어주는 좀 무식한 방법을 이용했다.

조건은 총 5가지로
바로 옆에 있을 경우 (오른쪽,아래)
한 칸 떨어져서 있는 경우(오른쪽)(아래)
대각선으로 앉아 있는 경우(왼쪽아래)(오른쪽아래)

이렇게 5가지 경우로 나눠서 문제를 해결했다.

솔직히 더 잘 풀 수 있는 방법이 있을 것 같은데 생각을 해봐도 해답이 나오지 않아 답답했다.

profile

*/
