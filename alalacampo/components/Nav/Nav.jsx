import React from "react";
import s from "./Nav.module.scss";
import logo from "../../public/media/logo/alalaLogo.png";
import Image from "next/image";

export default function Nav({
  scrollIntoView,
  inicioRef,
  casasRef,
  ubicacionRef,
  contactRef,
}) {
  return (
    <nav className={s.nav}>
      <div className={s.container1}>
        <div className={s.container2}>
          <div className={s.logo}>
            <Image src={logo} width="100px" height="40px" alt="logo" objectFit="contain" />
          </div>
          <div className={s.sections_buttons}>
            <div className="md:pr-8">
              <p
                onClick={() => scrollIntoView(inicioRef)}
                className="font-semibold text-white text-2xl font-title "
              >
                INICIO
              </p>
            </div>

            <div className="md:pr-8">
              <p
                onClick={() => scrollIntoView(casasRef)}
                className="font-semibold text-white text-2xl font-title "
              >
                CASAS
              </p>
            </div>

            <div className="md:pr-8">
              <p
                onClick={() => scrollIntoView(ubicacionRef)}
                className="font-semibold text-white text-2xl font-title "
              >
                UBICACIÓN
              </p>
            </div>

            <div className="md:pr-8">
              <p
                onClick={() => scrollIntoView(contactRef)}
                className="font-semibold text-white text-2xl font-title "
              >
                CONTACTO
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
