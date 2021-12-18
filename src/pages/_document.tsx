import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/static/img/favicon.ico" />
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
