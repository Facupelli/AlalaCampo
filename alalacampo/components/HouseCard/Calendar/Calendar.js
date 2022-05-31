import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import Calendar from "react-calendar";

import s from "./Calendar.module.scss";
import BookInfo from "./BookInfo/BookInfo";
import BookAction from "./BookAction/BookAction";

export default function CalendarComponent({ bookings, house }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [value, onChange] = useState(new Date());
  const [allowRange, setAllowRange] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const days_taken = bookings.map((book) => book.day).flat();

  const handleNameBook = (e) => {
    setNameInput(e.target.value);
  };

  const clickedDay = (value) => {
    const dayClicked = value.toDateString().split(" ").slice(1, 4).join(" ");

    const book = bookings.filter((book) => book.day.includes(dayClicked));

    setBookInfo(book[0]);
  };

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
      if (i < 10) {
        day.push(`${daysInfo.month} 0${parseInt(i, 10)} ${daysInfo.year}`);
      } else {
        day.push(`${daysInfo.month} ${i} ${daysInfo.year}`);
      }
    }
    const data = {
      day,
      house,
      name: nameInput,
    };

    try {
      const response = await axios.post(
        "https://www.alalacampo.com/api/book",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setErrMsg("");
      setShowNameInput(false);
      setMessage("Reservado exitosamente!");
    } catch (err) {
      console.log(err?.response?.data);
      setErrMsg(err?.response.data.message);
    }
  };

  return (
    <div className={s.container}>
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
          minDate={new Date()}
          selectRange={allowRange}
          onClickDay={auth.accessToken ? (value) => clickedDay(value) : null}
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
          <BookAction
            nameInput={nameInput}
            value={value}
            handleBook={handleBook}
            handleNameBook={handleNameBook}
            message={message}
            errMsg={errMsg}
            showNameInput={showNameInput}
            setShowNameInput={setShowNameInput}
          />
        )}
      </div>
      {auth.accessToken && <BookInfo bookInfo={bookInfo} />}
    </div>
  );
}
