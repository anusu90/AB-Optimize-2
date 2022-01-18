import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@lib/constants";
import { getCurrentExperiment } from "@lib/optimize";

export function middleware(req: NextRequest) {
  let res = NextResponse.next();
  let cookie = req.cookies[COOKIE_NAME];

  if (!cookie) {
    let n = Math.random() * 100;
    const experiment = getCurrentExperiment();
    const variant = experiment.variants.find((v, i) => {
      if (v.weight >= n) return true;
      n -= v.weight;
    });

    console.log("there is no cookie");
    cookie = `${experiment.id}.${variant.id}`;
    console.log("Setting Cookie", cookie);
  }

  const [, variantId] = cookie.split(".");
  const { pathname } = req.nextUrl;
  console.log(pathname, variantId);

  if (["/marketing", "/about", "/login"].includes(pathname)) {
    console.log(pathname);

    res = NextResponse.rewrite(
      // `0` is the original version
      variantId === "0" ? pathname : pathname.replace("/", `/${cookie}/`)
    );
  }

  // Add the cookie if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, cookie);
  }

  return res;
}
