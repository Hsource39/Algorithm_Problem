/*
https://programmers.co.kr/learn/courses/30/lessons/64064

불량 사용자
문제 설명

개발팀 내에서 이벤트 개발을 담당하고 있는 "무지"는 최근 진행된 카카오이모티콘 이벤트에 비정상적인 방법으로 당첨을 시도한 응모자들을 발견하였습니다. 이런 응모자들을 따로 모아 불량 사용자라는 이름으로 목록을 만들어서 당첨 처리 시 제외하도록 이벤트 당첨자 담당자인 "프로도" 에게 전달하려고 합니다. 이 때 개인정보 보호을 위해 사용자 아이디 중 일부 문자를 '' 문자로 가려서 전달했습니다. 가리고자 하는 문자 하나에 '' 문자 하나를 사용하였고 아이디 당 최소 하나 이상의 '*' 문자를 사용하였습니다.
"무지"와 "프로도"는 불량 사용자 목록에 매핑된 응모자 아이디를 제재 아이디 라고 부르기로 하였습니다.

예를 들어, 이벤트에 응모한 전체 사용자 아이디 목록이 다음과 같다면

응모자 아이디
frodo
fradi
crodo
abc123
frodoc

다음과 같이 불량 사용자 아이디 목록이 전달된 경우,

불량 사용자
fr*d*
abc1**

불량 사용자에 매핑되어 당첨에서 제외되어야 야 할 제재 아이디 목록은 다음과 같이 두 가지 경우가 있을 수 있습니다.

제재 아이디
frodo
abc123

제재 아이디
fradi
abc123

이벤트 응모자 아이디 목록이 담긴 배열 user_id와 불량 사용자 아이디 목록이 담긴 배열 banned_id가 매개변수로 주어질 때, 당첨에서 제외되어야 할 제재 아이디 목록은 몇가지 경우의 수가 가능한 지 return 하도록 solution 함수를 완성해주세요.

[제한사항]

user_id 배열의 크기는 1 이상 8 이하입니다.
user_id 배열 각 원소들의 값은 길이가 1 이상 8 이하인 문자열입니다.
응모한 사용자 아이디들은 서로 중복되지 않습니다.
응모한 사용자 아이디는 알파벳 소문자와 숫자로만으로 구성되어 있습니다.
banned_id 배열의 크기는 1 이상 user_id 배열의 크기 이하입니다.
banned_id 배열 각 원소들의 값은 길이가 1 이상 8 이하인 문자열입니다.
불량 사용자 아이디는 알파벳 소문자와 숫자, 가리기 위한 문자 '' 로만 이루어져 있습니다.
불량 사용자 아이디는 '' 문자를 하나 이상 포함하고 있습니다.
불량 사용자 아이디 하나는 응모자 아이디 중 하나에 해당하고 같은 응모자 아이디가 중복해서 제재 아이디 목록에 들어가는 경우는 없습니다.
제재 아이디 목록들을 구했을 때 아이디들이 나열된 순서와 관계없이 아이디 목록의 내용이 동일하다면 같은 것으로 처리하여 하나로 세면 됩니다.

[입출력 예]

user_id	banned_id	result
["frodo", "fradi", "crodo", "abc123", "frodoc"]	["fr*d*", "abc1**"]	2
["frodo", "fradi", "crodo", "abc123", "frodoc"]	["*rodo", "*rodo", "******"]	2
["frodo", "fradi", "crodo", "abc123", "frodoc"]	["fr*d*", "*rodo", "******", "******"]	3
입출력 예에 대한 설명

입출력 예 #1
문제 설명과 같습니다.

입출력 예 #2
다음과 같이 두 가지 경우가 있습니다.

제재 아이디
frodo
crodo
abc123

제재 아이디
frodo
crodo
frodoc

입출력 예 #3
다음과 같이 세 가지 경우가 있습니다.

제재 아이디
frodo
crodo
abc123
frodoc

제재 아이디
fradi
crodo
abc123
frodoc

제재 아이디
fradi
frodo
abc123
frodoc
*/

function solution(user_id, banned_id) {
  var answer = 0;
  const userC = combination(user_id, banned_id.length);

  for (let arr of userC) {
    const banList = [];

    banned_id.forEach((banId, i) => {
      banList[i] = { ban: banId, user: [] };
    });
    for (let i = 0; i < banList.length; i++) {
      for (let user of arr) {
        if (check(user, banList[i].ban)) {
          banList[i].user.push(user);
        }
      }
    }
    banList.sort((a, b) => a.user.length - b.user.length);
    let usingId = [];

    for (let ban of banList) {
      ban.user = ban.user.filter(el => usingId.indexOf(el) === -1);
      if (ban.user.length === 0) {
        continue;
      } else {
        usingId.push(ban.user[0]);
      }
    }
    if (usingId.length === banList.length) answer++;
  }

  return answer;
}

function combination(arr, selectNum) {
  const result = [];
  if (selectNum === 1) return arr.map(v => [v]);
  arr.forEach((v, idx, arr) => {
    const fixed = v;
    const restArr = arr.slice(idx + 1);
    const combinationArr = combination(restArr, selectNum - 1);
    const combineFix = combinationArr.map(v => [fixed, ...v]);
    result.push(...combineFix);
  });
  return result;
}

function check(name, ban) {
  if (name.length !== ban.length) {
    return false;
  }
  for (let i = 0; i < ban.length; i++) {
    if (name[i] !== ban[i] && ban[i] !== "*") {
      return false;
    }
  }
  return true;
}

/*
문제를 어떻게 풀까 고민하다가 먼저 제재 아이디를 보니 조합을 이용해서 모든 경우의 수를 꺼내볼 수 있다고 생각했다.

모든 경우의 수 구하기
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
다음과 같은 방법으로 모든 유저들 중 밴 유저 수만큼 조합으로 만들어줬다.

그리고 나서 조합들의 유저들을 밴유저인지 확인하는 함수를 만들어서 둘의 관계를 확인했다.

밴 유저인지 확인하는 함수
function check(name, ban) {
            if(name.length !== ban.length) {
                return false;
            }
            for(let i = 0; i<ban.length; i++) {
                if(name[i] !== ban[i] && ban[i] !== "*") {
                    return false;
                }
            }
            return true;
        }
그리고 밴리스트를 새로 만들었다. 밴 아이디와 유저들을 모을수 있는 객체 형태로

const banList = [];
    
    banned_id.forEach((banId,i) => {
        banList[i] = {ban:banId,user:[]};
    })
밴아이디 확인 이중반복문을 돌려서 밴아이디에 해당하는 경우 객체 user 키 배열에 유저 아이디를 넣어줬다.

for(let i = 0; i<banList.length; i++) {
            for(let user of arr) {
                if(check(user,banList[i].ban)) {
                    banList[i].user.push(user)
                }
            }
        }
이중 반복문이 끝나면 밴리스트를 정렬하는데 유저의 수가 적은 숫자가 앞으로 가게 정렬을 해주고 사용한 유저 배열을 하나 만들어주고 밴리스트를 반복문으로 돌려서 확인한다.

banList.sort((a,b) => a.user.length - b.user.length)
        let usingId = [];
        
        for(let ban of banList) {
            ban.user = ban.user.filter(el => usingId.indexOf(el) === -1)
            if(ban.user.length === 0) {
                break;
            }
            else {
                usingId.push(ban.user[0])
            }
        }
        if(usingId.length === banList.length) answer++
    }
먼저 사용한 유저가 있는지 필터링하고 길이가 0이라면 멈춘 뒤 밴리스트 개수와 유저아이디 사용 개수가 같다면 정답에 더해주는 방식으로 했다.

문제를 다 풀고 다시 풀이를 하면서 많이 이상한 부분과 부족한 부분이 눈에 보였다. 다시 한번 더 깔끔하게 문제를 풀어봐야겠다.
*/
