import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <div id="modal-root"></div>
                </body>
                <NextScript />
            </Html>
        );
    }
}
