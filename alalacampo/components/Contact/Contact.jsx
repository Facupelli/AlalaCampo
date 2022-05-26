import React from "react";
import { useForm } from "react-hook-form";
import s from "./Contact.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
// import apiKey from "../../utils/emailKey";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

emailjs.init(process.env.REACT_APP_USER_ID);

const schema = yup.object().shape({
  name: yup.string().required().min(2),
  phone: yup.number().required().min(10),
  email: yup.string().required().email(),
  message: yup.string().required().min(2).max(50),
});

export default function  Contact ({ contactRef, def, inputRef }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID ,
          process.env.REACT_APP_TEMPLATE_ID,
          data
        )
        .then(
          (response) => {
            console.log("SUCCESS", response.status, response.text);
            alert("Email enviado! Pronto nos contactaremos!");
          },
          (error) => {
            console.log("FAILED...", error);
            alert("Error, por favor intente de nuevo.", error);
          }
        );

      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  console.log("ERRORS:", errors);

  return (
    <div className={s.contact} ref={contactRef}>
      <div>
        <p>CONTACTO</p>
        <div className={s.gridContainer}>
          <div className={s.form}>
            <form onSubmit={handleSubmit(onSubmit)} id="myForm">
              <div className={s.form__group}>
                <input
                  {...register("name")}
                  type="input"
                  placeholder="Nombre"
                  className={s.form__field}
                  name="name"
                  id="name"
                  required
                />
                <label className={s.form__label}>Nombre</label>
              </div>
              <span>{errors && errors.name?.message}</span>

              <div className={s.form__group}>
                <input
                  {...register("phone")}
                  type="input"
                  name="phone"
                  placeholder="Telefono"
                  className={s.form__field}
                />
                <label className={s.form__label}>Telefono</label>
              </div>
              <span>{errors && errors.phone?.message}</span>

              <div className={s.form__group}>
                <input
                  {...register("email")}
                  type="input"
                  name="email"
                  placeholder="Email"
                  className={s.form__field}
                />
                <label className={s.form__label}>Email</label>
              </div>
              <span>{errors && errors.email?.message}</span>

              <div className={s.form__group} ref={inputRef}>
                <textarea
                  {...register("message")}
                  type="input"
                  name="message"
                  placeholder="Mensaje"
                  className={s.form__field}
                  defaultValue={def}
                  
                />
                <label className={s.form__label}>Mensaje</label>
              </div>
              <span>{errors && errors.message?.message}</span>

              <div className={s.button_container}>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
          <div className={s.email}>
            <p>
              Por favor no dudes en consultarnos, ya sea por mail o por teléfono.
            </p>
            <div>
              <FontAwesomeIcon icon={faEnvelope} width="30px" />
              <p>
                <span>info</span>@alalacampo.com
              </p>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} width="30px" />
              <p>(264) 4391292</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
