# MyLoa

## 🤍 Introduction
![캡처](https://user-images.githubusercontent.com/74941162/143004929-0d2020e2-f1e5-4b3b-a3bf-5e7b16841b90.PNG)

**LOST ARK 게임의 일일/주간 컨텐츠 관리를 편하게 해주는 웹사이트입니다.**
-   **캐릭터 정보**
    -   로스트아크 공식 홈페이지 전투 정보실 정보를 크롤링 해옵니다.
    -   갱신은 캐릭터 수정 화면 우측 상단 갱신 버튼으로 가능합니다.
-  **숙제 체크**
    -   체크박스 또는 텍스트로 관리
    -   일일 컨텐츠 : 6시 **자동 초기화** 및 휴식 게이지 계산
    -   주간 컨텐츠 : 매주 6시 초기화
    -   캐릭터 별 가디언 단계 선택, 에포나 퀘스트 명 입력 가능
-   **일일 컨텐츠, 주간 컨텐츠 조회**
-   **다양한 색상 테마 선택 가능!**
<br />

## ✍ Update Logs
https://north-ravioli-1b6.notion.site/myloa-d2f6981e87c94561a2584ca4adeba08e

<br />

## 👨‍💻 Tech stack

![](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=black)
![](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=black)
![](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=black)
![](https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=black)

<br />

## ❔ Description

-   데이터
    -   캐릭터 및 숙제 데이터는 로컬 브라우저 저장소에 저장됩니다. 데이터 백업으로 서버에 저장하여 다른 브라우저에 일회성으로 불러올 수는 있지만, 동기화 되지 않습니다.
-   공통
    -   숙제 영역 좌/우측 상단의 추가 버튼으로 컨텐츠 및 캐릭터를 추가합니다.
-   관리
    -   각 항목 마우스 오른쪽 클릭으로 수정할 수 있습니다. (모바일로 접속했을 경우는 터치)<br /><br />
        ![우클릭](https://user-images.githubusercontent.com/74941162/142993839-dc4afc21-6f37-4aca-8c04-f1df216470df.gif)
    
<br/>

-   체크박스 체크 시 휴식게이지는 바로 계산됩니다.
-   가디언 토벌, 에포나 : 캐릭터 별 개별 설정 가능합니다.<br /><br />
    <img src="https://user-images.githubusercontent.com/74941162/142993534-685d2f8a-575d-47ac-9a54-c4bffb11f812.gif" width="400" height="320"/>
    
<br/>

-   체크박스 방식과 텍스트 방식으로 체크 가능합니다! 

    - 아브 데자뷰, 아르고스 : [숙제유형 : 체크박스형 - 주간]으로 선택하여 매주 수요일에 초기화되는 숙제입니다. 
    - 페르마타 뽑기 : [숙제유형 : 체크박스형 - 일일, 컨텐츠 : 초기화 O]으로 설정하여 매일 초기화되는 숙제입니다. 
    -  큐브, 회랑 : [숙제유형 : 텍스트]로 설정한 모습입니다.
    <br />
        <img src="https://user-images.githubusercontent.com/74941162/142994397-caad80bd-7585-4812-8346-c17f9c3b75b9.PNG" width="720" height="400"/>
    
<br/>

-   일일 컨텐츠 조회 (헤더 영역 좌상단)<br /><br />
    <img src="https://user-images.githubusercontent.com/74941162/142995456-40d4f3f7-5876-4294-ae2d-4a4717d422ec.PNG" width="300" height="220"/>
    
<br/>

-   주간 컨텐츠 조회(헤더 영역 좌상단)<br /><br />
    <img src="https://user-images.githubusercontent.com/74941162/143069620-a27aaae7-1f3f-43b6-9250-54c5fc032bc9.PNG" width="370" height="330"/>
    
<br/>

-   다양한 테마가 준비되어있습니다!<br />

<br />

## 📱 Responisve web
- 반응형 디자인으로 제작되었습니다.
   - desktop, tablet, mobile


    <img src="https://user-images.githubusercontent.com/74941162/143001351-b9c356b7-7729-45ca-b423-2598ee6f7715.PNG" width="940" height="540"/>

    <img src="https://user-images.githubusercontent.com/74941162/143001365-6a209d09-a3e9-4069-aa9d-285b0809b1aa.PNG" width="629" height="444"/>

    <img src="https://user-images.githubusercontent.com/74941162/143001380-0dfea628-8894-4a71-962e-dab7272ea5b7.PNG" width="290" height="480"/>


<br />

## ✨ Install
```
$ yarn install
```
<br />

## 💻 Deploy

- 환경변수 
    - 로컬 세팅 시 : [dotenv](https://www.npmjs.com/package/dotenv) npm 사용
    - 실서버 배포 시 : Heroku Config Var 세팅

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

- Heroku 배포
    - Postgresql: 프로젝트에 Postgresql Add-on 추가 후, Heroku Project Config Vars 작성
    - Google Analytics, Google Tag Manager 연동 후 Tracking ID를 Heroku Project Config Vars에 추가로 작성

Keys:
    ```
    GA_TRACKING_ID
    ```


- 배포 커맨드([Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli))
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
  


<br />

## 💜 Contact
```
shannon_@hotmail.co.kr
```

## 📄 License

This project is licensed under the terms of the MIT license.
