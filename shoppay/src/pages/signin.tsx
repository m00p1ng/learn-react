import Link from 'next/link';
import { useState } from 'react';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import Footer from "@/components/footer";
import Header from "@/components/header";

import styles from "@/styles/signin.module.scss";
import LoginInput from '@/components/inputs/loginInput';
import CircledIconBtn from '@/components/buttons/circledIconBtn';

interface SignInPageProps {
  providers: ClientSafeProvider[];
}

export interface Values {
  login_email: string
  login_password: string
  name: string
  email: string
  password: string
  conf_password: string
  success: string
  error: string
  login_error: string
}

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function SignInPage({ providers }: SignInPageProps) {
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  return (
    <div>
      <Header country={{}} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize={true}
              initialValues={{
                login_email,
                login_password,
                name,
                email,
                password,
                conf_password,
                success,
                error,
                login_error,
              }}
              validationSchema={loginValidation}
            >
              {(props: FormikProps<Values>) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign Up</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize={true}
              initialValues={{
                login_email,
                login_password,
                name,
                email,
                password,
                conf_password,
                success,
                error,
                login_error,
              }}
              validationSchema={registerValidation}
            >
              {(props: FormikProps<Values>) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country={{}} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());

  return {
    props: {
      providers,
    },
  };
}
