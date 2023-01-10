import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Получаем список товаров из корзины
      const cartsResponse = await axios.get(
        "https://63ba780e56043ab3c79c0471.mockapi.io/cart"
      );

      // TODO: Получаем список избранных
      const favoritesResponse = await axios.get(
        "https://63ba780e56043ab3c79c0471.mockapi.io/favorite"
      );

      // TODO: Получаем список товаров
      const itemsResponse = await axios.get(
        "https://63ba780e56043ab3c79c0471.mockapi.io/items"
      );
      setIsLoading(false);

      setCartItems(cartsResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    };
    fetchData();
  }, []);

  // TODO: Добавляем товар в Корзину
  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://63ba780e56043ab3c79c0471.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((cartObj) => Number(cartObj.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://63ba780e56043ab3c79c0471.mockapi.io/cart", obj);

        console.log(obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert(`Не удалось добавить товар в Корзину! Ошибка: ${error}`);
    }
  };

  // TODO:  Удаляем товар из Корзины
  const omRemoveItem = (id) => {
    try {
      axios.delete(`https://63ba780e56043ab3c79c0471.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  // TODO: Добавляем товар в Избранное и проверяем
  // TODO: есть ли этот объект уже в Избранных
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://63ba780e56043ab3c79c0471.mockapi.io/favorite/${obj.id}`
        );
        // setFavorites((prev) => prev.filter((favObj) => favObj.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://63ba780e56043ab3c79c0471.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в Избранное! Ошибка запроса...");
    }
  };

  // TODO: Управляемый поиск
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          setCartItems={setCartItems}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          omRemoveItem={omRemoveItem}
        />
      )}
      <Header onClickCard={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
