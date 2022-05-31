import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import Calendar from "react-calendar";

import s from "./Calendar.module.scss";

export default function CalendarComponent({ bookings, house }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [value, onChange] = useState(new Date());
  const [allowRange, setAllowRange] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const days_taken = bookings.map((book) => book.day).flat();

  const handleBook = async () => {
    const startDay = value[0].toDateString().split(" ")[2];
    const endDay = value[1].toDateString().split(" ")[2];

    if (endDay < startDay) {
      setMessage("");
      setErrMsg("Error, deber realizar dos reservas, una para cada mes.");
      return;
    }

    const daysInfo = {
      month: value[0].toDateString().split(" ")[1],
      year: value[0].toDateString().split(" ")[3],
    };
    const day = [];

    for (let i = startDay; i <= endDay; i++) {
      day.push(`${daysInfo.month} ${i} ${daysInfo.year}`);
    }
    const data = {
      day,
      house,
      name: "Famar Booking",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/book",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setErrMsg("");
      setMessage("Reservado exitosamente!");
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  return (
    <div className={s.container}>
      <div>
        <div className={s.iden}>
          <div className={s.disponible}>
            <div></div>
            <p>Disponible</p>
          </div>
          <div className={s.reservado}>
            <div></div>
            <p>Reservado</p>
          </div>
          {auth.accessToken && (
            <div className={s.btn_container}>
              <button
                type="button"
                onClick={() => {
                  setAllowRange(!allowRange);
                }}
              >
                {allowRange ? "A Singular" : "A Rango"}
              </button>
            </div>
          )}
        </div>

        <div className={s.calendar_container}>
          <Calendar
            className="react-calendar"
            onChange={onChange}
            value={value}
            locale="es-419"
            minDate={new Date("05-29-2022")}
            selectRange={allowRange}
            // onClickDay={auth.accessToken ? null : () => console.log("nada")}
            // tileContent={({ activeStartDate, date, view }) =>
            //   date.toString() ===
            //   "Sun Jun 05 2022 00:00:00 GMT-0300 (hora estándar de Argentina)"
            //     ? "Reservado"
            //     : null
            // }

            tileClassName={({ date, view }) => {
              if (
                days_taken.find(
                  (day) =>
                    day === date.toString().split(" ").slice(1, 4).join(" ")
                )
              ) {
                return s.booking_tile;
              } else {
                return;
              }
            }}
          />
          {auth.accessToken && (
            <div className={s.booking_container}>
              {value.length > 0 ? (
                <div className={s.range}>
                  <p>
                    <span>Inicio:</span> {value[0].toDateString()}
                  </p>
                  <p>
                    <span>Fin:</span> {value[1].toDateString()}
                  </p>
                </div>
              ) : (
                <div className={s.range}>
                  <p>
                    <span>Fecha:</span> {value.toDateString()}
                  </p>
                </div>
              )}
              <div className={s.book_btn_container}>
                <button onClick={handleBook}>Reservar</button>
              </div>
            </div>
          )}
          {auth.accessToken && (errMsg || message) && (
            <div className={s.message}>
              <p className={s.err_msg}>{errMsg && errMsg}</p>
              <p>{message && message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
