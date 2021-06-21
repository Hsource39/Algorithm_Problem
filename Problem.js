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

function solution(absolutes, signs) {
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