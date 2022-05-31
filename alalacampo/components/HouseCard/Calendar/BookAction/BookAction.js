import { useState } from "react";
import s from "./BookAction.module.scss";

export default function BookAction({
  value,
  nameInput,
  handleBook,
  handleNameBook,
}) {
  const [showInput, setShowInput] = useState(false);

  const handleBookBtn = () => {
    setShowInput(true);
  };

  return (
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
      {!showInput && (
        <div className={s.book_btn_container}>
          <button onClick={handleBookBtn}>Reservar</button>
        </div>
      )}
      {showInput && (
        <>
          <div className={s.book_btn_container}>
            <button onClick={handleBook}>OK</button>
          </div>

          <div className={s.book_inpit_container}>
            <label>Nombre</label>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => handleNameBook(e)}
            />
          </div>
        </>
      )}
    </div>
  );
}
