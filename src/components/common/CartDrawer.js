import React, { useEffect, useState } from "react";
import CartItem from "../product/CartItem";
import clsx from "clsx";
import { Link } from "react-router-dom";
import NairaFormat from "../../utils/nairaFormat";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/addToCart";
import ClipLoader from "react-spinners/ClipLoader";

function CartDrawer({ showCart, setShowCart }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const {loading, data, error} = useSelector((state) => state.addToCart);


  console.log(loading, data, error)
  const handleAddToCart = ()=>{
    dispatch(addToCart(cartItems))
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
  console.log("CART ITEMS:-> ", cartItems)

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.product.price) * product.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cartItems]);

  const updateCartItemQuantity = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateCartItemQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(id, item.quantity - 1);
    }
  };

  return (
    <div
      className={clsx(
        "absolute right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px] min-h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem] text-[#4E0240]">SHOPPING BAG ({itemCount})</p>
          <p
            className="cursor-pointer"
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
                quantity={item.quantity}
                image={item.product.image.substring(13)}
                title={item.product.name}
                price={NairaFormat.format(item.product.price)}
                increaseQuantity={() => increaseQuantity(item.id)}
                decreaseQuantity={() => decreaseQuantity(item.id)}
              />
            ))}
        </div>

        <div className="mt-[38px] flex justify-between text-[#4E0240]">
          <p className="text-[2rem] font-[700]">TOTAL</p>
          <p className="text-[2rem] font-[700]">{NairaFormat.format(totalPrice)}</p>
        </div>
        <div className="mt-[28px] py-[21px] w-[100%] bg-[#4E0240] rounded-[4px]">
          <p className="bg-[#4E0240] text-center lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]">
            <button onClick={handleAddToCart}>
              {loading ? <ClipLoader color="#fff" size={10}/> : "CHECK OUT"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
