import axios from "axios";
import { useEffect, useRef, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthProvider";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   const emailRef = useRef(null)

  //   useEffect(() => {
  //     emailRef.current.focus()
  //   },[])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ email: data.email, pwd: data.password, accessToken });
      setLoginErr('');
    } catch (e) {
      setLoginErr(e?.response?.data?.error);
    }
  };

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoFocus
          type="text"
          placeholder="nico@gmail.com"
          required
          {...register("email")}
        />
        <input type="password" required {...register("password")} />
        <button type="submit">login</button>
      </form>
      <p>{loginErr && loginErr}</p>
    </div>
  );
}
