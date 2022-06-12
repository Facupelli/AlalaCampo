import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import dynamic from "next/dynamic";

import s from "./HouseCard.module.scss";
import { useState } from "react";

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
              showIndicators={false}
              dynamicHeight={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                hasPrev && (
                  <button
                    aria-label="previous"
                    className={s.arrowPrev}
                    onClick={clickHandler}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} width="15px" />
                  </button>
                )
              }
              renderArrowNext={(clickHandler, hasNext, labelPrev) =>
                hasNext && (
                  <button
                    aria-label="next"
                    className={s.arrowNext}
                    onClick={clickHandler}
                  >
                    <FontAwesomeIcon icon={faArrowRight} width="15px" />
                  </button>
                )
              }
              // renderThumbs={() =>
              //   images.map((image, i) => <Image src={image} alt={image} />)
              // }
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
