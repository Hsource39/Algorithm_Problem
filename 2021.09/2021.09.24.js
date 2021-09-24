/*
https://programmers.co.kr/learn/courses/30/lessons/17684

[3차] 압축
문제 설명

압축
신입사원 어피치는 카카오톡으로 전송되는 메시지를 압축하여 전송 효율을 높이는 업무를 맡게 되었다. 메시지를 압축하더라도 전달되는 정보가 바뀌어서는 안 되므로, 압축 전의 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘을 구현하기로 했다.

어피치는 여러 압축 알고리즘 중에서 성능이 좋고 구현이 간단한 LZW(Lempel–Ziv–Welch) 압축을 구현하기로 했다. LZW 압축은 1983년 발표된 알고리즘으로, 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용되었다.

LZW 압축은 다음 과정을 거친다.

길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
단계 2로 돌아간다.
압축 알고리즘이 영문 대문자만 처리한다고 할 때, 사전은 다음과 같이 초기화된다. 사전의 색인 번호는 정수값으로 주어지며, 1부터 시작한다고 하자.

색인 번호 1 2 3 ... 24 25 26
단어 A B C ... X Y Z
예를 들어 입력으로 KAKAO가 들어온다고 하자.

현재 사전에는 KAKAO의 첫 글자 K는 등록되어 있으나, 두 번째 글자까지인 KA는 없으므로, 첫 글자 K에 해당하는 색인 번호 11을 출력하고, 다음 글자인 A를 포함한 KA를 사전에 27 번째로 등록한다.
두 번째 글자 A는 사전에 있으나, 세 번째 글자까지인 AK는 사전에 없으므로, A의 색인 번호 1을 출력하고, AK를 사전에 28 번째로 등록한다.
세 번째 글자에서 시작하는 KA가 사전에 있으므로, KA에 해당하는 색인 번호 27을 출력하고, 다음 글자 O를 포함한 KAO를 29 번째로 등록한다.
마지막으로 처리되지 않은 글자 O에 해당하는 색인 번호 15를 출력한다.

현재 입력(w)	다음 글자(c)	출력	사전 추가(w+c)
K	A	11	27: KA
A	K	1	28: AK
KA	O	27	29: KAO
O		15	
이 과정을 거쳐 다섯 글자의 문장 KAKAO가 4개의 색인 번호 [11, 1, 27, 15]로 압축된다.

입력으로 TOBEORNOTTOBEORTOBEORNOT가 들어오면 다음과 같이 압축이 진행된다.

현재 입력(w)	다음 글자(c)	출력	사전 추가(w+c)
T	O	20	27: TO
O	B	15	28: OB
B	E	2	29: BE
E	O	5	30: EO
O	R	15	31: OR
R	N	18	32: RN
N	O	14	33: NO
O	T	15	34: OT
T	T	20	35: TT
TO	B	27	36: TOB
BE	O	29	37: BEO
OR	T	31	38: ORT
TOB	E	36	39: TOBE
EO	R	30	40: EOR
RN	O	32	41: RNO
OT		34	
입력 형식
입력으로 영문 대문자로만 이뤄진 문자열 msg가 주어진다. msg의 길이는 1 글자 이상, 1000 글자 이하이다.

출력 형식
주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.

입출력 예제

msg	answer
KAKAO	[11, 1, 27, 15]
TOBEORNOTTOBEORTOBEORNOT	[20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
ABABABABABABABAB	[1, 2, 27, 29, 28, 31, 30]

*/

function solution(msg) {
  var answer = [];
  let index = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };
  let number = 26;

  const findIdx = (str, c = 1, t = 0) => {
    let tar = str.slice(0, c);
    let a = index[tar];
    if (str === tar && a) {
      answer.push(a);
      return tar.length;
    }

    if (a) {
      t = a;
      return findIdx(str, c + 1, t);
    } else {
      number += 1;
      index[tar] = number;
      answer.push(t);
      return tar.length - 1;
    }
  };

  while (msg.length > 0) {
    let output = findIdx(msg);
    msg = msg.substring(output);
  }

  return answer;
}

/*
재귀를 이용해서 문제를 풀었다.

재귀함수의 탈출 조건은

str(msg)와 타겟이 같으면서 index[tar]가 부정이지 않을 때(값이 있을 때) 리턴해주는 방법을 사용했다.

그리고 index[tar]이 값이 있을 경우 타켓의 길이를 1 늘리는 재귀함수를 사용했다.
값이 없을 경우 index 객체에 타겟을 넣어주고 재귀함수 파라미터t(이전 타겟의 인덱스)를 정답에 넣어준 뒤 리턴 값으로 타겟의 길이 -1 을 줬다.

왜냐하면 반복문의 조건을 msg의 길이가 0보다 클 때 계속 반복하게 하는 while 문으로 진행했고 msg의 앞부분을 제거를 위해 리턴 값을 타겟의 길이 -1 로 한 뒤 그만큼을 제거했다.
*/
