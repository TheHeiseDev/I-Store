const Drawer = ({ onClose, items = [], omRemoveItem }) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const tax = totalPrice * 0.05;

  return (
    <div className="drawerOverlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <button onClick={onClose} className="drawerBtn">
            x
          </button>
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  {/* <img src="/img/btn-remove.svg" alt="remove" /> */}
                  <button
                    onClick={() => {
                      omRemoveItem(obj.id);
                    }}
                    className="drawerBtn"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice.toFixed(2)} руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{tax.toFixed(2)} руб.</b>
                </li>
              </ul>
              <button className="greenBtn">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              src="/img/empty-cart.jpg"
              alt="Empty"
            />
            <h2>Корзина пуста</h2>
            <p className="opacity-6">Добавьте товар в корзину</p>
            <button onClick={onClose} className="greenBtn">
              <img src="img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
