import { Link } from "react-router-dom";

const Header = ({ onClickCard }) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="логотип" />

          <div>
            <h3 className="text-uppercase">React Sneacers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex ">
        <li className="mr-30 cu-p" onClick={onClickCard}>
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>1205 руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img src="/img/heart.svg" alt="" />
          </Link>
        </li>
        <li className="cu-p">
          <img width={18} height={18} src="/img/union.svg" alt="Пользователи" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
