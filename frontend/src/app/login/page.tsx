"use client";
import { FormikErrors, useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { useState } from "react";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<{ message?: string }>({});

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
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setError({ message: "Incorrect credentials" });
        return;
      }

      router.push("/dashboard");
    },
  });

  return (
    <div className={`${styles.formContainer} container`} >
      <h1 className={styles.title}>Welcome</h1>
      {error.message && <p className={styles.error}>{error.message}</p>}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        
        <div className="form-group">
          <label htmlFor="username" className={styles.inputLabel}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`${styles.inputField} form-control`}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className={styles.error}>{formik.errors.username}</div>
          ) : null}
        </div>
  
        <div className="form-group">
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${styles.inputField} form-control`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.error}>{formik.errors.password}</div>
          ) : null}
        </div>
  
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
