import React from "react";
import s from "./Footer.module.scss";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className={s.container}>
      <p>ALALA CAMPO</p>
      <div>
        <a
          href="https://www.linkedin.com/in/facundo-pellicer-full-stack-developer/"
          target="_blank"
          rel="noreferrer"
        >
          made with{" "}
          <FontAwesomeIcon icon={faHeart} width="15px" height="15px" />{" "}
          by Facundo Pellicer
        </a>
      </div>
    </footer>
  );
}
