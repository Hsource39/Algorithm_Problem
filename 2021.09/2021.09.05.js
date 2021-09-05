/*
https://programmers.co.kr/learn/courses/30/lessons/12973?language=javascript

짝지어 제거하기
문제 설명
짝지어 제거하기는, 알파벳 소문자로 이루어진 문자열을 가지고 시작합니다. 먼저 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다. 그다음, 그 둘을 제거한 뒤, 앞뒤로 문자열을 이어 붙입니다. 이 과정을 반복해서 문자열을 모두 제거한다면 짝지어 제거하기가 종료됩니다. 문자열 S가 주어졌을 때, 짝지어 제거하기를 성공적으로 수행할 수 있는지 반환하는 함수를 완성해 주세요. 성공적으로 수행할 수 있으면 1을, 아닐 경우 0을 리턴해주면 됩니다.

예를 들어, 문자열 S = baabaa 라면

b aa baa → bb aa → aa →

의 순서로 문자열을 모두 제거할 수 있으므로 1을 반환합니다.

제한사항
문자열의 길이 : 1,000,000이하의 자연수
문자열은 모두 소문자로 이루어져 있습니다.
입출력 예
s	result
baabaa	1
cdcd	0
입출력 예 설명
입출력 예 #1
위의 예시와 같습니다.
입출력 예 #2
문자열이 남아있지만 짝지어 제거할 수 있는 문자열이 더 이상 존재하지 않기 때문에 0을 반환합니다.
*/

function solution(s) {
  let arr = s.split("");
  let container = [];

  for (let i = 0; i < arr.length; i++) {
    if (container.length === 0) {
      container.push(arr[i]);
    } else {
      if (arr[i] === container[container.length - 1]) {
        container.pop();
      } else {
        container.push(arr[i]);
      }
    }
  }
  if (container.length === 0) {
    return 1;
  } else {
    return 0;
  }
}

// 먼저 컨테이너의 길이가 0일 경우 컨테이너에 i번째 문자열을 넣어주고 0이 아닐경우 i-1의 문자열과 i의 문자열이 같다면 container에 있는 i-1번째 문자열을 빼주고 그렇지 않다면 i번째 문자열을 넣어준다. 그리고 container의 길이를 구해서 0이면 1 리턴 0이 아니면 0리턴
// 마지막에 삼항연산자를 썼으면 더 깔씀해보일 것 같다.

/*
https://programmers.co.kr/learn/courses/30/lessons/72411

메뉴 리뉴얼
문제 설명
레스토랑을 운영하던 스카피는 코로나19로 인한 불경기를 극복하고자 메뉴를 새로 구성하려고 고민하고 있습니다.
기존에는 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성해서 새로운 메뉴를 제공하기로 결정했습니다. 어떤 단품메뉴들을 조합해서 코스요리 메뉴로 구성하면 좋을 지 고민하던 "스카피"는 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다. 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.

예를 들어, 손님 6명이 주문한 단품메뉴들의 조합이 다음과 같다면,
(각 손님은 단품메뉴를 2개 이상 주문해야 하며, 각 단품메뉴는 A ~ Z의 알파벳 대문자로 표기합니다.)

손님 번호	주문한 단품메뉴 조합
1번 손님	A, B, C, F, G
2번 손님	A, C
3번 손님	C, D, E
4번 손님	A, C, D, E
5번 손님	B, C, F, G
6번 손님	A, C, D, E, H
가장 많이 함께 주문된 단품메뉴 조합에 따라 "스카피"가 만들게 될 코스요리 메뉴 구성 후보는 다음과 같습니다.

코스 종류	메뉴 구성	설명
요리 2개 코스	A, C	1번, 2번, 4번, 6번 손님으로부터 총 4번 주문됐습니다.
요리 3개 코스	C, D, E	3번, 4번, 6번 손님으로부터 총 3번 주문됐습니다.
요리 4개 코스	B, C, F, G	1번, 5번 손님으로부터 총 2번 주문됐습니다.
요리 4개 코스	A, C, D, E	4번, 6번 손님으로부터 총 2번 주문됐습니다.
[문제]
각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, "스카피"가 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

[제한사항]
orders 배열의 크기는 2 이상 20 이하입니다.
orders 배열의 각 원소는 크기가 2 이상 10 이하인 문자열입니다.
각 문자열은 알파벳 대문자로만 이루어져 있습니다.
각 문자열에는 같은 알파벳이 중복해서 들어있지 않습니다.
course 배열의 크기는 1 이상 10 이하입니다.
course 배열의 각 원소는 2 이상 10 이하인 자연수가 오름차순으로 정렬되어 있습니다.
course 배열에는 같은 값이 중복해서 들어있지 않습니다.
정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬해서 return 해주세요.
배열의 각 원소에 저장된 문자열 또한 알파벳 오름차순으로 정렬되어야 합니다.
만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.
[입출력 예]
orders	course	result
["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]	[2,3,4]	["AC", "ACDE", "BCFG", "CDE"]
["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"]	[2,3,5]	["ACD", "AD", "ADE", "CD", "XYZ"]
["XYZ", "XWY", "WXA"]	[2,3,4]	["WX", "XY"]
입출력 예에 대한 설명
입출력 예 #1
문제의 예시와 같습니다.

입출력 예 #2
AD가 세 번, CD가 세 번, ACD가 두 번, ADE가 두 번, XYZ 가 두 번 주문됐습니다.
요리 5개를 주문한 손님이 1명 있지만, 최소 2명 이상의 손님에게서 주문된 구성만 코스요리 후보에 들어가므로, 요리 5개로 구성된 코스요리는 새로 추가하지 않습니다.

입출력 예 #3
WX가 두 번, XY가 두 번 주문됐습니다.
3명의 손님 모두 단품메뉴를 3개씩 주문했지만, 최소 2명 이상의 손님에게서 주문된 구성만 코스요리 후보에 들어가므로, 요리 3개로 구성된 코스요리는 새로 추가하지 않습니다.
또, 단품메뉴를 4개 이상 주문한 손님은 없으므로, 요리 4개로 구성된 코스요리 또한 새로 추가하지 않습니다.
*/

function combination(arr, selectNum) {
  const result = [];
  if (selectNum === 1) return arr.map((v) => [v]);
  arr.forEach((v, idx, arr) => {
    const fixed = v;
    const restArr = arr.slice(idx + 1);
    const combinationArr = combination(restArr, selectNum - 1);
    const combineFix = combinationArr.map((v) => [fixed, ...v]);
    result.push(...combineFix);
  });
  return result;
}

function solution(orders, course) {
  var answer = [];
  let arr = orders.map((el) => el.split(""));
  let container = [];
  for (let el of arr) {
    for (let ele of course) {
      container.push(...combination(el, ele));
    }
  }
  let obj = {};
  container.forEach((el) => {
    el = el.sort();
    let str = el.join("");
    if (obj[str] === undefined) {
      obj[str] = 1;
    } else {
      obj[str] += 1;
    }
  });
  let topRate = new Array(course.length).fill(0);
  for (let i = 0; i < course.length; i++) {
    for (let prop in obj) {
      if (prop.length === course[i]) {
        if (obj[prop] > topRate[i]) topRate[i] = obj[prop];
      }
    }
  }
  for (let prop in obj) {
    for (let i = 0; i < course.length; i++) {
      if (course[i] === prop.length) {
        if (obj[prop] === topRate[i] && topRate[i] > 1) answer.push(prop);
      }
    }
  }

  return answer.sort();
}

/*
어떻게해야 더 깔끔한 식을 만들 수 있을까 마지막에 나온 두개의 반복문을 하나로 압축할 수 있지 않을까 지금와서 생각해보니 그렇게 할 수 있을거같다는 생각이 든다. topRate가 바뀌면 배열을 다 비우고 바뀌게 된 문자열을 빈 배열에 넣어준 뒤 반복문이 끝나면 만들어진 배열을 answer에 spread로 넣어주면 되지 않을까 란 생각이 든다. 그럼 반복문 하나가 더 줄어들어서 시간복잡도도 줄어들 수 있을거같다.

*/
