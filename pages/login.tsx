import OptimizeLayout from "@components/layout";
import LoginForm from "@components/login";
import { getCurrentExperiment } from "@lib/optimize";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  return (
    <div>
      <div>Origin Login Page</div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

Login.Layout = OptimizeLayout;

export default Login;
