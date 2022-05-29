import Head from "next/head";
import { useRef, useState } from "react";
import Nav from "../components/Nav/Nav";
import Place from "../components/Place/Place";
import Common from "../components/Common/Common";
import HouseCard from "../components/HouseCard/HouseCard";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Map from "../components/MapSection/MapSection";
import Interes from "../components/Interes/Interes";
import Pics from "../components/Pics/Pics";
import dbConnect from "../lib/dbConnect";
import Booking from "../models/Booking";

//IMAGES
import { coratinaImages } from "../utils/coratinPhotos";
import { aloreImages } from "../utils/alorePhotos";
import { araucoImages } from "../utils/araucoPohtos";

import s from "../styles/Home.module.scss";

export default function Home({ bookings }) {
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
        <meta name="description" content="San Juan, Pocito, Alala Campo, alquiler casa, finca, cabaña." />
        <link rel="icon" href="/media/alalaLogo.png" />
      </Head>

      <main className={s.app_container}>
        <Nav
          scrollIntoView={scrollIntoView}
          inicioRef={inicioRef}
          casasRef={casasRef}
          ubicacionRef={ubicacionRef}
          contactRe={contactRef}
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
              bookings={bookings}
            />
            <HouseCard
              name="coratina"
              images={coratinaImages}
              handleClick={handleConsultarClick}
              bookings={bookings}
            />
            <HouseCard
              name="aloreña"
              images={aloreImages}
              handleClick={handleConsultarClick}
              bookings={bookings}
            />

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

    const arauco_bookings = res_arauco.map((doc) => {
      const book = doc.toObject();
      book._id = book._id.toString();
      return book;
    });

    console.log("BOOKINGS", arauco_bookings);

    return {
      props: {
        bookings: {
          arauco: arauco_bookings,
          coratina: [],
          alorenia: [],
        },
      },
    };
  } catch (e) {
    console.log(e);
  }
}
