import axios from "axios";
import { DotWave } from "@uiball/loaders";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthProvider";
import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";

import s from "./login.module.scss";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (auth.email && auth.accessToken) {
      setLoginErr("Ya estas logueado!");
      return;
    }
    try {
      setLoginErr('');
      setLoading(true);
      const response = await axios.post(
        // "http://localhost:3000/api/login",
        "https://www.alalacampo.com/api/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      setAuth({ email: data.email, accessToken });
      localStorage.setItem("accessToken", accessToken);
      setLoginErr("");
      router.push("/");
    } catch (err) {
      setLoginErr(err?.response?.data?.error);
      setLoading(false)
    }
  };

  return (
    <>
      <div className={s.container}>
        <p className={s.login}>HOLA DE NUEVO!</p>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <input
            autoFocus
            type="text"
            placeholder="nico@gmail.com"
            required
            {...register("email")}
          />
          <input type="password" required {...register("password")} />
          <button type="submit">LOGIN</button>
        </form>
        {loading && (
          <div className={s.loading_container}>
            <DotWave size={47} speed={1} color="#f7de86" />
          </div>
        )}
        <p className={s.err}>{loginErr && loginErr}</p>
      </div>
      <div className={s.footer_container}>
        <Footer />
      </div>
    </>
  );
}
