/* https://programmers.co.kr/learn/courses/30/lessons/77484
로또의 최고 순위와 최저 순위 구하기 */

/*
로또의 최고 순위와 최저 순위
문제 설명
로또 6/45(이하 '로또'로 표기)는 1부터 45까지의 숫자 중 6개를 찍어서 맞히는 대표적인 복권입니다. 아래는 로또의 순위를 정하는 방식입니다. 1

순위	당첨 내용
1	6개 번호가 모두 일치
2	5개 번호가 일치
3	4개 번호가 일치
4	3개 번호가 일치
5	2개 번호가 일치
6(낙첨)	그 외
로또를 구매한 민우는 당첨 번호 발표일을 학수고대하고 있었습니다. 하지만, 민우의 동생이 로또에 낙서를 하여, 일부 번호를 알아볼 수 없게 되었습니다. 당첨 번호 발표 후, 민우는 자신이 구매했던 로또로 당첨이 가능했던 최고 순위와 최저 순위를 알아보고 싶어 졌습니다.
알아볼 수 없는 번호를 0으로 표기하기로 하고, 민우가 구매한 로또 번호 6개가 44, 1, 0, 0, 31 25라고 가정해보겠습니다. 당첨 번호 6개가 31, 10, 45, 1, 6, 19라면, 당첨 가능한 최고 순위와 최저 순위의 한 예는 아래와 같습니다.

당첨 번호	31	10	45	1	6	19	결과
최고 순위 번호	31	0→10	44	1	0→6	25	4개 번호 일치, 3등
최저 순위 번호	31	0→11	44	1	0→7	25	2개 번호 일치, 5등
순서와 상관없이, 구매한 로또에 당첨 번호와 일치하는 번호가 있으면 맞힌 걸로 인정됩니다.
알아볼 수 없는 두 개의 번호를 각각 10, 6이라고 가정하면 3등에 당첨될 수 있습니다.
3등을 만드는 다른 방법들도 존재합니다. 하지만, 2등 이상으로 만드는 것은 불가능합니다.
알아볼 수 없는 두 개의 번호를 각각 11, 7이라고 가정하면 5등에 당첨될 수 있습니다.
5등을 만드는 다른 방법들도 존재합니다. 하지만, 6등(낙첨)으로 만드는 것은 불가능합니다.
민우가 구매한 로또 번호를 담은 배열 lottos, 당첨 번호를 담은 배열 win_nums가 매개변수로 주어집니다. 이때, 당첨 가능한 최고 순위와 최저 순위를 차례대로 배열에 담아서 return 하도록 solution 함수를 완성해주세요.

제한사항
lottos는 길이 6인 정수 배열입니다.
lottos의 모든 원소는 0 이상 45 이하인 정수입니다.
0은 알아볼 수 없는 숫자를 의미합니다.
0을 제외한 다른 숫자들은 lottos에 2개 이상 담겨있지 않습니다.
lottos의 원소들은 정렬되어 있지 않을 수도 있습니다.
win_nums은 길이 6인 정수 배열입니다.
win_nums의 모든 원소는 1 이상 45 이하인 정수입니다.
win_nums에는 같은 숫자가 2개 이상 담겨있지 않습니다.
win_nums의 원소들은 정렬되어 있지 않을 수도 있습니다.
입출력 예
lottos	win_nums	result
[44, 1, 0, 0, 31, 25]	[31, 10, 45, 1, 6, 19]	[3, 5]
[0, 0, 0, 0, 0, 0]	[38, 19, 20, 40, 15, 25]	[1, 6]
[45, 4, 35, 20, 3, 9]	[20, 9, 3, 45, 4, 35]	[1, 1]
입출력 예 설명
입출력 예 #1
문제 예시와 같습니다.

입출력 예 #2
알아볼 수 없는 번호들이 아래와 같았다면, 1등과 6등에 당첨될 수 있습니다.

당첨 번호	38	19	20	40	15	25	결과
최고 순위 번호	0→38	0→19	0→20	0→40	0→15	0→25	6개 번호 일치, 1등
최저 순위 번호	0→21	0→22	0→23	0→24	0→26	0→27	0개 번호 일치, 6등
입출력 예 #3
민우가 구매한 로또의 번호와 당첨 번호가 모두 일치하므로, 최고 순위와 최저 순위는 모두 1등입니다.
*/

//solution

function solution(lottos, win_nums) {
  let count = 0; //써져있는 숫자
  let zeroCount = 0; // 지워진 숫자

  for (let i = 0; i < lottos.length; i++) {
    if (lottos[i] === 0) {
      zeroCount += 1;
    } // 지워진 숫자를 구해준다.
    for (let j = 0; j < win_nums.length; j++) {
      if (lottos[i] === win_nums[j]) {
        count += 1;
      } // 당첨 숫자를 더해준다.
    }
  }
  let max = count + zeroCount;
  let min = count;
  if (max === 0 || max === 1) {
    return [6, 6]; //최대 맞춘갯수가 0,1일경우 6등
  } else if (min === 0 || min === 1) {
    return [7 - max, 6];
  } else {
    return [7 - max, 7 - min];
  }
}
//나의 풀이는 이렇다.
//지워진 숫자와 당첨 숫자를 구하고 최대 당첨을 맞춘갯수를 당첨 + 지워진숫자로 하고
//최저 당첨을 당첨숫자로만 해서 마지막에 최대당첨이 0,1일때와 최저당첨이 0일때와 나머지를 나누어 결과값을 냈다.

function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];
  let answer = [],
    ans = [],
    ans1 = [];

  lottos.map((x) => {
    let val = win_nums.find((y) => y == x);

    if (x == 0) ans1.push(x);
    if (val) {
      ans.push(val);
      ans1.push(val);
    }
  });
  answer.push(rank[ans1.length]);
  answer.push(rank[ans.length]);

  return answer;
}

// 다른 해답중에 좋은 코드라고 생각했던 것.
// rank를 미리 정해놓은것도 좋았고 max 와 min 을 두번의 if문으로 찾아낸 뒤 그 길이를 리턴하는것도 좋았다.
/* ----------------------------------------------------------- */

//https://programmers.co.kr/learn/courses/30/lessons/81301?language=javascript

/* 숫자 문자열과 영단어
문제 설명
img1.png

네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

1478 → "one4seveneight"
234567 → "23four5six7"
10203 → "1zerotwozero3"
이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

참고로 각 숫자에 대응되는 영단어는 다음 표와 같습니다.

숫자	영단어
0	zero
1	one
2	two
3	three
4	four
5	five
6	six
7	seven
8	eight
9	nine
제한사항
1 ≤ s의 길이 ≤ 50
s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.
입출력 예
s	result
"one4seveneight"	1478
"23four5six7"	234567
"2three45sixseven"	234567
"123"	123
입출력 예 설명
입출력 예 #1

문제 예시와 같습니다.
입출력 예 #2

문제 예시와 같습니다.
입출력 예 #3

"three"는 3, "six"는 6, "seven"은 7에 대응되기 때문에 정답은 입출력 예 #2와 같은 234567이 됩니다.
입출력 예 #2와 #3과 같이 같은 정답을 가리키는 문자열이 여러 가지가 나올 수 있습니다.
입출력 예 #4

s에는 영단어로 바뀐 부분이 없습니다.
제한시간 안내
정확성 테스트 : 10초 */

function solution(s) {
  let result = "";
  while (s.length > 0) {
    if (s[0] === "z") {
      result += 0;
      s = s.slice(4);
    } else if (s[0] === "o") {
      result += 1;
      s = s.slice(3);
    } else if (s[0] === "t") {
      if (s[1] === "w") {
        result += 2;
        s = s.slice(3);
      } else {
        result += 3;
        s = s.slice(5);
      }
    } else if (s[0] === "f") {
      if (s[1] === "o") {
        result += 4;
      } else {
        result += 5;
      }
      s = s.slice(4);
    } else if (s[0] === "s") {
      if (s[1] === "i") {
        result += 6;
        s = s.slice(3);
      } else {
        result += 7;
        s = s.slice(5);
      }
    } else if (s[0] === "e") {
      result += 8;
      s = s.slice(5);
    } else if (s[0] === "n") {
      result += 9;
      s = s.slice(4);
    } else {
      result += s[0];
      s = s.slice(1);
    }
  }
  return parseInt(result);
}

// 하드코딩을 풀었다. 솔직히 어떻게 해야할지 감을 잡지 못했다.
//정규표현식에 대한 공부도 해야겠다고 마음을 먹고 다른 풀이를 봤는데

function solution(s) {
  let numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}
// 정규표현식은 커녕 내가 전부 사용해봤던 걸로 무진장 깔끔하게 잘되있었다.
// split으로 빼주고 join으로 숫자를 넣어준다는 아주 기본적이면서도 멋진 풀이를 봤다.
