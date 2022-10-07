React Exam

https://www.openbrewerydb.org/documentation/01-listbreweries에 있는 https://api.openbrewerydb.org/breweries api를 호출하여 데이터 표시

# Exam 1

1. <ul><li></li></ul> 태그를 사용하여 카드형으로 리스트 아이템 표시
2. 아이템에 표시할 내용은 name, brewery_type, country, website_url 표시
3. 카드 상단에는 닫기 버튼이 있어서 버튼을 누르면 해당 아이템 가리기 또는 사라지게 하기

# Exam 2

1. exam 1의 1과 동일
2. exam 1의 2와 동일
3. 카드 상단에는 닫기 대신 접기 버튼으로 아이템 접기
4. 스크롤 다운하여 하단에 다다랐을 때 추가적인 브루어리 리스트 가져와서 표시하기 (infinite scroll)

참고:
https://api.openbrewerydb.org/breweries?page=1
https://medium.com/@_diana_lee/react-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-fbd51a8a099f

# Exam 3

1. <table> 태그를 사용하여 테이블 형식으로 아이템 표시
2. 아이템에 표시할 column 내용 name, brewery_type, country, website_url 표시
3. table row를 클릭하면 상세 정보 표시
   -> 표시할 필드: name, brewery_type, country, state, city, phone, website_url
   -> 상세정보 표시는 선택한 row 하단에 확장
4. 여러 페이지 및 추가 아이템 표시는 infinite 스크롤 (기본 per_page=50)

# Exam 4

1. Exam 3의 1과 동일, 단 row 별로 배색처리 (흰색 #fff, 회색 #eee, 흰색, 회색 …)
2. Exam 3의 2와 표시 column 동일, 단 추가로 젤 첫 번째에 순번 ordering column을 추가적으로 표시
3. 상세정보 표시는 modal 형태로 카드형으로 표시
4. pagination 방식으로 표시한다. per_page 값을 25로 지정하고, 페이지는 1 ~ 10 까지만 고정으로 표시하고, 페이지 번호 좌우에 이전, 이후 페이지 이동이 가능하도록 한다. (ex: < 1 2 3 4 5 6 7 8 9 10 >)

# Exam 5

1~4. Exam 4와 동일 5. 테이블 헤더의 column 클릭하면 해당 column 을 기준으로 테이블 아이템 오름차순/내림차순으로 표시
-> 헤더 클릭 시 오름차순 -> 내림차순 -> 정렬 하지 않음 순서대로 반복

# Exam 6

1~5. Exam 5와 동일 단, pagination은 없애고 첫 번째 페이지만 표시 4. Add 기능 추가
—> name, brewery_type, country, state, city, phone, website_url 값 입력 받음
—> 필수 필드 name, brewery_type, 나머지는 선택
(필수 필드 값이 null 이거나 공백문자로 아이템이 추가되지 않도록)
—> brewery_type, country는 select (일명 콤보박스) 로 입력, 나머지는 input

- brewery_type 종류
  micro
  contract
  brewpub
  regional
  planning
  proprietor
- country는 종류는 https://gist.github.com/keeguon/2310008 에 명시된 json 값 이용

# Exam 7

1~6. Exam 6와 동일 4. Update 기능 추가
—> name, brewery_type, country, state, city, phone, website_url 값 입력 받음
—> 필수 필드 name, brewery_type, 나머지는 선택
(필수 필드 값이 null 이거나 공백문자로 아이템이 추가되지 않도록)
—> brewery_type, country는 select (일명 콤보박스) 로 입력, 나머지는 input

- brewery_type 종류
  micro
  contract
  brewpub
  regional
  planning
  proprietor
- country는 종류는 https://gist.github.com/keeguon/2310008 에 명시된 json 값 이용
