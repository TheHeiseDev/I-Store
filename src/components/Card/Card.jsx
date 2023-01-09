import { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ data, onPlus, onFavorite, favorited = false }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus(data);
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    setIsFavorite((prev) => !prev);
    onFavorite(data);
  };

  function tabInt(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorive} onClick={onClickFavorite}>
        <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} />
      </div>

      <img width={133} height={112} src={data.imageUrl} alt="1" />
      <h5>{data.name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{tabInt(data.price)} руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
};

export default Card;
