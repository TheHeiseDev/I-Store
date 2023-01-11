import { useContext, useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

const Card = ({
  id,
 
  name,
  imageUrl,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, imageUrl, price };
  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    setIsFavorite((prev) => !prev);
    onFavorite(obj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={255}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="120" />
          <rect x="0" y="143" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="170" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="210" rx="5" ry="5" width="80" height="25" />
          <rect x="120" y="206" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorive} onClick={onClickFavorite}>
            {onFavorite && (
              <img
                src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
                alt="Корзина"
              />
            )}
          </div>

          <img width={133} height={112} src={imageUrl} alt="1" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
