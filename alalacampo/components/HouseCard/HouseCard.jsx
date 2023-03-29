import Carousel from "nuka-carousel/lib/carousel";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

import s from "./HouseCard.module.scss";

export default function HouseCard({
  name,
  images,
  handleClick,
  casasRef,
  bookings,
  children,
}) {
  const Calendar = dynamic(() => import("./Calendar/Calendar"), {
    loading: () => <p className={s.cargando}>Cargando...</p>,
    ssr: false,
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      <div
        className={showCalendar ? s.container_with_calendar : s.container}
        ref={casasRef}
      >
        <div className={s.grid_container}>
          <div className={s.carousel}>
            <Carousel
              dragging={true}
              swiping={true}
              style={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              defaultControlsConfig={{
                nextButtonStyle: {
                  backgroundColor: "transparent",
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
                },
                prevButtonStyle: {
                  backgroundColor: "transparent",
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
                },
                nextButtonText: (
                  <FontAwesomeIcon icon={faArrowRight} width="15px" />
                ),
                prevButtonText: (
                  <FontAwesomeIcon icon={faArrowLeft} width="15px" />
                ),
                pagingDotsStyle: {
                  padding: "0 2px",
                },
              }}
            >
              {images &&
                images.map((image, i) => (
                  <div key={i}>
                    <Image
                      src={image}
                      alt={image}
                      width={578}
                      height={434}
                      layout="responsive"
                    />
                  </div>
                ))}
            </Carousel>
          </div>
          <div className={s.spec}>
            <p>
              <span>{name.toUpperCase()}</span>
            </p>
            {children}
          </div>
          <div className={s.buttons}>
            {showCalendar ? (
              <button onClick={handleShowCalendar}>CERRAR</button>
            ) : (
              <button onClick={handleShowCalendar}>VER DISPONIBILIDAD</button>
            )}
            <button onClick={() => handleClick(name)}>CONSULTAR </button>
          </div>
        </div>
      </div>
      {showCalendar && <Calendar bookings={bookings} house="arauco" />}
    </>
  );
}
