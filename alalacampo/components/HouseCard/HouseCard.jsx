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
}) {
  const Calendar = dynamic(() => import("./Calendar/Calendar"), {
    loading: () => <p className={s.cargando}>Cargando...</p>,
    ssr: false,
  });

  const [showCalendar, setShowCalendar] = useState({
    arauco: false,
    coratina: false,
    aloreña: false,
  });

  const handleShowCalendar = () => {
    setShowCalendar((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <div
        className={
          showCalendar.arauco || showCalendar.coratina || showCalendar.aloreña
            ? s.container_with_calendar
            : s.container
        }
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
                  <button name="previous" className={s.arrowPrev} onClick={clickHandler}>
                    <FontAwesomeIcon icon={faArrowLeft} width="15px" />
                  </button>
                )
              }
              renderArrowNext={(clickHandler, hasNext, labelPrev) =>
                hasNext && (
                  <button name="next" className={s.arrowNext} onClick={clickHandler}>
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
            {/* ARAUCO */}
            {name === "arauco" && (
              <ul>
                <li>Capacidad para 12-14 personas</li>
                <li>
                  3 habitaciones (1 matrimonial con una cama extra, 1 habitacion
                  con 3 cuchetas, 1 habitacion con una cama y una cucheta, 1
                  sofacama con cama marinera)
                </li>
                <li>3 baños</li>
                <li>Aire acondicionado frio/calor en todos los ambientes</li>
                <li>Televisor con antena</li>
                <li>Horno, microondas</li>
                <li>Hogar a leña</li>
                <li>Heladera exhibidora y freezer</li>
                <li>Parillero amplio, horno chileno</li>
                <li>Mesa de ping pong, mesa de pool, metegol</li>
                <li>Cancha de futbol, cancha de Volley</li>
              </ul>
            )}

            {/* CORATINA */}
            {name === "coratina" && (
              <ul>
                <li>Capacidad para 6-8 personas</li>
                <li>
                  2 habitaciones (1 matrimonial, 1 habitacion con 2 cuchetas, 1
                  sofacama con cama marinera)
                </li>
                <li>1 baño</li>
                <li>Aire acondicionado frio/calor en todos los ambientes</li>
                <li>Totalmente equipada las habitaciones y la cocina</li>
                <li>Televisor con antena</li>
                <li>Horno eléctrico</li>
                <li>Heladera</li>
                <li>Parillero</li>
                <li>Pileta</li>
                <li>Juego de campo</li>
                <li>Estacionamiento cubierto</li>
              </ul>
            )}

            {/* ALOREÑA */}
            {name === "aloreña" && (
              <ul>
                <li>Capacidad para 2-4 personas</li>
                <li>Monoambiente</li>
                <li>1 baño</li>
                <li>Aire acondicionado frio/calor</li>
                <li>Totalmente equipada las habitaciones y la cocina</li>
                <li>Televisor con antena</li>
                <li>Horno eléctrico</li>
                <li>Heladera</li>
                <li>Parillero</li>
                <li>Pileta</li>
                <li>Juego de campo</li>
                <li>Estacionamiento cubierto</li>
              </ul>
            )}
            {/* <div className={s.button_container}>
              <button onClick={() => handleClick(name)}>CONSULTAR </button>
            </div> */}
          </div>
          <div className={s.buttons}>
            {showCalendar.arauco ||
            showCalendar.aloreña ||
            showCalendar.coratina ? (
              <button onClick={handleShowCalendar}>CERRAR</button>
            ) : (
              <button onClick={handleShowCalendar}>VER DISPONIBILIDAD</button>
            )}
            <button onClick={() => handleClick(name)}>CONSULTAR </button>
          </div>
        </div>
      </div>
      {name === "arauco" && showCalendar.arauco && (
        <Calendar bookings={bookings.arauco} house="arauco" />
      )}
      {name === "coratina" && showCalendar.coratina && (
        <Calendar bookings={bookings.coratina} house="coratina" />
      )}
      {name === "aloreña" && showCalendar.aloreña && (
        <Calendar bookings={bookings.aloreña} house="aloreña" />
      )}
    </>
  );
}
