import React, { useEffect, useState } from "react";
import CartItem from "../product/CartItem";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/addToCart";
import ClipLoader from "react-spinners/ClipLoader";
import { formatMoney } from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";


function CartDrawer({ showCart, setShowCart }) {
  const { currency, conversionRate } = useCurrency();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const {loading, data, error} = useSelector((state) => state.addToCart);

  const handleAddToCart = ()=>{
    const payload = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      size: item?.selectedSize,  
      color: item?.selectedColor 
    }));
    dispatch(addToCart(payload))
  }

  
  // Retrieve cart from sessionStorage
  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(sessionStorage.getItem("cart"));

    if (cartItemsFromStorage) {
      setCartItems(
        cartItemsFromStorage.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Set initial quantity to 1 if not already set
        }))
      );
    }
  }, []);

  let itemCount = cartItems ? cartItems.length : 0;

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.product.price) * product.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cartItems]);

  const updateCartItemQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };
  
  const increaseQuantity = (productId) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      updateCartItemQuantity(productId, item.quantity + 1);
    }
  };
  
  const decreaseQuantity = (productId) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(productId, item.quantity - 1);
    }
  };

  const handleRemoveCartItem = (productId) => {
    // Filter out the item with the specified productId
    const updatedCartItems = cartItems.filter((item) => item.product.id !== productId);
    
    // Update the state with the new array
    setCartItems(updatedCartItems);
    
    // Update sessionStorage with the updated cart
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  console.log(cartItems)

  return (
    <div
      className={clsx(
        "fixed right-0 left-0 top-0 h-[100vh] overflow-scroll bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="ml-[auto] fixed right-0 top-0 bottom-0 pb-[50px] lg:w-[622px] overflow-scroll h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem] text-[#4E0240] lg:text[1em]">SHOPPING BAG ({itemCount})</p>
          <p
            className="cursor-pointer text-[2em]"
            onClick={() => {
              setShowCart(false);
            }}
          >
            X
          </p>
        </div>
        <div>
          {cartItems &&
            cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                id={item.product.id}
                quantity={item?.quantity}
                color={item?.selectedColor}
                size={item.selectedSize}
                image={item?.product?.images[0]}
                title={item.product.name}
                price={formatMoney(item.product.price, currency, conversionRate)}
                increaseQuantity={() => increaseQuantity(item.product.id)}
                decreaseQuantity={() => decreaseQuantity(item.product.id)}
                removeCartItem={() => handleRemoveCartItem(item.product.id)}
              />
            ))}
        </div>

        <div className="mt-[38px] flex justify-between text-[#4E0240]">
          <p className="text-[2rem] font-[700]">TOTAL</p>
          <p className="text-[2rem] font-[700]">{formatMoney(totalPrice, currency, conversionRate)}</p>
        </div>
        <div className="mt-[28px] py-[21px] w-[100%] bg-[#4E0240] rounded-[4px]">
          <p className="bg-[#4E0240] text-center lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]">
            <button onClick={handleAddToCart} disabled={cartItems.length == 0}>
              {loading ? <ClipLoader color="#fff" size={10}/> : "CHECK OUT"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
