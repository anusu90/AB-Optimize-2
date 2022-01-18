import OptimizeLayout from "@components/layout";
import LoginForm from "@components/login";
import { getCurrentExperiment } from "@lib/optimize";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const router = useRouter();
  const {
    query: { variant },
  } = router;

  const [variantAsState, setVariantAsState] = React.useState(undefined);

  React.useEffect(() => {
    if (variant) {
      const [, variantID] = Array.isArray(variant)
        ? variant[0].split(".")
        : variant.split(".");
      setVariantAsState(variantID);
    } else {
      setVariantAsState(0);
    }

    console.log(variant);
  }, [variant]);

  return (
    <div>
      <div>Login</div>
      {variantAsState === "1" ? (
        <div>
          Variant Form 1
          <div>
            <LoginForm variant={variantAsState} />
          </div>
        </div>
      ) : null}
      {variantAsState === "2" ? (
        <div>
          Variant Form 2
          <div>
            <LoginForm variant={variantAsState} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

Login.Layout = OptimizeLayout;

export default Login;

export async function getStaticPaths() {
  const experiment = getCurrentExperiment();

  return {
    paths: experiment.variants.map((v) => ({
      params: { variant: `${experiment.id}.${v.id}` },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const experiment = getCurrentExperiment();
  const [, variantId] = params.variant.split(".");

  // Here you could fetch any data related only to the variant
  return {
    props: {
      // Only send the experiment data required by the page
      experiment: { name: experiment.name },
      variant: experiment.variants.find((v) => String(v.id) === variantId),
    },
  };
}
