"use client";
import { FormikErrors, useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { useState } from "react";
import {DASHBOARD_ROUTE} from '../routes'
import LoginButton from './components/LoginButton'
import LoginInput from './components/LoginInput'

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.password) {
        errors.password = "Password is equired";
      }
      return errors;
    },
    onSubmit: async (values: FormValues, { setErrors }) => {
      const { username, password } = values;
      const isUsernameEmpty = !username.trim();
      const isPasswordEmpty = !password.trim();
      if (isUsernameEmpty || isPasswordEmpty) {
        const errors: FormikErrors<FormValues> = {};
        if (isUsernameEmpty) {
          errors.username = "Username is required";
        }
        if (isPasswordEmpty) {
          errors.password = "Password is required";
        }
        setErrors(errors);
        setLoading(false);
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setError({ message: "Incorrect credentials" });
        setLoading(false);
        return;
      }

      router.push(DASHBOARD_ROUTE);
    },
  });

  return (
    <div className={`${styles.formContainer} container`} >
      <h1 className={styles.title}>Welcome</h1>
      {error.message && <p className={styles.error}>{error.message}</p>}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
                <LoginInput
                    id="username"
                    label="Username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loading}
                    error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
                />
                <LoginInput
                    id="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loading}
                    error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                />
                <LoginButton type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </LoginButton>
            </form>
    </div>
  );
};

export default LoginPage;
