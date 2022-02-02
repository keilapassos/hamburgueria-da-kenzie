const Product = ({ product, filteredProducts, handleClick }) => {
  return (
    <div className="produto">
      <div>
        <h2 className="product-title">{product.name}</h2>
      </div>
      <div>Categoria: {product.category}</div>
      <div>Preço: R$ {product.price}</div>
      <button
        className="addToCart"
        onClick={() => {
          handleClick(product.id);
        }}
      >
        Adicionar
      </button>
    </div>
  );
};

export default Product;

// vitrine preta de itens cinza
