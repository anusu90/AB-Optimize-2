import React from "react";
import { useField } from "formik";

const Input: React.FunctionComponent<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { name } = field;

  return (
    <div>
      <input id={name} type="text" {...field} {...(props as any)} />
      {meta.touched && meta.error && JSON.stringify(meta.error)}
    </div>
  );
};

export default Input;
