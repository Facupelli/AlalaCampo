import React from "react";
import s from "./Interes.module.scss";

export default function Interes() {
  return (
    <div className={s.container}>
      <div>
        <p>PUNTOS DE INTERÉS</p>
        <div className={s.grid_container}>
          <div>
            <ul>
              <li>Centro Ambiental Anchipurac (8km)</li>
              <li>Dique de Ullum(14km)</li>
              <li>Quebrada de Zonda (13km)</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Teatro del Bicentenario (10km)</li>
              <li>Casa de Sarmiento (11km)</li>
              <li>Parque de Mayo (11km)</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Estadio Bicentenario (12km)</li>
              <li>Centro San Juan (10km)</li>
              <li>Restaruante La Salmuera (2km)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
