/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement } from 'react';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { enableNextSsr } from '@uniformdev/context-next';
// @ts-ignore: It is assumed that each application implements the createUniformContext function at the appropriate location
import createUniformContext from '@/context/createUniformContext';

type CustomDocumentProps = DocumentInitialProps;

class AppDocument extends Document<CustomDocumentProps> {
  // Docs: https://docs.uniform.app/docs/guides/personalization/activate-personalization#server-side
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const serverTracker = createUniformContext(ctx);
    enableNextSsr(ctx, serverTracker);
    return await Document.getInitialProps(ctx);
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
