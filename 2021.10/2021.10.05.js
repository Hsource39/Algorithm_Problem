/*
https://programmers.co.kr/learn/courses/30/lessons/17679

[1차] 프렌즈4블록
문제 설명

프렌즈4블록
블라인드 공채를 통과한 신입 사원 라이언은 신규 게임 개발 업무를 맡게 되었다. 이번에 출시할 게임 제목은 "프렌즈4블록".
같은 모양의 카카오프렌즈 블록이 2×2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임이다.



만약 판이 위와 같이 주어질 경우, 라이언이 2×2로 배치된 7개 블록과 콘이 2×2로 배치된 4개 블록이 지워진다. 같은 블록은 여러 2×2에 포함될 수 있으며, 지워지는 조건에 만족하는 2×2 모양이 여러 개 있다면 한꺼번에 지워진다.



블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채우게 된다.



만약 빈 공간을 채운 후에 다시 2×2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지고를 반복하게 된다.



위 초기 배치를 문자로 표시하면 아래와 같다.

TTTANT
RRFACC
RRRFCC
TRRRAA
TTMMMF
TMMTTJ
각 문자는 라이언(R), 무지(M), 어피치(A), 프로도(F), 네오(N), 튜브(T), 제이지(J), 콘(C)을 의미한다

입력으로 블록의 첫 배치가 주어졌을 때, 지워지는 블록은 모두 몇 개인지 판단하는 프로그램을 제작하라.

입력 형식

입력으로 판의 높이 m, 폭 n과 판의 배치 정보 board가 들어온다.
2 ≦ n, m ≦ 30
board는 길이 n인 문자열 m개의 배열로 주어진다. 블록을 나타내는 문자는 대문자 A에서 Z가 사용된다.

출력 형식

입력으로 주어진 판 정보를 가지고 몇 개의 블록이 지워질지 출력하라.

입출력 예제

m	n	board	answer
4	5	["CCBDE", "AAADE", "AAABF", "CCBBF"]	14
6	6	["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]	15
예제에 대한 설명

입출력 예제 1의 경우, 첫 번째에는 A 블록 6개가 지워지고, 두 번째에는 B 블록 4개와 C 블록 4개가 지워져, 모두 14개의 블록이 지워진다.
입출력 예제 2는 본문 설명에 있는 그림을 옮긴 것이다. 11개와 4개의 블록이 차례로 지워지며, 모두 15개의 블록이 지워진다.
*/

function solution(m, n, board) {
  var answer = 0;
  board = board.map((el) => el.split(""));
  let square = checkTBT(board, m, n);

  while (square.length > 0) {
    answer += makeScore(board, square);
    board = moveB(board, m, n);
    square = checkTBT(board, m, n);
  }

  return answer;
}

const checkTBT = (arr, m, n) => {
  let square = [];
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      let c = arr[i][j];
      if (c === 0) continue;
      if (
        c === arr[i - 1][j] &&
        c === arr[i - 1][j - 1] &&
        c === arr[i][j - 1]
      ) {
        square.push([i, j]);
      }
    }
  }
  return square;
};

const makeScore = (arr, coord) => {
  let score = 0;
  while (coord.length > 0) {
    let c = coord.shift();
    if (arr[c[0]][c[1]] !== 0) {
      score++;
      arr[c[0]][c[1]] = 0;
    }
    if (arr[c[0] - 1][c[1]] !== 0) {
      score++;
      arr[c[0] - 1][c[1]] = 0;
    }
    if (arr[c[0] - 1][c[1] - 1] !== 0) {
      score++;
      arr[c[0] - 1][c[1] - 1] = 0;
    }
    if (arr[c[0]][c[1] - 1] !== 0) {
      score++;
      arr[c[0]][c[1] - 1] = 0;
    }
  }
  return score;
};

const moveB = (arr, m, n) => {
  for (let i = 0; i < n; i++) {
    for (let j = m - 1; j > 0; j--) {
      let c = arr[j][i];
      if (c === 0) {
        for (let k = j - 1; k >= 0; k--) {
          if (arr[k][i] !== 0) {
            arr[j][i] = arr[k][i];
            arr[k][i] = 0;
            break;
          }
        }
      }
    }
  }
  return arr;
};

/*
문제를 해결하기 위해선 3가지가 필요하다고 생각했다.

2X2 블록 찾기

2X2 블록 없애기

빈공간에 위의 블록 내려주기

3가지를 각각 함수로 만들어줬고 문제는 해결되었다.

하지만 더 나은 방법이 있을까 고민해봐야할 것같다. 내가 만든 알고리즘이 요구하는 정답과 일치할까 라는 생각을 했을 때 더 나은 방법이 있지 않을까라는 생각이 계속 들었다.

먼저 solution 함수의 경우 위의 1,2,3을 반복시켜줘야했기에 반복문을 이용했다.

function solution(m, n, board) {
    var answer = 0;
    board = board.map(el => el.split(""))
    let square = checkTBT(board,m,n)
    
    while(square.length > 0) {
        answer += makeScore(board,square)
        board = moveB(board,m,n)
        square = checkTBT(board,m,n)
    }
    
    return answer;
}
가장 먼저 2X2 블록이 있을 경우 정답을 없애줘야하기 때문에 먼저 checkTBT 함수를 활용했다.
그 뒤 square의 길이가 (square함수의 리턴 값은 밑에 말하겠지만 2X2 가 형성되는 좌표의 배열이다) 0보다 클 경우에만 좌표에 맞춰서 정답 블록을 지워줬다.

const checkTBT = (arr,m,n) => {
    let square = [];
    for (let i = 1; i<m; i++) {
        for (let j = 1; j<n; j++) {
            let c = arr[i][j]
            if(c === 0) continue;
            if(c === arr[i-1][j] && c === arr[i-1][j-1] && c === arr[i][j-1]) {
                square.push([i,j])
            }
        }
    }
    return square
}
checkTBT 함수 이차원 배열을 왕래하면서 2X2 블록을 찾는다. 좌표 [i][j]의 값이 0 이 아닌경우(블록을 지우면 0을 넣기로 했다.) 좌상,상,좌 의 블록 값과 같다면 좌표 [i][j]을 square에 넣어줬고 마지막으로 좌표들을 리턴한다.

const makeScore = (arr,coord) => {
    let score = 0;
    while (coord.length > 0) {
        let c = coord.shift();
        if(arr[c[0]][c[1]] !== 0) {
            score ++;
            arr[c[0]][c[1]] = 0;
        }
        if(arr[c[0]-1][c[1]] !== 0) {
            score ++;
            arr[c[0]-1][c[1]] = 0
        }
        if(arr[c[0]-1][c[1]-1] !== 0) {
            score ++;
            arr[c[0]-1][c[1]-1] = 0
        }
        if(arr[c[0]][c[1]-1] !== 0) {
            score ++;
            arr[c[0]][c[1]-1] = 0
        }
    }
    return score;
}
좌표들을 파라미터로 받고 하나씩 없애주면서 좌표들이 0이 아닐 경우 score++ 과 좌표를 0으로 만들어주는 함수
겹치는 부분이 있을 수 있기 때문에 각각 모두 넣어주는 것으로 했다. 좌표가 끝난다면 score을 리턴된 값을 정답 값에 더해준다.

const moveB = (arr,m,n) => {
    for (let i = 0; i<n; i++) {
        for (let j = m-1; j>0; j--) {
            let c = arr[j][i]
            if(c === 0) {
                for (let k = j-1; k>=0; k--) {
                    if(arr[k][i] !== 0) {
                        arr[j][i] = arr[k][i];
                        arr[k][i] = 0
                        break;
                    }
                }
            }  
        }
    }
    return arr;
}
마지막 빈 공간을 윗블록으로 내리는 함수

좌표 arr[i][j]가 0일 경우 자신보다 위에 높이에 블록이 있는지 확인하는 반복문을 하나 더 집어넣게 되었다.
이 함수의 경우 2차원 배열의 밑에서부터 올라가는 방식으로 했다.

위의 세가지 함수가 끝나면 계속해서 반복 square 값이 0이 될 때까지(더이상 정답이 없을 때 까지)반복문을 돌려주면 답이 나온다.
*/
