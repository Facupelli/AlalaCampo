import dynamic from "next/dynamic";

import s from "./MapSection.module.scss";


export default function Map({ ubicacionRef }) {
  const Map = dynamic(() => import("./Map/Map"), {
    loading: () => <p>Map Loading...</p>,
    ssr: false,
  });

  return (
    <div style={{ marginTop: "6rem" }} ref={ubicacionRef}>
      <p style={{ fontSize: "2rem", marginBottom: "3rem" }}>UBICACIÓN</p>
      <div className={s.grid_container}>
        <div>
          <p>
            Alala Campo se encuentra por la Calle Chacabuco, entre calle 5 y
            calle 6. Pocito, San Juan.
          </p>
        </div>

        <div style={{ border: "#e6e6e6 1px solid" }}>
          <Map />
        </div>
      </div>
    </div>
  );
}
