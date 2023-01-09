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

  useEffect(() => {
    axios // TODO: Получаем список товаров
      .get("https://63ba780e56043ab3c79c0471.mockapi.io/items")
      .then((response) => setItems(response.data));

    axios // TODO: Получаем список товаров из корзины
      .get("https://63ba780e56043ab3c79c0471.mockapi.io/cart")
      .then((response) => setCartItems(response.data));

    axios // TODO: Получаем список избранных
      .get("https://63ba780e56043ab3c79c0471.mockapi.io/favorite")
      .then((response) => setFavorites(response.data));
  }, []);

  // TODO: Добавляем товар в Корзину
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://63ba780e56043ab3c79c0471.mockapi.io/cart/${obj.id}`
        );

        setCartItems((prev) => prev.filter((cartObj) => cartObj.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://63ba780e56043ab3c79c0471.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(`Не удалось добавить товар в Корзину! Ошибка: ${error}`);
    }
  };

  // TODO:  Удаляем товар из Корзины
  const omRemoveItem = (id) => {
    axios.delete(`https://63ba780e56043ab3c79c0471.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
