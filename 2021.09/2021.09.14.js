/*
https://programmers.co.kr/learn/courses/30/lessons/42583

다리를 지나는 트럭
문제 설명

트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.

예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

경과 시간	다리를 지난 트럭	다리를 건너는 트럭	대기 트럭
0	[]	[]	[7,4,5,6]
1~2	[]	[7]	[4,5,6]
3	[7]	[4]	[5,6]
4	[7]	[4,5]	[6]
5	[7,4]	[5]	[6]
6~7	[7,4,5]	[6]	[]
8	[7,4,5,6]	[]	[]
따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

제한 조건

bridge_length는 1 이상 10,000 이하입니다.
weight는 1 이상 10,000 이하입니다.
truck_weights의 길이는 1 이상 10,000 이하입니다.
모든 트럭의 무게는 1 이상 weight 이하입니다.

입출력 예

bridge_length	weight	truck_weights	return
2	10	[7,4,5,6]	8
100	100	[10]	101
100	100	[10,10,10,10,10,10,10,10,10,10]	110

*/

function solution(bridge_length, weight, truck_weights) {
  var answer = 1;
  let bridge = new Array(bridge_length - 1).fill(0);
  let totalWeight = 0;
  let car = truck_weights.shift();
  totalWeight += car;
  bridge.push(car);

  while (totalWeight > 0) {
    let count = bridge.shift();
    totalWeight -= count;
    if (totalWeight + truck_weights[0] <= weight) {
      car = truck_weights.shift();
      totalWeight += car;
      bridge.push(car);
    } else {
      bridge.push(0);
    }
    answer++;
  }
  return answer;
}

/*
bridge 라는 변수를 만들어 그곳에 다리의 길이만큼 배열을 넣어주고 차를 차례대로 출발 시켜줬다.
그리고 무게 초과시 차를 넣어주지 않고 0만 넣어주고 무게 이하일 시 차를 넣어줘서 큐가 순환하도록 만든 뒤 모든 트럭이 bridge에서 사라질 때 answer를 리턴해줬다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/43162

네트워크
문제 설명

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항

컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
computer[i][i]는 항상 1입니다.

입출력 예

n	computers	return
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1

*/

function solution(n, computers) {
  var answer = 0;
  let network = new Array(n).fill(false);
  let queue = [];
  const eq = (num) => queue.push(num),
    dq = () => queue.shift();

  for (let i = 0; i < n; i++) {
    if (network[i] === false) {
      eq(computers[i]);
      while (queue.length > 0) {
        let arr = dq();
        arr.forEach((el, j) => {
          if (el === 1 && network[j] === false && i !== j) {
            eq(computers[j]);
            network[j] = true;
          }
        });
      }
      answer++;
    }
  }
  return answer;
}

/*
dfs/bfs 문제이고 내가 푼 방식은 너비우선 방식으로 문제를 풀었다.
먼저 큐를 만들어주고 반복문으로 n만큼 돌리면서 사용한 네트워크인지 확인해서 사용하지 않았다면 큐에 네트워크 배열을 넣어주고 큐의 길이가 0이 될때까지 while 반복문을 이용하여 돌려줬다. 그러면서 사용하지 않은 네트워크들을 큐에 넣어줬고 while 반복이 끝날 때 answer에 1을 더해줬다. 그 뒤 반복문이 반복되도 이미 사용한 네트워크라면 넘어가게 되고 사용하지 않은 네트워크라면 answer를 늘려가면서 마지막에 answer를 리턴해줬다.
*/
