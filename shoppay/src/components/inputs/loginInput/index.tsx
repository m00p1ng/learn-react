import { SyntheticEvent } from "react";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, FieldHookConfig, useField } from "formik";

import styles from "./styles.module.scss";

interface LoginInputProps {
  icon?: "user" | "email" | "password"
  placeholder: string
  type: "text" | "email" | "password"
  name: string
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void
}

export default function LoginInput({
  icon,
  placeholder,
  ...props
}: LoginInputProps) {
  const [field, meta] = useField(props as FieldHookConfig<string>);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      {icon == "user" ? (
        <BiUser />
      ) : icon == "email" ? (
        <SiMinutemailer />
      ) : icon == "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )}
      <input
        placeholder={placeholder}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
