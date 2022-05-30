import { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

import s from "./Calendar.module.scss";

export default function CalendarComponent({ bookings }) {
  const [value, onChange] = useState(new Date());

  console.log(value);
  console.log("BOOKINGS", bookings);

  const days_taken = bookings.map((book) => book.day);

  console.log("days_taken", days_taken);
  console.log(
    "FILTER",
    days_taken.filter(
      (day) =>
        day === "Sat Jun 11 2022 00:00:00 GMT-0300 (hora estándar de Argentina)"
    ).length === 1
  );

  const paintBookings = ({ activeStartDate, date, view }) => {
    if (days_taken.filter((day) => day === date.toString())) {
      s.tile;
    } else {
      null;
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
        </div>

        <div className={s.calendar_container}>
          <Calendar
            className="react-calendar"
            onChange={onChange}
            value={value}
            locale="es-419"
            minDate={new Date("05-29-2022")}
            // selectRange={true}
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
                return s.tile;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
