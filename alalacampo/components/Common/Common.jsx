import React from "react";
import s from "./Common.module.scss";
import {
  faWifi,
  faTree,
  faWaterLadder,
  faFire,
  faCar,
  faWind,
  faTv,
  faUtensils,
  faVolumeHigh
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Common({inicioRef}) {
  return (
    <div className={s.container} ref={inicioRef}>
      <p>SERVICIOS COMUNES</p>
      <div className={s.grid}>
        <div className={s.column}>
          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faWaterLadder} width="25px" />
            </div>
            <p>Pileta</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faWifi} width="25px" />
            </div>
            <p>Wifi</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faFire} width="25px" />
            </div>
            <p>Parrilla individual</p>
          </div>
        </div>

        <div className={s.column}>
          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faWind} width="25px" />
            </div>
            <p className={s.aire}>Aire Acondicionado frio/calor</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faVolumeHigh} width="25px" />
            </div>
            <p>Alarma monitoreada</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faCar} width="25px" />
            </div>
            <p className={s.aire}>Cochera</p>
          </div>
        </div>

        <div className={s.column}>
          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faTree} width="25px" />
            </div>
            <p>Parquizado</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faUtensils} width="25px" />
            </div>
            <p>Cocina equipada</p>
          </div>

          <div>
            <div className={s.icons}>
              <FontAwesomeIcon icon={faTv} width="25px" />
            </div>
            <p>TV cable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
