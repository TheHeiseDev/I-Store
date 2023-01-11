import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios.get(
          "https://63ba780e56043ab3c79c0471.mockapi.io/orders"
        );
        const allOrders = data.map((obj) => obj.items).flat();
        setOrders(allOrders);
        setIsLoading(false);
      } catch (error) {
        alert(`Не удалось получить список заказов: ${error}`);
      }
    }
    getOrders();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((item, index) => (
          <Card key={item ? item.id : index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
