import React from "react";

import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikConfig,
  FormikValues,
} from "formik";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import { Button } from "@vercel/examples-ui";
import { Box } from "@mui/system";

const LoginForm = (props: any) => {
  const { variant } = props;
  const initalValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  return (
    <Card>
      <CardContent>
        <FormStepper initialValues={initalValues} onSubmit={() => {}}>
          <div>
            <Field name="firstName" component={TextField} label="First Name" />
            <Field name="lastName" component={TextField} label="Second Name" />
          </div>
          {variant === "1" ? (
            <div>
              <Field name="email" component={TextField} label="Email" />
              <Field name="phone" component={TextField} label="Phone" />
            </div>
          ) : null}
          {variant === "2" ? (
            <div>
              <Field
                name="Age"
                component={TextField}
                label="Age"
                type="number"
              />
            </div>
          ) : null}
          <div>
            <Field name="address" component={TextField} label="Address" />
            <Field name="pin" component={TextField} label="PIN" />
            <Box sx={{ margin: "20px 0px" }}>
              <Button>SAVE</Button>
            </Box>
          </div>
        </FormStepper>
      </CardContent>
    </Card>
  );
};

export const FormStepper = ({
  children,
  ...rest
}: FormikConfig<FormikValues>) => {
  const [step, setStep] = React.useState(0);
  const childrenArray = React.Children.toArray(children);
  const lengthOfChildren = childrenArray.length;

  const currentChild = childrenArray[step];

  return (
    <>
      <Box sx={{ display: "flex", margin: "10px 0px" }}>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Previous
        </Button>
        <Box
          sx={{ margin: "0px 20px", display: "flex", alignItems: "center" }}
        >{`Current Step: ${step}`}</Box>
        <Button
          disabled={step === lengthOfChildren - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </Box>
      <Formik {...rest}>
        <Form>{currentChild}</Form>
      </Formik>
    </>
  );
};

export default LoginForm;
