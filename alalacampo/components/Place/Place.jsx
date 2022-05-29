import React from "react";
import introV from "../../public/media/introV.jpeg";
import complejo from "../../public/media/droneResized/comple2.jpg";

import s from "./Place.module.scss";
import Image from "next/image";

export default function Place() {
  return (
    <div className={s.container}>
      <p className={s.text}>ALALA CAMPO VENI A DESCANSAR</p>
      <div className={s.image}>
        <Image src={complejo} priority alt="place" layout="fill" objectFit="cover" objectPosition="100% 10%" />
      </div>
      <div className={s.imageV}>
        <Image src={complejo} alt="place2" layout="fill" objectFit="cover" objectPosition="85% 100%"/>
      </div>
    </div>
  );
}
