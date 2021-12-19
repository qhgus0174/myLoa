import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>로요일좋아</title>
                    <meta
                        name="description"
                        content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 확인도 하고 숙제를 편하게 체크해보세요."
                    />
                    <link rel="canonical" href="https://loa-day.com" />
                    <link rel="icon" href="/static/img/favicon.ico" />

                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="로요일좋아" />
                    <meta
                        property="og:description"
                        content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 확인도 하고 숙제를 편하게 체크해보세요."
                    />
                    <meta property="og:image" content="https://loa-day.com/static/img/logo/logo.png" />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="1200" />
                    <meta property="og:locale" content="ko_KR" />
                    <meta property="og:url" content="https://loa-day.com/" />
                </Head>
                <body>
                    <Main />
                    <div id="modal-root"></div>
                </body>
                <NextScript />
            </Html>
        );
    }
}
