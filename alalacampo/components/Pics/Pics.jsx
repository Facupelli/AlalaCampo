import { useState } from "react";
import s from "./Pics.module.scss";
import Modal from "../Modal/Modal";
import { comunImages } from "../../utils/comunPhotos";
import Image from "next/image";

const pics = comunImages;

export default function Pics() {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");

  const handleImgClick = (image) => {
    setImg(image);
    setShowModal(true);
  };

  const handleNext = () => {
    const length = pics.length - 1;
    const position = pics.indexOf(img);
    if (position < length) {
      setImg(pics[position + 1]);
    } else {
      setImg(pics[0]);
    }
  };

  const handlePrev = () => {
    const length = pics.length - 1;
    const position = pics.indexOf(img);
    if (position > 0) {
      setImg(pics[position - 1]);
    } else {
      setImg(pics[length]);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          img={img}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      <div className={s.container}>
        <p className={s.title}>FOTOS</p>
        <div>
          {pics.length > 0 &&
            pics.map((el, i) => (
              <div key={i} className={s.image}>
                <Image
                  onClick={() => handleImgClick(el)}
                  src={el}
                  alt="pics"
                  width="100px"
                  height="100px"
                  objectFit="cover"
                  style={{borderRadius: ".3rem"}}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
