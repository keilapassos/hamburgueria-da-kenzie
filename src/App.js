import "./styles.css";
import { useState, useEffect } from "react";
import MenuContainer from "./components/MenuContainer";
import Product from "./components/Product";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Hamburguer", category: "Sanduíches", price: 7.99 },
    { id: 2, name: "X-Burguer", category: "Sanduíches", price: 8.99 },
    { id: 3, name: "X-Salada", category: "Sanduíches", price: 10.99 },
    { id: 4, name: "Big Kenzie", category: "Sanduíches", price: 16.99 },
    { id: 5, name: "Guaraná", category: "Bebidas", price: 4.99 },
    { id: 6, name: "Coca", category: "Bebidas", price: 4.99 },
    { id: 7, name: "Fanta", category: "Bebidas", price: 4.99 }
  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  //user input = valor digitado pelo usuário
  const [userInput, setUserInput] = useState("");
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    totalPrice();
  }, [currentSale]);

  const showProducts = () => {
    const sameText = products.filter(
      (item) =>
        item.name
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") ===
        userInput
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
    );
    // console.log(sameText);

    setFilteredProducts(sameText);
  };

  const handleClick = (productId) => {
    const findId = products.find((item) => item.id === productId);

    //para ver se já tem no carrinho (currentSale)
    const findIdInSale = currentSale.find((item) => item.id === productId);

    //se não tiver (se for undefined ou nulo), adiciona no carrinho

    if (findIdInSale === undefined || findIdInSale === null) {
      setCurrentSale([...currentSale, findId]);
    }
  };

  const totalPrice = () => {
    const total = currentSale.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    setCartTotal(total);
  };

  return (
    <div className="App">
      <h1>Kenzie Burguer</h1>
      <div className="divInput">
        <input
          type="text"
          placeholder="buscar"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        />
        <button className="search-btn" onClick={() => showProducts(userInput)}>
          Pesquisar
        </button>
      </div>

      <MenuContainer
        products={filteredProducts.length > 0 ? filteredProducts : products}
        handleClick={handleClick}
      />

      <div className="cart-total">
        <h2>Subtotal: R$ {cartTotal.toFixed(2)}</h2>
      </div>
      <div className="cart-item">
        <h3>Itens no carrinho:</h3>
        <br />
        {currentSale.map((item, index) => {
          return (
            <div className="cart" key={index}>
              Produto: <strong>{item.name}</strong>
              Categoria: {item.category}
              <br />
              Preço: {item.price}
            </div>
          );
        })}
      </div>
    </div>
  );
}
