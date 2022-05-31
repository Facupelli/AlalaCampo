import s from "./BookInfo.module.scss";

export default function BookInfo({bookInfo}) {
  return (
    <div className={s.book_info}>
      <p>{bookInfo ? "Reserva" : "No Hay Reserva"}</p>
      {bookInfo && (
        <div>
          <p className={s.title}>nombre:</p>
          <p className={s.title}>casa:</p>
          <p className={s.title}>dias:</p>
          <p className={s.info}>{bookInfo && bookInfo.name}</p>
          <p className={s.info}>{bookInfo && bookInfo.house}</p>
          <div className={s.info}>
            {bookInfo &&
              bookInfo.day.map((el) => (
                <p key={el}>{el.split(" ").slice(0, 2).join(" ")}</p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
