/*
https://programmers.co.kr/learn/courses/30/lessons/85002?language=javascript

복서 정렬하기
문제 설명
복서 선수들의 몸무게 weights와, 복서 선수들의 전적을 나타내는 head2head가 매개변수로 주어집니다. 복서 선수들의 번호를 다음과 같은 순서로 정렬한 후 return 하도록 solution 함수를 완성해주세요.

전체 승률이 높은 복서의 번호가 앞쪽으로 갑니다. 아직 다른 복서랑 붙어본 적이 없는 복서의 승률은 0%로 취급합니다.
승률이 동일한 복서의 번호들 중에서는 자신보다 몸무게가 무거운 복서를 이긴 횟수가 많은 복서의 번호가 앞쪽으로 갑니다.
자신보다 무거운 복서를 이긴 횟수까지 동일한 복서의 번호들 중에서는 자기 몸무게가 무거운 복서의 번호가 앞쪽으로 갑니다.
자기 몸무게까지 동일한 복서의 번호들 중에서는 작은 번호가 앞쪽으로 갑니다.
제한사항
weights의 길이는 2 이상 1,000 이하입니다.
weights의 모든 값은 45 이상 150 이하의 정수입니다.
weights[i] 는 i+1번 복서의 몸무게(kg)를 의미합니다.
head2head의 길이는 weights의 길이와 같습니다.
head2head의 모든 문자열은 길이가 weights의 길이와 동일하며, 'N', 'W', 'L'로 이루어진 문자열입니다.
head2head[i] 는 i+1번 복서의 전적을 의미하며, head2head[i][j]는 i+1번 복서와 j+1번 복서의 매치 결과를 의미합니다.
'N' (None)은 두 복서가 아직 붙어본 적이 없음을 의미합니다.
'W' (Win)는 i+1번 복서가 j+1번 복서를 이겼음을 의미합니다.
'L' (Lose)는 i+1번 복사가 j+1번 복서에게 졌음을 의미합니다.
임의의 i에 대해서 head2head[i][i] 는 항상 'N'입니다. 자기 자신과 싸울 수는 없기 때문입니다.
임의의 i, j에 대해서 head2head[i][j] = 'W' 이면, head2head[j][i] = 'L'입니다.
임의의 i, j에 대해서 head2head[i][j] = 'L' 이면, head2head[j][i] = 'W'입니다.
임의의 i, j에 대해서 head2head[i][j] = 'N' 이면, head2head[j][i] = 'N'입니다.
입출력 예
weights	head2head	result
[50,82,75,120]	["NLWL","WNLL","LWNW","WWLN"]	[3,4,1,2]
[145,92,86]	["NLW","WNL","LWN"]	[2,3,1]
[60,70,60]	["NNN","NNN","NNN"]	[2,1,3]
입출력 예 설명
입출력 예 #1

다음은 선수들의 정보를 나타낸 표입니다.
선수 번호	vs 1번	vs 2번	vs 3번	vs 4번	승률	자기보다 무거운 복서를 이긴 횟수	몸무게
1번	-	패배	승리	패배	33.33%	1회	50kg
2번	승리	-	패배	패배	33.33%	0회	82kg
3번	패배	승리	-	승리	66.66%	2회	75kg
4번	승리	승리	패배	-	66.66%	0회	120kg
본문에 서술된 우선순위를 따라 [3,4,1,2] 를 return 합니다.
입출력 예 #2

다음은 선수들의 정보를 나타낸 표입니다.
선수 번호	vs 1번	vs 2번	vs 3번	승률	자기보다 무거운 복서를 이긴 횟수	몸무게
1번	-	패배	승리	50%	0회	145kg
2번	승리	-	패배	50%	1회	92kg
3번	패배	승리	-	50%	1회	86kg
본문에 서술된 우선순위를 따라 [2,3,1] 을 return 합니다.
입출력 예 #3

다음은 선수들의 정보를 나타낸 표입니다.
선수 번호	vs 1번	vs 2번	vs 3번	승률	자기보다 무거운 복서를 이긴 횟수	몸무게
1번	-	-	-	0% (무전적)	0회	60kg
2번	-	-	-	0% (무전적)	0회	70kg
3번	-	-	-	0% (무전적)	0회	60kg
본문에 서술된 우선순위를 따라 [2,1,3] 을 return 합니다.
*/

function solution(weights, head2head) {
  var answer = [];
  let n = weights.length;
  let person = weights.map((el, i) => {
    return { index: i, weight: el, winOver: 0, winRate: 0 };
  });

  for (let i = 0; i < n; i++) {
    let totalCount = 0;
    let winCount = 0;
    for (let j = 0; j < n; j++) {
      if (head2head[i][j] === "W") {
        winCount++;
        if (weights[i] < weights[j]) person[i]["winOver"] += 1;
      }
      if (head2head[i][j] !== "N") totalCount++;
    }
    totalCount === 0
      ? (person[i]["winRate"] = 0)
      : (person[i]["winRate"] = winCount / totalCount);
  }

  person = person.sort((a, b) => {
    if (a.winRate !== b.winRate) {
      return b.winRate - a.winRate;
    } else {
      if (a.winOver !== b.winOver) {
        return b.winOver - a.winOver;
      } else {
        if (a.weight !== b.weight) {
          return b.weight - a.weight;
        } else {
          return a.index - b.index;
        }
      }
    }
  });
  console.log(person);
  person.forEach((el) => answer.push(el.index + 1));

  return answer;
}

/*
일단 큰 오해가 하나 있었다. 그냥 등수를 나타내야되는걸로 착각을 해서 (예제1번이 정확히 등수를 표현하고 있어서 ㅋㅋ...) 등수로 계산했다가 다틀림

그래서 질문했는데 알고보니 등수를 정렬하는거지/ 등수를 나타내는게 아니었다.
그래서 체중미만 승리와 승률을 계산한것은 그대로 사용했고 person이라는 객체를 만들어내서 각각을 넣어준 뒤 sort를 이용해서 승률 / 체중미만 승리 / 체중 / 앞번호 순을 정렬해줬다.


*/
