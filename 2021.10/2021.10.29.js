/*
https://programmers.co.kr/learn/courses/30/lessons/49994

방문 길이
문제 설명

게임 캐릭터를 4가지 명령어를 통해 움직이려 합니다. 명령어는 다음과 같습니다.

U: 위쪽으로 한 칸 가기

D: 아래쪽으로 한 칸 가기

R: 오른쪽으로 한 칸 가기

L: 왼쪽으로 한 칸 가기

캐릭터는 좌표평면의 (0, 0) 위치에서 시작합니다. 좌표평면의 경계는 왼쪽 위(-5, 5), 왼쪽 아래(-5, -5), 오른쪽 위(5, 5), 오른쪽 아래(5, -5)로 이루어져 있습니다.



예를 들어, "ULURRDLLU"로 명령했다면



1번 명령어부터 7번 명령어까지 다음과 같이 움직입니다.


8번 명령어부터 9번 명령어까지 다음과 같이 움직입니다.


이때, 우리는 게임 캐릭터가 지나간 길 중 캐릭터가 처음 걸어본 길의 길이를 구하려고 합니다. 예를 들어 위의 예시에서 게임 캐릭터가 움직인 길이는 9이지만, 캐릭터가 처음 걸어본 길의 길이는 7이 됩니다. (8, 9번 명령어에서 움직인 길은 2, 3번 명령어에서 이미 거쳐 간 길입니다)

단, 좌표평면의 경계를 넘어가는 명령어는 무시합니다.

예를 들어, "LULLLLLLU"로 명령했다면



1번 명령어부터 6번 명령어대로 움직인 후, 7, 8번 명령어는 무시합니다. 다시 9번 명령어대로 움직입니다.

이때 캐릭터가 처음 걸어본 길의 길이는 7이 됩니다.

명령어가 매개변수 dirs로 주어질 때, 게임 캐릭터가 처음 걸어본 길의 길이를 구하여 return 하는 solution 함수를 완성해 주세요.

제한사항

dirs는 string형으로 주어지며, 'U', 'D', 'R', 'L' 이외에 문자는 주어지지 않습니다.
dirs의 길이는 500 이하의 자연수입니다.

입출력 예

dirs	answer
"ULURRDLLU"	7
"LULLLLLLU"	7
*/

function solution(dirs) {
  var answer = 0;
  let location = [0, 0];
  const road = [];

  for (let i = 0; i < dirs.length; i++) {
    let perv = location.slice();
    let move = false;
    if (dirs[i] === "U" && location[0] > -5) {
      location[0] -= 1;
      move = true;
    }
    if (dirs[i] === "D" && location[0] < 5) {
      location[0] += 1;
      move = true;
    }
    if (dirs[i] === "R" && location[1] < 5) {
      location[1] += 1;
      move = true;
    }
    if (dirs[i] === "L" && location[1] > -5) {
      location[1] -= 1;
      move = true;
    }
    if (move) {
      road.push(`${location},${perv}`);
      road.push(`${perv},${location}`);
    }
  }
  let roads = new Set(road);
  answer = roads.size / 2;
  return answer;
}
//양방향으로 길이 있다는 가정을 하고 이동할 때 모든 양방향의 길을 road에 넣어준 뒤 set을 이용해 중복된 길을 없애주고 양방향이었기 때문에 2를 나눠주면 정답이 나온다.
