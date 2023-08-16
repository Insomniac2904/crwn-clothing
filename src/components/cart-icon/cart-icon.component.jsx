import "./cart-icon.style.scss";
import { ReactComponent as ShopIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  return (
    <div className='cart-icon-container'>
      <ShopIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;
