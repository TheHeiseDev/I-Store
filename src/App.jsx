import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://63ba780e56043ab3c79c0471.mockapi.io/cart"),
            axios.get("https://63ba780e56043ab3c79c0471.mockapi.io/favorite"),
            axios.get("https://63ba780e56043ab3c79c0471.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // TODO: Добавляем товар в Корзину
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        setCartItems((prev) =>
          prev.filter((cartObj) => Number(cartObj.parentId) !== Number(obj.id))
        );
        axios.delete(
          `https://63ba780e56043ab3c79c0471.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://63ba780e56043ab3c79c0471.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert(`Не удалось добавить товар в Корзину! Ошибка: ${error}`);
    }
  };

  // TODO:  Удаляем товар из Корзины
  const omRemoveItem = (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      axios.delete(`https://63ba780e56043ab3c79c0471.mockapi.io/cart/${id}`);
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  // TODO: Добавляем товар в Избранное и проверяем
  // TODO: есть ли этот объект уже в Избранных
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://63ba780e56043ab3c79c0471.mockapi.io/favorite/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((favObj) => Number(favObj.id) !== Number(obj.id))
        );
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

  const isItemAdded = (id) => {
    return cartItems.some((cartObj) => Number(cartObj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
        cartItems,
        cartOpened,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          setCartItems={setCartItems}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          omRemoveItem={omRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCard={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
