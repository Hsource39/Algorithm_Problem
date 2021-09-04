/*
https://programmers.co.kr/learn/courses/30/lessons/42839

소수 찾기
문제 설명
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

제한사항
numbers는 길이 1 이상 7 이하인 문자열입니다.
numbers는 0~9까지 숫자만으로 이루어져 있습니다.
"013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.
입출력 예
numbers	return
"17"	3
"011"	2
입출력 예 설명
예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.


*/

const isPrime = (num) => {
  if (num === 2) {
    return true;
  } else if (num === 1 || num === 0) {
    return false;
  }

  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const getPermutations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((el) => [fixed, ...el]);
    results.push(...attached);
  });

  return results;
};
function solution(numbers) {
  var answer = 0;
  let arr = [];
  let arrNum = numbers.split("");

  for (let i = 1; i <= arrNum.length; i++) {
    arr.push(...getPermutations(arrNum, i));
  }
  let numEle = arr
    .map((el) => Number(el.join("")))
    .filter((item, index, origin) => origin.indexOf(item) === index);

  for (let el of numEle) {
    if (isPrime(el)) {
      answer += 1;
    }
  }

  return answer;
}

//수도코드 대로 먼저 순열을 구해주고 중복을 없앤 뒤 소수를 판별해서 리턴값에 넣어줬다.
//한가지 아쉬운것은 내가 저 순열에 메모제이션을 활용할 수 있다면 시간복잡도가 좀 더 간단해질 수 있겠다는 생각이 든다.

/*
https://www.acmicpc.net/problem/2798

문제
카지노에서 제일 인기 있는 게임 블랙잭의 규칙은 상당히 쉽다. 카드의 합이 21을 넘지 않는 한도 내에서, 카드의 합을 최대한 크게 만드는 게임이다. 블랙잭은 카지노마다 다양한 규정이 있다.

한국 최고의 블랙잭 고수 김정인은 새로운 블랙잭 규칙을 만들어 상근, 창영이와 게임하려고 한다.

김정인 버전의 블랙잭에서 각 카드에는 양의 정수가 쓰여 있다. 그 다음, 딜러는 N장의 카드를 모두 숫자가 보이도록 바닥에 놓는다. 그런 후에 딜러는 숫자 M을 크게 외친다.

이제 플레이어는 제한된 시간 안에 N장의 카드 중에서 3장의 카드를 골라야 한다. 블랙잭 변형 게임이기 때문에, 플레이어가 고른 카드의 합은 M을 넘지 않으면서 M과 최대한 가깝게 만들어야 한다.

N장의 카드에 써져 있는 숫자가 주어졌을 때, M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합을 구해 출력하시오.

입력
첫째 줄에 카드의 개수 N(3 ≤ N ≤ 100)과 M(10 ≤ M ≤ 300,000)이 주어진다. 둘째 줄에는 카드에 쓰여 있는 수가 주어지며, 이 값은 100,000을 넘지 않는 양의 정수이다.

합이 M을 넘지 않는 카드 3장을 찾을 수 있는 경우만 입력으로 주어진다.

출력
첫째 줄에 M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합을 출력한다.


수도 코드
첫번째 줄의 두번째 숫자에 가장 가까운 작은 숫자(두번째 숫자포함)를 출력해야하는 문제.
두번째 줄의 3개인 조합을 구한다. 그리고 조합을 각각 더해준다. 두번째 숫자보다 큰 숫자는 모두 없애고 작은 숫자중 가장 큰 숫자를 리턴해준다.

*/

var input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

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

const score = input[0].split(" ")[1];
const cards = input[1].split(" ").map((el) => Number(el));
let list = combination(cards, 3);
let listPoint = list
  .map((el) => el.reduce((a, c) => a + c))
  .filter((el) => el <= score)
  .sort((a, b) => b - a);
console.log(listPoint[0]);
