/*
https://programmers.co.kr/learn/courses/30/lessons/77485?language=javascript
*/

function solution(rows, columns, queries) {
  let answer = [];
  let matrix = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns).fill(0);
  }

  matrix = matrix.map((el, i) => {
    for (let j = 0; j < el.length; j++) {
      el[j] = i * columns + (j + 1);
    }
    return el;
  });

  queries.forEach((query) => {
    const [x1, y1, x2, y2] = query.map((el) => el - 1);
    const queue = [];

    for (let i = 0; i < y2 - y1; i++) queue.push(matrix[x1][y1 + i]);
    for (let i = 0; i < x2 - x1; i++) queue.push(matrix[x1 + i][y2]);
    for (let i = 0; i < y2 - y1; i++) queue.push(matrix[x2][y2 - i]);
    for (let i = 0; i < x2 - x1; i++) queue.push(matrix[x2 - i][y1]);

    queue.unshift(queue.pop());
    answer.push(Math.min(...queue));

    for (let i = 0; i < y2 - y1; i++) matrix[x1][y1 + i] = queue.shift();
    for (let i = 0; i < x2 - x1; i++) matrix[x1 + i][y2] = queue.shift();
    for (let i = 0; i < y2 - y1; i++) matrix[x2][y2 - i] = queue.shift();
    for (let i = 0; i < x2 - x1; i++) matrix[x2 - i][y1] = queue.shift();
  });
  return answer;
}

// 2차원 배열 안의 요소를 한방향으로 움직이게 만드는 방법에 대해 알수 있었다.
