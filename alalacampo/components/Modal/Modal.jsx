import React, { useEffect } from "react";
import s from "./Modal.module.scss";
import {
  faXmark,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Modal({ setShowModal, img, handleNext, handlePrev }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleClick = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className={s.centered}>
      <div className={s.modal}>
        <div className={s.arrows}>
          <div className={s.button}>
            <FontAwesomeIcon
              onClick={handlePrev}
              icon={faArrowLeft}
              width="25px"
            />
            <FontAwesomeIcon
              onClick={handleNext}
              icon={faArrowRight}
              width="25px"
            />
          </div>
          <div className={s.button} onClick={handleClick}>
            <FontAwesomeIcon icon={faXmark} width="20px" />
          </div>
        </div>
        <div className={s.image_container}>
          <Image
            src={img}
            alt={img}
            width={578}
            height={434}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
