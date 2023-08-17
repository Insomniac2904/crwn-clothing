import { useContext } from "react";
import "./product-card.styles.scss";

import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <div className='name'>{name}</div>
        <div className='price'>{price}</div>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
