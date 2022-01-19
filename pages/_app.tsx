import type { AppProps } from "next/app";
import type { LayoutProps } from "@vercel/examples-ui/layout";
import { getLayout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";
import GoogleAnalytics from "../lib/google-analytics";

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <Layout
      title="AB testing with Google Optimize"
      path="edge-functions/ab-testing-google-optimize"
    >
      <Component {...pageProps} />
      <GoogleAnalytics />
    </Layout>
  );
}
