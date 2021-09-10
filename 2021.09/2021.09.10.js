/*
https://programmers.co.kr/learn/courses/30/lessons/17680

[1차] 캐시
문제 설명

캐시
지도개발팀에서 근무하는 제이지는 지도에서 도시 이름을 검색하면 해당 도시와 관련된 맛집 게시물들을 데이터베이스에서 읽어 보여주는 서비스를 개발하고 있다.
이 프로그램의 테스팅 업무를 담당하고 있는 어피치는 서비스를 오픈하기 전 각 로직에 대한 성능 측정을 수행하였는데, 제이지가 작성한 부분 중 데이터베이스에서 게시물을 가져오는 부분의 실행시간이 너무 오래 걸린다는 것을 알게 되었다.
어피치는 제이지에게 해당 로직을 개선하라고 닦달하기 시작하였고, 제이지는 DB 캐시를 적용하여 성능 개선을 시도하고 있지만 캐시 크기를 얼마로 해야 효율적인지 몰라 난감한 상황이다.

어피치에게 시달리는 제이지를 도와, DB 캐시를 적용할 때 캐시 크기에 따른 실행시간 측정 프로그램을 작성하시오.

입력 형식

캐시 크기(cacheSize)와 도시이름 배열(cities)을 입력받는다.
cacheSize는 정수이며, 범위는 0 ≦ cacheSize ≦ 30 이다.
cities는 도시 이름으로 이뤄진 문자열 배열로, 최대 도시 수는 100,000개이다.
각 도시 이름은 공백, 숫자, 특수문자 등이 없는 영문자로 구성되며, 대소문자 구분을 하지 않는다. 도시 이름은 최대 20자로 이루어져 있다.

출력 형식

입력된 도시이름 배열을 순서대로 처리할 때, "총 실행시간"을 출력한다.

조건

캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다.
cache hit일 경우 실행시간은 1이다.
cache miss일 경우 실행시간은 5이다.

입출력 예제

캐시크기(cacheSize)	도시이름(cities)	실행시간
3	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]	50
3	["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]	21
2	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]	60
5	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]	52
2	["Jeju", "Pangyo", "NewYork", "newyork"]	16
0	["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]	25

*/

function solution(cacheSize, cities) {
  var answer = 0;
  let cache = [];
  // 캐시 사이즈가 0일경우 밑의 반복문에 위배되는 경우기 때문에
  // 예외처리로 해줌
  if (cacheSize === 0) {
    return cities.length * 5;
  }
  //cities의 길이로 반복문을 돌리면서
  //캐시에 해당 요소가 없다면 캐시의 길이가 최대인지 확인한 뒤 최대일 경우 가장 처음값을 없애준다.
  //그리고 해당 요소가 있다면 해당요소를 캐시에서 삭제 한 뒤
  //마무리로 해당 요소를 캐시에 넣어준다.
  for (let i = 0; i < cities.length; i++) {
    cities[i] = cities[i].toLowerCase();
    let index = cache.indexOf(cities[i]);
    if (index === -1) {
      if (cache.length === cacheSize) {
        cache.shift();
      }
      answer += 5;
    } else {
      cache.splice(index, 1);
      answer++;
    }
    cache.push(cities[i]);
  }
  return answer;
}

/*
캐시 교체 알고리즘은 LRU(Least Recently Used)은 캐시에 데이터가 없을 때 캐시가 풀이 아닐 경우 가장 최근으로 넣어준다.
캐시가 풀일 경우 가장 먼저 들어간 캐시를 삭제하고 가장 최근으로 데이터를 넣어준다.
데이터가 있을 경우 캐시 안의 그 데이터를 가장 최근으로 옮겨준다.

캐시 사이즈가 0이라면 밑의 반복문에서 데이터를 캐시에 가장 마지막에 넣어주게 되는데 그럴 경우 성립하지 않기 때문에 이 경우만을 예외로 놓고 처리했다.

먼저 cities의 문자열을 전부 소문자 알파벳으로 바꿔준 뒤 캐시에 데이터가 있는 지 확인한다 let index = cache.indexOf(cities[i]) 인덱스가 -1 이라면 캐시에 데이터가 없는 것이고 -1이 아닐 경우 해당 인덱스에 데이터가 존재한다.

인덱스가 -1 일 경우 캐시 배열의 크기와 사이즈가 같다면 캐시 0번째 인덱스를 삭제하고 캐시를 넣어주고
캐시 배열의 크기와 사이즈가 같지 않을 경우 그냥 캐시 배열에 데이터를 넣어주면 된다.
그리고 캐시 배열에 데이터가 없으므로 정답에 5를 더해준다.

인덱스가 -1 이 아닐 경우 캐시 배열의 크기와 상관 없이 캐시 배열에 있는 요소와 데이터가 같기 때문에 캐시 배열에 있는 요소를 없애주고 데이터를 넣어준다. 그리고 1초만 지나기 때문에 정답에 1을 더해준다.

반복문이 끝난 뒤 정답을 리턴해주면 시간이 얼마나 걸리는지 나오게 된다.
*/
