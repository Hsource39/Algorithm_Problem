/*
https://programmers.co.kr/learn/courses/30/lessons/12985

예상 대진표
문제 설명

△△ 게임대회가 개최되었습니다. 이 대회는 N명이 참가하고, 토너먼트 형식으로 진행됩니다. N명의 참가자는 각각 1부터 N번을 차례대로 배정받습니다. 그리고, 1번↔2번, 3번↔4번, ... , N-1번↔N번의 참가자끼리 게임을 진행합니다. 각 게임에서 이긴 사람은 다음 라운드에 진출할 수 있습니다. 이때, 다음 라운드에 진출할 참가자의 번호는 다시 1번부터 N/2번을 차례대로 배정받습니다. 만약 1번↔2번 끼리 겨루는 게임에서 2번이 승리했다면 다음 라운드에서 1번을 부여받고, 3번↔4번에서 겨루는 게임에서 3번이 승리했다면 다음 라운드에서 2번을 부여받게 됩니다. 게임은 최종 한 명이 남을 때까지 진행됩니다.

이때, 처음 라운드에서 A번을 가진 참가자는 경쟁자로 생각하는 B번 참가자와 몇 번째 라운드에서 만나는지 궁금해졌습니다. 게임 참가자 수 N, 참가자 번호 A, 경쟁자 번호 B가 함수 solution의 매개변수로 주어질 때, 처음 라운드에서 A번을 가진 참가자는 경쟁자로 생각하는 B번 참가자와 몇 번째 라운드에서 만나는지 return 하는 solution 함수를 완성해 주세요. 단, A번 참가자와 B번 참가자는 서로 붙게 되기 전까지 항상 이긴다고 가정합니다.

제한사항

N : 21 이상 220 이하인 자연수 (2의 지수 승으로 주어지므로 부전승은 발생하지 않습니다.)
A, B : N 이하인 자연수 (단, A ≠ B 입니다.)

입출력 예

N	A	B	answer
8	4	7	3
입출력 예 설명

입출력 예 #1
첫 번째 라운드에서 4번 참가자는 3번 참가자와 붙게 되고, 7번 참가자는 8번 참가자와 붙게 됩니다. 항상 이긴다고 가정했으므로 4번 참가자는 다음 라운드에서 2번이 되고, 7번 참가자는 4번이 됩니다. 두 번째 라운드에서 2번은 1번과 붙게 되고, 4번은 3번과 붙게 됩니다. 항상 이긴다고 가정했으므로 2번은 다음 라운드에서 1번이 되고, 4번은 2번이 됩니다. 세 번째 라운드에서 1번과 2번으로 두 참가자가 붙게 되므로 3을 return 하면 됩니다.
*/

function solution(n, a, b) {
  var answer = 0;
  let arr = new Array(n).fill(0);
  (arr[a - 1] = 1), (arr[b - 1] = 1);

  while (arr.length >= 2) {
    answer++;
    let tray = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] === 1 && arr[i + 1] === 1) {
        return answer;
      } else if (arr[i] === 1) tray.push(arr[i]);
      else if (arr[i + 1] === 1) tray.push(arr[i + 1]);
      else tray.push(arr[i]);
    }
    arr = tray;
  }
}

/*
먼저 모든 인원수의 배열을 만들고 a-1,b-1 인덱스의 요소를 1로 만들어줬다.
그리고 arr의 길이가 2일 때 까지(결승전까지) 줄이는 while 문을 만들어서
배열을 반복문으로 돌리면서 i번째와 i+1번째를 비교해서 둘다 1일 경우 answer값을 리턴해주고 그렇지 않을 경우 두개 중 하나라도 1이면 1인것을 넣어주고 둘다 0 일 경우 앞의 사람이 이긴다고 간주하여 앞사람만 넣어준 뒤 arr을 바꿔줬다.
문제 자체는 이걸로도 풀렸지만 다른 사람의 문제풀이 중 배워야겠다고 마음 먹은 풀이가 하나 있다.

function solution(n,a,b)
{
    let answer = 0;
    while(a !== b) {
        a = Math.ceil(a/2);
        b = Math.ceil(b/2);
        answer++;
    }

    return answer;
}
a와 b를 2로 나눈 뒤 올림을 해서 둘이 같아진다면 만나게 되는 내용인데 왜 이런걸 생각하지 못했을 까 아쉬움이 많이 남는다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/43163

단어 변환
문제 설명

두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

한 번에 한 개의 알파벳만 바꿀 수 있습니다.
words에 있는 단어로만 변환할 수 있습니다.
예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.
두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

제한사항

각 단어는 알파벳 소문자로만 이루어져 있습니다.
각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
begin과 target은 같지 않습니다.
변환할 수 없는 경우에는 0를 return 합니다.

입출력 예

begin	target	words	return
"hit"	"cog"	["hot", "dot", "dog", "lot", "log", "cog"]	4
"hit"	"cog"	["hot", "dot", "dog", "lot", "log"]	0

*/

function solution(begin, target, words) {
  var answer = 0;
  if (words.indexOf(target) === -1) return answer;
  let isUsed = new Array(words.length).fill(false);
  let canStack = (now, str) => {
    let count = 0;
    for (let j = 0; j < str.length; j++) {
      if (now[j] === str[j]) count++;
    }
    return count;
  };

  const dfs = (begin, c = 0) => {
    for (let i = 0; i < words.length; i++) {
      if (isUsed[i] === false) {
        let checkT = canStack(begin, target);
        if (checkT + 1 === begin.length) return c + 1;

        let checkN = canStack(begin, words[i]);
        if (checkN + 1 === begin.length) {
          isUsed[i] = true;
          return dfs(words[i], c + 1);
        }
      }
    }
  };
  answer = dfs(begin);
  return answer;
}

/*
DFS를 이용하여 문제를 풀었다.
먼저 words에 target이 없다면 문제를 해결할 수 없기 때문에 indexOf를 이용하여 target이 없다면 바로 0을 리턴해줬다.

그 뒤 dfs를 돌리기 위한 사용했는지 여부 배열을 만든 뒤 다음 단계로 나아갈 수 있는 지를 확인하는 함수 canStack을 만들었다. canStack은 두개의 문자열의 같은게 몇개인지 세는 함수이다.
그 뒤로 재귀를 이용해서 파라미터 begin과 target을 canStack 함수로 확인해서 일치하는 개수가 1개밖에 차이나지 않는다면 파라미터 c를 리턴해주고 그렇지 않다면 반복문을 사용하여 words 요소와 begin 을 비교 해서 일치하는 개수가 1개밖에 차이나지 않을 경우에 사용 여부를 true로 바꿔준 뒤 재귀함수를 이용하여 파라미터에 비교했던 words의 요소를 넣어주고 c 값에 1을 더해서 리턴해줬다.


*/
