# 로요일좋아(LoaDay)

## 🤍 Introduction

![메인](https://user-images.githubusercontent.com/74941162/148641836-42d3acdb-d7fa-47ef-8fca-796a8ec8fae0.PNG)


**LOST ARK 게임의 일일/주간 컨텐츠 관리를 편하게 해주는 웹사이트입니다.**

https://loa-day.com

-   **캐릭터 정보**
    -   로스트아크 공식 홈페이지 전투 정보실 정보를 크롤링 해옵니다.
    -   갱신은 캐릭터 수정 화면 우측 상단 갱신 버튼으로 가능합니다.
-   **숙제 체크**
    -   체크박스 또는 텍스트로 관리
    -   일일 컨텐츠 : 6시 **자동 초기화** 및 휴식 게이지 계산
    -   주간 컨텐츠 : 매주 6시 초기화
    -   캐릭터 별 가디언 단계 선택, 에포나 퀘스트 명 입력 가능
-   **일일 컨텐츠, 주간 컨텐츠 조회**
-   **골드 수입 작성, 통계 조회**
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
![](https://img.shields.io/badge/Next-ffffff?style=flat&logo=Next.js&logoColor=black)

<br />

## ✨ Install

```
$ yarn install
```

<br />

## ❔ Description

**1. 숙제 관리**

-   캐릭터

    -   첫 접속 시 캐릭터 명을 입력하면 해당 서버의 모든 캐릭터 정보를 가져옵니다. 캐릭터 정보를 가져와서 골드 수익과 숙제를 작성 할 수 있습니다.

-   데이터
    -   캐릭터 및 숙제 데이터는 로컬 브라우저 저장소에 저장됩니다. 데이터 백업으로 서버에 저장하여 다른 브라우저에 일회성으로 불러올 수는 있지만, 동기화 되지 않습니다.
-   공통
    -   숙제 영역 좌/우측 상단의 추가 버튼으로 컨텐츠 및 캐릭터를 추가합니다.
-   관리
    -   각 항목 마우스 오른쪽 클릭으로 수정할 수 있습니다. (모바일로 접속했을 경우는 터치)<br /><br />
        ![수정방법](https://user-images.githubusercontent.com/74941162/146656008-b95e2981-35d6-4ad2-a0a4-b6b1734fbbcc.gif)

<br/>

-   체크박스 체크 시 휴식게이지는 바로 계산됩니다.
-   가디언 토벌, 에포나 : 캐릭터 별 개별 설정 가능합니다.<br /><br />
    <img src="https://user-images.githubusercontent.com/74941162/146656074-985ecc46-d953-4cde-85e5-2a3c8c7d6054.gif" width="330" height="320"/>

<br/><br/>

-   체크박스 방식과 텍스트 방식으로 체크 가능합니다!

    -   아브 데자뷰, 아르고스 : [숙제유형 : 체크박스형 - 주간]으로 선택하여 매주 수요일에 초기화되는 숙제입니다.
    -   페르마타 뽑기 : [숙제유형 : 체크박스형 - 일일, 컨텐츠 : 초기화 O]으로 설정하여 매일 초기화되는 숙제입니다.
    -   큐브, 회랑 : [숙제유형 : 텍스트]로 설정한 모습입니다.
        <br />

    ![주간 등](https://user-images.githubusercontent.com/74941162/146656151-ce315448-5671-4f06-ac55-5d3790e0f521.PNG)

<br /><br/>

**2. 골드 가계부**
<br /><br/>

- 리스트를 클릭하여 공통 또는 캐릭터 별 골드 수입 및 지출을 작성합니다.
    ![골드 수입 지출 내역](https://user-images.githubusercontent.com/74941162/148641864-70a40434-4925-4abb-807c-37d79491a070.PNG)


- 캐릭터 수입 작성 모달입니다. 공통 골드 입력 화면도 동일합니다. 요일 별로 요약하여 보여줍니다.
    <img src="https://user-images.githubusercontent.com/74941162/148641876-dc223593-fba0-41a1-a20d-7235fcb82213.PNG" width="550" height="500"/>
    
    
- 수입 및 지출을 작성하여 상단에서 요약 데이터 정보를 확인 할 수 있습니다. 
    ![이번주요약](https://user-images.githubusercontent.com/74941162/148641943-362b6243-8355-48f9-87ad-dc6fd2f32935.PNG)


<br/>

**3. 가계부 통계**

- 지난 5주간 얻은 수익에 대한 통계를 표시하는 페이지입니다.<br/>
- 이번 주 골드 총 합 및 순위 : 이번 주의 수입 또는 지출을 요약하여 보여줍니다.
    <img src="https://user-images.githubusercontent.com/74941162/148641982-a4d8f2af-a160-4d9b-873c-c8e7d2a53bdd.PNG" width="550" height="320"/>
    <img src="https://user-images.githubusercontent.com/74941162/148641993-e00f3550-cd43-406b-a88a-62fc68989243.PNG" width="550" height="320"/>



<br/>

-   각 종 수입, 지출 데이터 통계를 그래프로 표시합니다.
    ![캐릭별 통계](https://user-images.githubusercontent.com/74941162/148642018-43c20815-dea5-4622-84b2-1a3fdd87bf2d.PNG)
    <img src="https://user-images.githubusercontent.com/74941162/148642242-19797ff4-2cb6-4c5b-9c5c-ac8430c8c138.PNG" width="550" height="500"/>


<br/>

<br/>

-   주간, 일일 컨텐츠 조회 (헤더 영역 우상단)<br /><br />
    <img src="https://user-images.githubusercontent.com/74941162/146656197-3fc7180e-9af7-46ec-9dbd-ea01d94f1b15.PNG" width="350" height="350"/> <img src="https://user-images.githubusercontent.com/74941162/146656199-c232002a-7bf7-4570-ae06-37b8621f1050.PNG" width="320" height="220"/>
    <br/>

-   다양한 테마가 준비되어있습니다!<br />

<br />

## 📱 Responisve web

-   반응형 디자인으로 제작되었습니다.

    -   desktop, tablet, mobile

      <img src="https://user-images.githubusercontent.com/74941162/146656287-7de1c219-23bc-4adb-883f-20888dc8a1f8.PNG" width="940" height="510"/>

      <img src="https://user-images.githubusercontent.com/74941162/146656285-ebf231de-d63d-49e3-89dd-8e689b719c76.PNG" width="720" height="444"/>

      <img src="https://user-images.githubusercontent.com/74941162/146656289-4efe78a9-9047-45c8-8eec-a3396f28dc41.PNG" width="290" height="480"/>
      <img src="https://user-images.githubusercontent.com/74941162/146656284-51e8b450-b0ae-450b-9d44-7470cfd19fa2.PNG" width="290" height="480"/>

<br />

## 💻 Deploy

-   환경변수

    -   로컬 세팅 시 : [dotenv](https://www.npmjs.com/package/dotenv) npm 사용
    -   실서버 배포 시 : Heroku Config Var 세팅

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

-   Heroku 배포
    -   Postgresql: 프로젝트에 Postgresql Add-on 추가 후, Heroku Project Config Vars 작성
    -   Google Analytics, Google Tag Manager 연동 후 Tracking ID를 Heroku Project Config Vars에 추가로 작성

Keys:
` GA_TRACKING_ID `

-   배포 커맨드([Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli))

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
