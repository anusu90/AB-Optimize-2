import React, { FC, useCallback } from "react";
import Script from "next/script";
import { Layout, Page } from "@vercel/examples-ui";
import type { LayoutProps } from "@vercel/examples-ui/layout";
import { GaProvider } from "@lib/useGa";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "@lib/constants";
import { Button } from "@mui/material";

function throwIfSSR() {
  throw new Error("Using GA during SSR is not allowed");
}

function gaHandler() {
  const dataLayer = ((window as any).dataLayer =
    (window as any).dataLayer || []);

  dataLayer.push(arguments);
}

const OptimizeLayout: FC<LayoutProps> = ({ children, ...props }) => {
  const ga = useCallback(
    typeof window === "undefined" ? throwIfSSR : gaHandler,
    []
  );

  const clearCookieAndReload = () => {
    if (typeof window !== undefined) {
      Cookies.remove(COOKIE_NAME);
      window.location.reload();
    }
  };

  return (
    <Layout {...props}>
      <Page>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
          strategy="lazyOnload"
        ></Script>
        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
                `}
        </Script>
        <Script
          src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
        />
        <div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => clearCookieAndReload()}
          >
            CLEAR AND RELOAD
          </Button>
        </div>
        <GaProvider value={ga}>{children}</GaProvider>
      </Page>
    </Layout>
  );
};

export default OptimizeLayout;
