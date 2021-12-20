import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLC2ZF2');
              `,
                        }}
                    />
                    <meta
                        name="description"
                        content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 체크와 숙제를 체크를 편하게 해보세요!"
                    />
                    <link rel="canonical" href="https://loa-day.com" />
                    <link rel="icon" href="/static/img/favicon.ico" />
                    <meta
                        name="keywords"
                        content="로스트아크, 로스트아크 숙제, 로스트아크 유틸, 로스트아크 골드, 로스트아크 계산기, 로아 계산기, 로아 골드, 골드 수입, 골드 수급, 로아, 로요일좋아"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="로요일좋아" />
                    <meta
                        property="og:description"
                        content="로스트 아크 유틸 모음 페이지입니다. 내 캐릭터 골드 수입 체크와 숙제를 체크를 편하게 해보세요!"
                    />
                    <meta property="og:image" content="https://loa-day.com/static/img/logo/logo.png" />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="1200" />
                    <meta property="og:locale" content="ko_KR" />
                    <meta property="og:url" content="https://loa-day.com/" />
                </Head>
                <body>
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-PLC2ZF2"
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        ></iframe>
                    </noscript>
                    <Main />
                    <div id="modal-root"></div>
                </body>
                <NextScript />
            </Html>
        );
    }
}
