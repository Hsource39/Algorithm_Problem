/*
https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript

위장
문제 설명

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

종류	이름
얼굴	동그란 안경, 검정 선글라스
상의	파란색 티셔츠
하의	청바지
겉옷	긴 코트
스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

제한사항

clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
같은 이름을 가진 의상은 존재하지 않습니다.
clothes의 모든 원소는 문자열로 이루어져 있습니다.
모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
스파이는 하루에 최소 한 개의 의상은 입습니다.

입출력 예

clothes	return
[["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]	5
[["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]	3
입출력 예 설명

예제 #1
headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

yellow_hat
blue_sunglasses
green_turban
yellow_hat + blue_sunglasses
green_turban + blue_sunglasses
예제 #2
face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

crow_mask
blue_sunglasses
smoky_makeup


*/

function solution(clothes) {
  var answer = 1;
  let obj = {};
  clothes.forEach((el) => {
    obj[el[1]] = (obj[el[1]] || 1) + 1;
  });
  for (let i in obj) {
    answer *= obj[i];
  }

  return answer - 1;
}
/*
총 개수를 구하는 문제이기에 먼저 각 카테고리(의상의 입는위치)별로 개수를 구해준 뒤(최소한 하나만 입는 것이기 때문에 아무것도 입지 않는것을 포함) answer에 경우의 수를 각각 곱해준다. 그 뒤 하나도 입지 않는 경우 1을 빼면 답.
문제를 풀기전 하나만 입을 경우에 대해 고민을 많이 했는데 전부 다 도는것이기 때문에 아예 없는 경우만 빼면 된다는 생각이 들었다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/42747

H-Index
문제 설명

H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

제한사항

과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

입출력 예

citations	return
[3, 0, 6, 1, 5]	3
입출력 예 설명

이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.

*/

function solution(c) {
  var answer = 0;
  let n = c.length;
  c = c.sort((a, b) => b - a);

  for (let i = n; i > 0; i--) {
    let count = 0;
    for (let el of c) {
      if (i <= el) count++;
    }
    if (i <= count) {
      answer = i;
      break;
    }
  }

  return answer;
}

/*
먼저 인용횟수가 많은것부터 찾아봐야겠다고 생각해서 c를 내림차순 정렬을 해준 뒤
x편의 논문이 x번 이상 인용되었다고 하는것으로 최대 x의 값은 논문의 최대 값이라고 생각해서 반복문을 n부터 1씩 줄여가는 것으로 돌리고 논문들 중에 n번 이상 인용되었을 경우의 카운트를 센 뒤 마지막에 카운트가 n번보다 크거나 같으면 정답에 넣어준 뒤 반복문을 멈췄다. 멈추지 않을 경우 더 밑으로 내려갈 수 있기 때문에.
*/
