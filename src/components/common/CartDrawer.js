import React from "react";
import { useEffect, useState } from "react";
import CartItem from "../product/CartItem";
import clsx from "clsx";
import { Link } from "react-router-dom";

import NairaFormat from "../../utils/nairaFormat";
import { useGetCartItemQuery } from "../../services/cartApi";

function CartDrawer({ showCart, setShowCart }) {

  // const {data, error, isError, isLoading} = useGetCartItemQuery("CUS-003-1839");
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(()=>{
  //   if(!isLoading){
  //     if(!isError){
  //       setCartItems(data)
  //     }else{
  //       console.log(error)
  //     }
  //   }
  // }, [isLoading])

  const data = [
    {
        "id": 4,
        "product": {
            "id": 21,
            "name": "Blazzer",
            "image": "image/upload/https://res.cloudinary.com/dsmgwxyzi/image/upload/v1717158419/product/images/s0yk1pz7t0lyodrnhek1.jpg",
            "price": "40000.00",
            "category": 10,
            "discounted_percentage": null,
            "product_tag": "TS-001"
        },
        "total_price": "40000.00",
        "quantity": 1,
        "discounted_price": "40000.00",
        "discount": "0.00"
    },
    {
        "id": 5,
        "product": {
            "id": 20,
            "name": "nice cloth",
            "image": "image/upload/https://res.cloudinary.com/dsmgwxyzi/image/upload/v1717158383/product/images/kj5n6tcdoar8ozykbjlb.jpg",
            "price": "45000.00",
            "category": 10,
            "discounted_percentage": null,
            "product_tag": "TS-001"
        },
        "total_price": "45000.00",
        "quantity": 1,
        "discounted_price": "45000.00",
        "discount": "0.00"
    },
    {
        "id": 6,
        "product": {
            "id": 20,
            "name": "nice cloth",
            "image": "image/upload/https://res.cloudinary.com/dsmgwxyzi/image/upload/v1717158383/product/images/kj5n6tcdoar8ozykbjlb.jpg",
            "price": "45000.00",
            "category": 10,
            "discounted_percentage": null,
            "product_tag": "TS-001"
        },
        "total_price": "45000.00",
        "quantity": 1,
        "discounted_price": "45000.00",
        "discount": "0.00"
    }
]

  console.log("CART ITEMS: ",cartItems)

let totalPrice = 0
let itemCount = 0

if(!isLoading){
  // itemCount = data.length;
  if (data){
  totalPrice = data.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.total_price);
  }, 0)};
}
  return (
    <div
      className={clsx(
        "absolute right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px] min-h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem]">SHOPPING BAG ({itemCount})</p>
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
          {
           data ? data.map(item =>{
              return <CartItem
                  id={item.id}
                  image={item.product.image.substring(13)}
                  title ={item.product.name}
                  price={NairaFormat.format(item.total_price)}
              />
            }) : ""
          }

        </div>

        <div className="mt-[38px] flex justify-between">
          <p className="text-[2rem] font-[700]">TOTAL</p>
          <p className="text-[2rem] font-[700]">{NairaFormat.format(totalPrice)}</p>
        </div>
        <div className="mt-[28px] py-[21px] w-[100%] bg-[#242424] rounded-[4px]">
            <Link to="/checkout">
              <p className="color-[#FFF]">CHECKOUT</p></Link>
        </div>
        <button className="mt-[28px] py-[21px] w-[100%] border-[1px] rounded-[4px] border-[#242424]">
          <p>CONTINUE SHOPPING</p>
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;
