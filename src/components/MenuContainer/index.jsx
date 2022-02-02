import Product from "../Product";

const MenuContainer = ({ products, filteredProducts, handleClick }) => {
  // console.log(products);
  return (
    <div className="vitrine-produtos">
      {products.map((item, index) => {
        return (
          <Product
            key={index}
            product={item}
            filteredProducts={filteredProducts}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default MenuContainer;
