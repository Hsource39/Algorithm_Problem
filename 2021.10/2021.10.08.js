/*
https://programmers.co.kr/learn/courses/30/lessons/86971

전력망을 둘로 나누기
문제 설명

n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있습니다. 당신은 이 전선들 중 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하려고 합니다. 이때, 두 전력망이 갖게 되는 송전탑의 개수를 최대한 비슷하게 맞추고자 합니다.

송전탑의 개수 n, 그리고 전선 정보 wires가 매개변수로 주어집니다. 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 나누었을 때, 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return 하도록 solution 함수를 완성해주세요.

제한사항

n은 2 이상 100 이하인 자연수입니다.
wires는 길이가 n-1인 정수형 2차원 배열입니다.
wires의 각 원소는 [v1, v2] 2개의 자연수로 이루어져 있으며, 이는 전력망의 v1번 송전탑과 v2번 송전탑이 전선으로 연결되어 있다는 것을 의미합니다.
1 ≤ v1 < v2 ≤ n 입니다.
전력망 네트워크가 하나의 트리 형태가 아닌 경우는 입력으로 주어지지 않습니다.

입출력 예

n	wires	result
9	[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]	3
4	[[1,2],[2,3],[3,4]]	0
7	[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]	1

*/

function solution(n, wires) {
    var answer = n;
    
    for (let i = 0; i<wires.length; i++) {
        let count = 0;
        let matrix = new Array(n+1).fill(0).map(el => new Array(n+1).fill(0))
        let isvisit = new Array(n+1).fill(false);
        let arr = [...wires.slice(0,i),...wires.slice(i+1)]
        for (let el of arr) {
            matrix[el[0]][el[1]] = 1;
            matrix[el[1]][el[0]] = 1;
        }
        for (let v = 1; v<=n; v++) {
            if(!isvisit[v]){
                let num = bfs(matrix,v,isvisit)
                count = Math.abs(count - num)
            }
        }
        if(count < answer) answer = count
    }
    
    return answer;
}

const bfs = (matrix, v, isVisited) => {
    let q = [v];
    let eq = (n) => q.push(n)
    let dq = (n) => q.shift()
    let n = 0;

    isVisited[v] = true;

    while (q.length > 0) {
      let cur = dq();

      for (let i = 0; i<matrix[cur].length; i++) {
        if (!isVisited[i] && matrix[cur][i]) {
          eq(i);
            n++
          isVisited[i] = true;
        }
      }
    }
    return n;
  }

/*
그래프를 만들고 그래프 노드의 숫자 차이가 가장 적은 값을 리턴해주는 문제

문제를 해결하기 위한 방법이

그래프를 쪼갠다.(현재는 모두 뭉쳐있음)

쪼갠 그래프의 노드 개수 차이를 구한다.

노드 개수차이가 정답보다 작다면 정답을 노드 개수차이로 바꿔준다.

이 세가지를 진행하면 해결된다.

for (let i = 0; i<wires.length; i++) {
        let count = 0;
        let matrix = new Array(n+1).fill(0).map(el => new Array(n+1).fill(0))
        let isvisit = new Array(n+1).fill(false);
        let arr = [...wires.slice(0,i),...wires.slice(i+1)]
        for (let el of arr) {
            matrix[el[0]][el[1]] = 1;
            matrix[el[1]][el[0]] = 1;
        }
먼저 그래프를 쪼개기 위해 그래프를 연결하기 위한 배열 wires 중 하나를 뺐다.(반복문을 돌려서 모두 한번씩은 빠지게 된다.)

빠진것을 제외한 wires 그래프를 만들어준다.
그래프를 만들 때 0번째 인덱스는 더미값으로 넣어줬다. 그래프가 1부터 진행하기 때문에.

for (let v = 1; v<=n; v++) {
            if(!isvisit[v]){
                let num = bfs(matrix,v,isvisit)
                count = Math.abs(count - num)
            }

----


const bfs = (matrix, v, isVisited) => {
    let q = [v];
    let eq = (n) => q.push(n)
    let dq = (n) => q.shift()
    let n = 0;

    isVisited[v] = true;

    while (q.length > 0) {
      let cur = dq();

      for (let i = 0; i<matrix[cur].length; i++) {
        if (!isVisited[i] && matrix[cur][i]) {
          eq(i);
            n++
          isVisited[i] = true;
        }
      }
    }
    return n;
  }
그리고 1번째 인덱스부터 방문하지 않은 곳이라면 bfs를 돌리는데
bfs에서 연결된 곳을 모두 순회하기 위해 queue를 이용하는데 queue에서 새로운 곳을 연결할 때 마다 1씩 더해주고 마지막에 더해준 숫자를 리턴해준다.

count = Math.abs(count - num)
 if(count < answer) answer = count
리턴된 숫자 num를 count(리턴된 숫자와 다음 그래프에 리턴될 숫자가 들어갈 공간 초기값 0)에서 빼준다면 그래프 노드 개수의 차가 되고

이 count가 answer보다 작다면 answer에 count 를 넣어주고 리턴해준다.
*/