/*
https://programmers.co.kr/learn/courses/30/lessons/84512

모음 사전
문제 설명

사전에 알파벳 모음 'A', 'E', 'I', 'O', 'U'만을 사용하여 만들 수 있는, 길이 5 이하의 모든 단어가 수록되어 있습니다. 사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA"이며, 마지막 단어는 "UUUUU"입니다.

단어 하나 word가 매개변수로 주어질 때, 이 단어가 사전에서 몇 번째 단어인지 return 하도록 solution 함수를 완성해주세요.

제한사항

word의 길이는 1 이상 5 이하입니다.
word는 알파벳 대문자 'A', 'E', 'I', 'O', 'U'로만 이루어져 있습니다.

입출력 예

word	result
"AAAAE"	6
"AAAE"	10
"I"	1563
"EIO"	1189
입출력 예 설명

입출력 예 #1

사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA", "AAA", "AAAA", "AAAAA", "AAAAE", ... 와 같습니다. "AAAAE"는 사전에서 6번째 단어입니다.

입출력 예 #2

"AAAE"는 "A", "AA", "AAA", "AAAA", "AAAAA", "AAAAE", "AAAAI", "AAAAO", "AAAAU"의 다음인 10번째 단어입니다.

입출력 예 #3

"I"는 1563번째 단어입니다.

입출력 예 #4

"EIO"는 1189번째 단어입니다.
*/

function solution(word) {
  var answer = 0;
  let arr = [781, 156, 31, 6, 1]
  let alpha = ["A","E","I","O","U"]
  
  for (let i = 0; i<word.length; i++) {
      answer += arr[i]*alpha.indexOf(word[i])+1
  }
  return answer;
}

/*
0번째 인덱스가 "A"라면 1 "E"라면 782 "I"라면 1563으로 781 만큼 증가하고
1번째 인덱스는 156, 2번째 인덱스는 32, 3번째 인덱스는 6, 마지막 인덱스는 1 만큼 증가합니다.

word 0번째 인덱스의 문자열부터 alpha 인덱스를 확인한 뒤 arr[i] 를 alpha의 인덱스만큼 더해준 뒤 +1을 해주면 해당 숫자가 나오게 된다.
*/