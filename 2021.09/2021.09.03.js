/*
https://programmers.co.kr/learn/courses/30/lessons/42746

가장 큰 수
문제 설명
0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

제한 사항
numbers의 길이는 1 이상 100,000 이하입니다.
numbers의 원소는 0 이상 1,000 이하입니다.
정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.
입출력 예

numbers	return
[6, 10, 2]	"6210"
[3, 30, 34, 5, 9]	"9534330"


*/

//첫 문제 풀이(무한으로 진행되서 터졌다)
function solution(numbers) {
  let arr = numbers
    .sort()
    .reverse()
    .map((el) => String(el));
  let sortArr = [];
  for (let i = 0; i < arr.length; i++) {
    let length = arr[i].length;
    if (length === 1) {
      for (let j = 0; j < sortArr.length; j++) {
        if (arr[i] > sortArr[j][1]) {
          let newArr = [...sortArr.slice(0, j), arr[i], ...sortArr.slice(j)];
          sortArr = newArr;
        }
      }
    } else {
      sortArr.push(arr[i]);
    }
  }
  return sortArr.join("");
}

//정답
function solution(numbers) {
  var answer = numbers
    .map((c) => c + "")
    .sort((a, b) => b + a - (a + b))
    .join("");

  return answer[0] === "0" ? "0" : answer;
}

// 내장 함수 sort를 정확하게 알지 못했기 때문에 벌어진 사건
// 알았다면 지금보다는 더 쉽게 생각해서 풀지 않았을까 한다.
// 기본이 중요하단말이 이런말을 뜻하는 것 같다.

/* 
https://programmers.co.kr/learn/courses/30/lessons/42842

카펫
문제 설명
Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 노란색으로 칠해져 있고 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.



Leo는 집으로 돌아와서 아까 본 카펫의 노란색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.

Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한사항

갈색 격자의 수 brown은 8 이상 5,000 이하인 자연수입니다.
노란색 격자의 수 yellow는 1 이상 2,000,000 이하인 자연수입니다.
카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.

입출력 예

brown	yellow	return
10	2	[4, 3]
8	1	[3, 3]
24	24	[8, 6]

*/

function solution(brown, yellow) {
  //br + ye = 넓이 = a*b a는 br의 가로 b는 세로 (a-2)(b-2) = ab -2b -2a +4 는
  // 내가 구해야하는건 a 가로 b 세로
  // ab = br + ye
  // ye = (a-2)(b-2)

  var answer = [];
  let divisors = [];
  let area = brown + yellow;
  for (let i = 2; i < area; i++) {
    if (area % i === 0) {
      divisors.push(i);
    }
  }
  for (let i = 0; i < divisors.length; i++) {
    if (
      (divisors[i] - 2) * (divisors[divisors.length - i - 1] - 2) ===
      yellow
    ) {
      answer.push(divisors[divisors.length - i - 1]);
      answer.push(divisors[i]);
      break;
    }
  }

  return answer;
}

/* 
먼저 brown은 외각에 한줄로 되어있고 내부는 yellow로 되어있기 때문에 전체 카펫의 넓이를 가로a 세로b 라고 임의의 문자로 지정하고
a b = brown + yellow 라고 생각했다. 그리고 brown은 만들 수 없지만 yellow의 경우는 가로와 세로에 각각2를 빼서(brown이 가지고 있는 각각1의 길이들)
(a-2) (b-2) = yellow 로 계산했다.

먼저 가로 세로를 구하기 위해 넓이의 약수를 구하고 약수는 divisors 에 들어갔다.
그 뒤 약수의 특성상 가장 작은 수부터 위로 올라가고 가장 큰수부터 밑으로 내려가면서 곱해주면 넓이가 나오는것을 이용해서 yellow를 구한 뒤 가로와 세로를 answer에 넣어서 리턴해줬다.
*/
