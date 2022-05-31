import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import Calendar from "react-calendar";

import s from "./Calendar.module.scss";

export default function CalendarComponent({ bookings }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [value, onChange] = useState(new Date());
  const [allowRange, setAllowRange] = useState(false);

  console.log("AUTH", auth);

  const days_taken = bookings.map((book) => book.day);

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
              if (days_taken.find((day) => day === date.toString())) {
                return s.booking_tile;
              } else {
                return;
              }
            }}
          />
          {auth.accessToken &&
            (value.length > 0 ? (
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
            ))}
        </div>
      </div>
    </div>
  );
}
