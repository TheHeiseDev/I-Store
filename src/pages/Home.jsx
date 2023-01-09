import Card from "../components/Card/Card";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
  return (
    <div className="content  p-40 ">
      <div className="d-flex justify-between align-center mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>

        <div className="search-block d-flex align-center">
          <img src="/img/search.svg" alt="Search" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={onChangeSearchInput}
          />
          {searchValue && (
            <img
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="remove"
              onClick={() => setSearchValue("")}
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items.length !== 0 &&
          items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.id}
                data={item}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
