/*
function solution(land) {
    let answer = 0;
    
    const dfs = (arr,depth,total,idx = 4) => {
        let len = arr.length;
        if(depth === len) return total
        
        let floor = arr[depth].slice().sort((a,b) => b-a);
        let index = arr[depth].indexOf(floor[0])
        if(idx === index) {
            index = arr[depth].indexOf(floor[1])
        }
        return dfs(arr,depth+1,total+arr[depth][index],index)
    }
    
        let totalnum = dfs(land,0,0)
        if(totalnum>answer) answer = totalnum
    
    return answer;
}
첫번째 틀린 코드
dfs로 풀려고 했지만 전부 다 틀렸다.
*/

/*
https://programmers.co.kr/learn/courses/30/lessons/12913

땅따먹기
문제 설명

땅따먹기 게임을 하려고 합니다. 땅따먹기 게임의 땅(land)은 총 N행 4열로 이루어져 있고, 모든 칸에는 점수가 쓰여 있습니다. 1행부터 땅을 밟으며 한 행씩 내려올 때, 각 행의 4칸 중 한 칸만 밟으면서 내려와야 합니다. 단, 땅따먹기 게임에는 한 행씩 내려올 때, 같은 열을 연속해서 밟을 수 없는 특수 규칙이 있습니다.

예를 들면,

| 1 | 2 | 3 | 5 |

| 5 | 6 | 7 | 8 |

| 4 | 3 | 2 | 1 |

로 땅이 주어졌다면, 1행에서 네번째 칸 (5)를 밟았으면, 2행의 네번째 칸 (8)은 밟을 수 없습니다.

마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 최대값을 return하는 solution 함수를 완성해 주세요. 위 예의 경우, 1행의 네번째 칸 (5), 2행의 세번째 칸 (7), 3행의 첫번째 칸 (4) 땅을 밟아 16점이 최고점이 되므로 16을 return 하면 됩니다.

제한사항

행의 개수 N : 100,000 이하의 자연수
열의 개수는 4개이고, 땅(land)은 2차원 배열로 주어집니다.
점수 : 100 이하의 자연수

입출력 예

land	answer
[[1,2,3,5],[5,6,7,8],[4,3,2,1]]	16

*/

function solution(land) {
  let answer = 0;

  for (let i = 1; i < land.length; i++) {
    land[i] = land[i].map((el, j) => {
      let arr = [];
      for (let k = 0; k < 4; k++) {
        if (k !== j) arr.push(el + land[i - 1][k]);
      }
      return Math.max(...arr);
    });
  }
  answer = Math.max(...land[land.length - 1]);
  return answer;
}

/*
문제를 처음 풀 때 dfs를 이용해서 풀어야한다고 생각했다.

function solution(land) {
    let answer = 0;
    
    const dfs = (arr,depth,total,idx = 4) => {
        let len = arr.length;
        if(depth === len) return total
        
        let floor = arr[depth].slice().sort((a,b) => b-a);
        let index = arr[depth].indexOf(floor[0])
        if(idx === index) {
            index = arr[depth].indexOf(floor[1])
        }
        return dfs(arr,depth+1,total+arr[depth][index],index)
    }
    
        let totalnum = dfs(land,0,0)
        if(totalnum>answer) answer = totalnum
    
    return answer;
}
가장 큰 숫자의 인덱스가 겹치면 두번째 큰 숫자로 인덱스를 바꿔줬는데
예제는 통과했지만 다른 테스트 케이스와 효율성 테스트는 모두 떨어졌다.
다른 방법이 뭐가 있을까 이리저리 고민을 해봤지만 결국 찾아내지 못하고
다른 사람들이 어떻게 풀었는지 문제를 파악했고

문제를 푸는 방식에 대해서 깨달았다.

중요한 점은 위숫자와 밑의 숫자(자신의인덱스를 제외한) 를 더한 값 중 가장 높은 값을 누적하는 것이었다.

예제의 경우
| 1 | 2 | 3 | 5 |

| 5 | 6 | 7 | 8 |

| 4 | 3 | 2 | 1 |

이런식의 땅이 있는데

2번째 땅 5,6,7,8 부터 계산을 시작한다.
5의 경우 자신의 인덱스와 같은 1을 제외한 2,3,5와 모두 각각 더해본 뒤 가장 높은 수인 10이 누적값으로 나왔고 6,7,8을 각각 똑같이 계산해주면
| 1 | 2 | 3 | 5 |

| 10 | 11 | 12 | 11 |

| 4 | 3 | 2 | 1 |

이렇게 바뀌게 된다. 그 뒤 3번째 줄 역시 똑같이 계산을 해주게 되면
|16|15|13|13|

이렇게 바뀌게 되서 가장 마지막에 있는 배열 중 가장 큰 수를 리턴해주면 된다.
*/
