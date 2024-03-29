import axios from "axios";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import dbConnect from "../lib/dbConnect";
import Booking from "../models/Booking";
import AuthContext from "../context/AuthProvider";

//COMPONENTS
import Nav from "../components/Nav/Nav";
import Place from "../components/Place/Place";
import Common from "../components/Common/Common";
import HouseCard from "../components/HouseCard/HouseCard";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Map from "../components/MapSection/MapSection";
import Interes from "../components/Interes/Interes";
import Pics from "../components/Pics/Pics";

//IMAGES
import { coratinaImages } from "../utils/coratinPhotos";
import { aloreImages } from "../utils/alorePhotos";
import { araucoImages } from "../utils/araucoPohtos";

import s from "../styles/Home.module.scss";

export default function Home({ bookings }) {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const payload = jwt_decode(accessToken);
      const data = {
        email: payload.email,
        password: payload.password,
      };
      const login = async () => {
        await axios.post(
          // "http://localhost:3000/api/login",
          "https://www.alalacampo.com/api/login",
          data,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      };
      login();
      setAuth({ email: data.email, accessToken });
    }
  }, []);

  const contactRef = useRef(null);
  const inicioRef = useRef(null);
  const casasRef = useRef(null);
  const ubicacionRef = useRef(null);

  const inputRef = useRef(null);

  const [def, setDef] = useState("");

  const handleConsultarClick = (casa) => {
    scrollIntoView(contactRef);

    setDef(`Consulta por ${casa[0].toUpperCase()}${casa.slice(1)}:`);
    inputRef.current.focus();
  };

  const scrollIntoView = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Head>
        <title>Alala Campo</title>
        <meta
          name="description"
          content="San Juan, Pocito. Veni a descansar a Alala Campo! Alquiler de cabañas con pileta."
        />
        <meta
          name="keywords"
          content="San Juan, Pocito, Alala Campo, alquiler, casa, finca, cabaña. "
        />
        <link rel="icon" href="/iconAlala.ico" />
      </Head>

      <main className={s.app_container}>
        <Nav
          scrollIntoView={scrollIntoView}
          inicioRef={inicioRef}
          casasRef={casasRef}
          ubicacionRef={ubicacionRef}
          contactRef={contactRef}
        />
        <div className="app_container">
          <Place />
          <div className={s.body}>
            <Common inicioRef={inicioRef} />
            <p>CASAS</p>
            <HouseCard
              name="arauco"
              images={araucoImages}
              handleClick={handleConsultarClick}
              casasRef={casasRef}
              bookings={bookings.arauco}
            >
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
            </HouseCard>
            <HouseCard
              name="coratina"
              images={coratinaImages}
              handleClick={handleConsultarClick}
              bookings={bookings.coratina}
            >
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
            </HouseCard>
            <HouseCard
              name="aloreña"
              images={aloreImages}
              handleClick={handleConsultarClick}
              bookings={bookings.aloreña}
            >
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
            </HouseCard>

            <Map ubicacionRef={ubicacionRef} />
          </div>
          <Interes />
          <div className={s.body}>
            <Pics />
          </div>
          <Contact contactRef={contactRef} def={def} inputRef={inputRef} />
        </div>
      </main>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const res_arauco = await Booking.find({ house: "arauco" });
    const res_coratina = await Booking.find({ house: "coratina" });
    const res_aloreña = await Booking.find({ house: "aloreña" });

    const arauco = res_arauco.map((doc) => {
      const book = doc.toObject();
      book._id = book._id.toString();
      return book;
    });

    const coratina = res_coratina.map((doc) => {
      const book = doc.toObject();
      book._id = book._id.toString();
      return book;
    });

    const aloreña = res_aloreña.map((doc) => {
      const book = doc.toObject();
      book._id = book._id.toString();
      return book;
    });

    return {
      props: {
        bookings: {
          arauco,
          coratina,
          aloreña,
        },
      },
    };
  } catch (e) {
    console.log(e);
  }
}
