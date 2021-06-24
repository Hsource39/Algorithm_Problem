/*
문제 1
문제 설명
길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.

이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1] 입니다. (n은 a, b의 길이)

제한사항
a, b의 길이는 1 이상 1,000 이하입니다.
a, b의 모든 수는 -1,000 이상 1,000 이하입니다.

입출력 예
a   	    |b	         |result
[1,2,3,4]	|[-3,-1,0,2] |3
[-1,0,1]	|[1,0,-1]	 |-2

*/

function test1(a, b) {
    var answer = 0;
    
    for (let i = 0; i<a.length; i++) {
        answer += a[i]*b[i]
    }
    return answer;
}

//

/*
문제2
문제 설명
S사에서는 각 부서에 필요한 물품을 지원해 주기 위해 부서별로 물품을 구매하는데 필요한 금액을 조사했습니다. 그러나, 전체 예산이 정해져 있기 때문에 모든 부서의 물품을 구매해 줄 수는 없습니다. 그래서 최대한 많은 부서의 물품을 구매해 줄 수 있도록 하려고 합니다.

물품을 구매해 줄 때는 각 부서가 신청한 금액만큼을 모두 지원해 줘야 합니다. 예를 들어 1,000원을 신청한 부서에는 정확히 1,000원을 지원해야 하며, 1,000원보다 적은 금액을 지원해 줄 수는 없습니다.

부서별로 신청한 금액이 들어있는 배열 d와 예산 budget이 매개변수로 주어질 때, 최대 몇 개의 부서에 물품을 지원할 수 있는지 return 하도록 solution 함수를 완성해주세요.

제한사항
d는 부서별로 신청한 금액이 들어있는 배열이며, 길이(전체 부서의 개수)는 1 이상 100 이하입니다.
d의 각 원소는 부서별로 신청한 금액을 나타내며, 부서별 신청 금액은 1 이상 100,000 이하의 자연수입니다.
budget은 예산을 나타내며, 1 이상 10,000,000 이하의 자연수입니다.

입출력 예
d	         budget  result
[1,3,2,5,4]	 9	     3
[2,2,3,3]	 10	     4


*/

function test2(d, budget) {
    var answer = d.length;
    let dRe = d.reduce((a,c) => a+c);
    if (dRe === budget) {
        return answer;
    }
    d = d.sort((a,b) => a-b);
    
    while (dRe > budget) {
        answer -= 1;
        dRe -= d[d.length-1]
        d = d.slice(0,-1)
        
    }
    
    return answer;
}

//

/*
문제3
어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다. 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

제한사항
absolutes의 길이는 1 이상 1,000 이하입니다.
absolutes의 모든 수는 각각 1 이상 1,000 이하입니다.
signs의 길이는 absolutes의 길이와 같습니다.
signs[i] 가 참이면 absolutes[i] 의 실제 정수가 양수임을, 그렇지 않으면 음수임을 의미합니다.

입출력 예
absolutes	signs	            result
[4,7,12]	[true,false,true]	9
[1,2,3]	    [false,false,true]	0

*/

function test3(absolutes, signs) {
    var answer = absolutes.reduce((a,c,i) => {
        if (signs[i]) {
            a += c;
            return a;
        }
        else {
            a -= c;
            return a;
        }
    },0)
    
    return answer;
}

/*
문제4
문제 설명
가로 길이가 Wcm, 세로 길이가 Hcm인 직사각형 종이가 있습니다. 종이에는 가로, 세로 방향과 평행하게 격자 형태로 선이 그어져 있으며, 모든 격자칸은 1cm x 1cm 크기입니다. 이 종이를 격자 선을 따라 1cm × 1cm의 정사각형으로 잘라 사용할 예정이었는데, 누군가가 이 종이를 대각선 꼭지점 2개를 잇는 방향으로 잘라 놓았습니다. 그러므로 현재 직사각형 종이는 크기가 같은 직각삼각형 2개로 나누어진 상태입니다. 새로운 종이를 구할 수 없는 상태이기 때문에, 이 종이에서 원래 종이의 가로, 세로 방향과 평행하게 1cm × 1cm로 잘라 사용할 수 있는 만큼만 사용하기로 하였습니다.
가로의 길이 W와 세로의 길이 H가 주어질 때, 사용할 수 있는 정사각형의 개수를 구하는 solution 함수를 완성해 주세요.

제한사항
W, H : 1억 이하의 자연수

입출력 예
W	H	result
8	12	80


*/

function test4(w, h) {
    var answer = w*h;
    let max = Math.max(w,h)
    let min = Math.min(w,h)
    
    function gcd(minNum, maxNum){
        return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
    }
    
    
    return answer - (w+h-gcd(min,max));
}

/*
문제5
문제 설명
124 나라가 있습니다. 124 나라에서는 10진법이 아닌 다음과 같은 자신들만의 규칙으로 수를 표현합니다.

124 나라에는 자연수만 존재합니다.
124 나라에는 모든 수를 표현할 때 1, 2, 4만 사용합니다.
예를 들어서 124 나라에서 사용하는 숫자는 다음과 같이 변환됩니다.

10진법	124 나라	10진법	124 나라
1	    1	        6	    14
2	    2	        7	    21
3	    4	        8	    22
4	    11	        9	    24
5	    12	        10	    41
자연수 n이 매개변수로 주어질 때, n을 124 나라에서 사용하는 숫자로 바꾼 값을 return 하도록 solution 함수를 완성해 주세요.

제한사항
n은 500,000,000이하의 자연수 입니다.


*/

function test5(n) {
    let num = [4,1,2]
    var answer = '';
    
    while(n) {
        answer = num[n%3] + answer;
        n = (n%3 === 0)? n/3 -1 : Math.floor(n/3)
    }
    
    return answer;
}

/*
문제6

문제 설명
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한 조건
시험은 최대 10,000 문제로 구성되어있습니다.
문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.
입출력 예
answers	    return
[1,2,3,4,5]	[1]
[1,3,2,4,2]	[1,2,3]
*/

function test6(answers) {
    var answer = [];
    let one = [1,2,3,4,5]
    let two = [2,1,2,3,2,4,2,5]
    let three = [3,3,1,1,2,2,4,4,5,5]
    let correct = [0,0,0,0]
    
    for (let i = 0; i<answers.length; i++) {
        if (answers[i] === one[i%5]) {
            correct[1] += 1;
        }
        if (answers[i] === two[i%8]) {
            correct[2] += 1;
        }
        if (answers[i] === three[i%10]) {
            correct[3] += 1;
        }
    }
    let max = correct.reduce((a,c) => a>c ? a : c)
    for (let j = 0; j<correct.length; j++) {
        if (correct[j] === max) {
            answer.push(j)
        }
    }
    return answer;
}

/*
문제7
문제 설명
주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

제한사항
nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.
입출력 예
nums	     result
[1,2,3,4]	    1
[1,2,7,6,4]	    4
*/

function test7(cards) {
    cards = cards.sort((a,b) => a-b)
    let arr = [];
  
    for (let i =0; i<cards.length-2; i++) {
      for (let j = i+1; j<cards.length-1; j++) {
        for (let k = j+1; k<cards.length; k++) {
          arr.push(cards[i]+cards[j]+cards[k])
        }
      }
    }
  
    const isPrime = (num) => {
    if (num % 2 === 0) return false;
    let sqrt = parseInt(Math.sqrt(num));
    for (let divider = 3; divider <= sqrt; divider += 2) {
      if (num % divider === 0) {
        return false;
      }
    }
    return true;
  };
  
    return arr.filter(el => isPrime(el)).length;
  }