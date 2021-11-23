# MyLoa

## ✨ Introduction

### LOST ARK 게임의 일일/주간 컨텐츠 관리를 편하게 해주는 웹사이트입니다.

-   캐릭터 정보
    -   로스트아크 공식 홈페이지 전투 정보실 정보를 크롤링 해옵니다.
    -   갱신은 캐릭터 수정 화면 우측 상단 갱신 버튼으로 가능합니다.
-   숙제 체크
    -   체크박스 또는 텍스트로 관리
    -   일일 컨텐츠 : 6시 자동 초기화 및 휴식 게이지 계산
    -   주간 컨텐츠 : 매주 6시 초기화
    -   캐릭터 별 가디언 단계 선택, 에포나 퀘스트 명 입력 가능
-   일일 컨텐츠, 주간 컨텐츠 조회
-   다양한 색상 테마 선택 가능!

## 👨‍💻 Tech stack

![](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=black)
![](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=black)
![](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=black)
![](https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=black)

## ❔ Description

-   데이터
    -   캐릭터 및 숙제 데이터는 로컬 브라우저 저장소에 저장됩니다. 데이터 백업으로 서버에 저장하여 다른 브라우저에 일회성으로 불러올 수는 있지만, 동기화 되지 않습니다.
-   공통
    -   숙제 영역 좌/우측 상단의 추가 버튼으로 컨텐츠 및 캐릭터를 추가합니다.
-   관리

    -   각 항목 마우스 오른쪽 클릭으로 수정할 수 있습니다. (모바일로 접속했을 경우는 터치)

    ![우클릭](https://user-images.githubusercontent.com/74941162/142993839-dc4afc21-6f37-4aca-8c04-f1df216470df.gif)

-   체크박스 체크 시 휴식게이지는 바로 계산됩니다.
-   가디언 토벌, 에포나 : 캐릭터 별 개별 설정 가능합니다.
    ![select](https://user-images.githubusercontent.com/74941162/142993534-685d2f8a-575d-47ac-9a54-c4bffb11f812.gif)

-   체크박스 방식과 텍스트 방식으로 체크 가능합니다! - 아브 데자뷰, 아르고스 : [숙제유형 : 체크박스형 - 주간]으로 선택하여 매주 수요일에 초기화되는 숙제입니다. - 페르마타 뽑기 : [숙제유형 : 체크박스형 - 일일, 컨텐츠 : 초기화 O]으로 설정하여 매일 초기화되는 숙제입니다. - 큐브, 회랑 : [숙제유형 : 텍스트]로 설정한 모습입니다.
    ![사용법](https://user-images.githubusercontent.com/74941162/142994397-caad80bd-7585-4812-8346-c17f9c3b75b9.PNG)

-   일일 컨텐츠 조회 (헤더 영역 좌상단)
    ![일일 컨텐츠](https://user-images.githubusercontent.com/74941162/142995456-40d4f3f7-5876-4294-ae2d-4a4717d422ec.PNG)

-   주간 컨텐츠 조회(헤더 영역 좌상단)
    ![주간 컨텐츠](https://user-images.githubusercontent.com/74941162/142995475-4ae34e03-9a81-423e-991c-de6e5deb29be.PNG)

-   다양한 테마가 준비되어있습니다.
    ![테마들](https://user-images.githubusercontent.com/74941162/142996953-e90fc1e8-6357-426c-bbf3-0baa8e3a393d.PNG)

## ✨ Install

```
$ yarn install
```

## 💻 Deploy

1. Heroku

```
$ heroku login
$ heroku git:clone -a [project_name]

$ git add .
$ git commit -am 'commit message'

$ git push heroku master
```

-   git push heroku master 커맨드에서 오류가 날 경우

```
$ git push heroku HEAD:master
```

-   프로젝트에 Postgresql Add-on 추가 후, Heroku Project Config Vars 작성
    Keys:

```
DATABASE_URL
PORT
POSTGRESQL_DATABASE
POSTGRESQL_HOST
POSTGRESQL_PASSWORD
POSTGRESQL_PORT
POSTGRESQL_USER
TZ
```

2. Google Analytics, Google Tag Manager 연동 후 Tracking ID를 Heroku Project Config Vars에 추가로 작성

Keys:

```
GA_TRACKING_ID
```

## 📄 License

This project is licensed under the terms of the MIT license.
