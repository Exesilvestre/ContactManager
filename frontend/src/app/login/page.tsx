"use client";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Jhon Doe");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("123123");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const { username, password } = values;

      if (!username || !password) {
        return; // Detenemos la submisión si hay campos vacíos
      }

      const responseNextAuth = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setError("Incorrect credentials");
        return;
      }

      router.push("/dashboard");
    },
  });

  return (
    <div className={`${styles.formContainer} container`} >
      <h1 className={styles.title}>Welcome</h1>
      {error && <p className={styles.error}>{error}</p>}
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
            placeholder={usernamePlaceholder}
          />
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
            placeholder={passwordPlaceholder}
          />
        </div>
  
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
