import React, { useEffect, useState } from "react";
import CartItem from "../product/CartItem";
import clsx from "clsx";
import { useAddToCartMutation } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/addToCart";
import ClipLoader from "react-spinners/ClipLoader";
import { formatMoney } from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";
import SignUpModal from "./SignupModal";
import Button from "./Button";
import { useGetCartItemsQuery } from "../../services/api";


function CartDrawer({ showCart, setShowCart }) {
  const { refetch } = useGetCartItemsQuery();
  const { currency, conversionRate } = useCurrency();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addToCart, { isLoading }] = useAddToCartMutation();


  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.addToCart);

  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("authToken")
  const isAuthenticated = sessionAuth || token ;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAddToCart = ()=>{
    if(!isAuthenticated){
      handleShowModal();
      return;
    }
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
    const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart"));

    const handleCartItemChange = () => {
      const updatedCartItems = localStorage.getItem('cart');
      if (updatedCartItems) {
        setCartItems(JSON.parse(updatedCartItems));
      }
    };

    window.addEventListener('cartChange', handleCartItemChange);

    if (cartItemsFromStorage) {
      setCartItems(
        cartItemsFromStorage.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Set initial quantity to 1 if not already set
        }))
      );
    }
    return () => {
      window.removeEventListener('cartChange', handleCartItemChange);
    };
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

  const updateCartItemQuantity = (index, newQuantity) => {
  const updatedCartItems = cartItems.map((item, idx) =>
    idx === index ? { ...item, quantity: newQuantity } : item
  );
  setCartItems(updatedCartItems);
  localStorage.setItem("cart", JSON.stringify(updatedCartItems));
};

const increaseQuantity = (index) => {
  const item = cartItems[index];
  if (item) {
    updateCartItemQuantity(index, item.quantity + 1);
  }
};

const decreaseQuantity = (index) => {
  const item = cartItems[index];
  if (item && item.quantity > 1) {
    updateCartItemQuantity(index, item.quantity - 1);
  }
};


  const handleRemoveCartItem = (index) => {
    // Create a new array without the item at the specified index
    const updatedCartItems = [...cartItems];  // Copy the array
    updatedCartItems.splice(index, 1);  // Remove 1 item at the specified index

    // Update the state with the new array
    setCartItems(updatedCartItems);

    // Update sessionStorage with the updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
};


  return (
    <div
      className={clsx(
        "fixed right-0 left-0 top-0 h-[100vh] overflow-scroll bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <SignUpModal 
          openLoginModal={showModal} 
          handleCloseModal={handleCloseModal} />
      <div className="w-[calc(100vw - 622px)] h-[100vh] cursor-pointer" onClick={() => {setShowCart(false)}}></div>
      
      <div className="ml-[auto] fixed right-0 top-0 bottom-0 pb-[50px] lg:w-[522px] overflow-scroll h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[1rem] text-[#4E0240]">SHOPPING BAG ({itemCount})</p>
          
          <div
            className="cursor-pointer w-[20px]"
            onClick={() => {
              setShowCart(false);
            }}
          >
            <img src="/images/x.png"  alt="close" />
          </div>

        </div>
        <div>
          {cartItems &&
            cartItems.map((item, index) => (
              <CartItem
                key={item.product.id}
                id={item.product.id}
                quantity={item?.quantity}
                color={item?.selectedColor}
                size={item.selectedSize}
                image={item?.product?.images[0]}
                title={item.product.name}
                price={formatMoney(item.product.price, currency, conversionRate)}
                increaseQuantity={() => increaseQuantity(index)}
                decreaseQuantity={() => decreaseQuantity(index)}
                removeCartItem={() => handleRemoveCartItem(index)}
              />
            ))}
        </div>

        <div className="mt-[38px] flex justify-between text-[#4E0240]">
          <p className="text-[1rem] font-[700]">TOTAL</p>
          <p className="text-[1rem] font-[700]">{formatMoney(totalPrice, currency, conversionRate)}</p>
        </div>
        <div className="mt-[28px] w-[100%]">
            <Button onClick={handleAddToCart} disabled={cartItems.length === 0}>
              {loading ? <ClipLoader color="#fff" size={10}/> : "CHECK OUT"}
            </Button>
        </div>
      </div>

    </div>
  );
}

export default CartDrawer;
