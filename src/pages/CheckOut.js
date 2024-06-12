import React,{useState, useEffect} from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import { FaRegTrashAlt } from "react-icons/fa";
import { customStyles } from "../utils/constant";
import NairaFormat from "../utils/nairaFormat";

import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/features/cart/getCart";

import OrderTable from "../components/product/OrderTable";


function CheckOut() {

  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.getCart)

  const handleGetCart = () =>{
    dispatch(getCart("CUS-003-1839")) // update this to be dynamic
  }

  useState(()=>{
    handleGetCart()
  }, [])

  const {data, loading, error} = useSelector((state) => state.getCart)

  useEffect(() => {
    if (data ) {
      setCartItems(data);
    }
  }, [data]);


  console.log(cartItems)




 const decrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, total_price: (item.quantity - 1) * item.price }
          : item
      )
    );

    console.log("CART DEC ITEM", cartItems)
  };

  const incrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, total_price: (item.quantity + 1) * item.price }
          : item
      )
    );
  };


  return (
    <div>
      <Header />
      <Container>
      <div className="ml-[auto] pb-[50px] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem]">YOUR BAG</p>
          <div className="cursor-pointer flex items-center gap-[5px]">
            <FaRegTrashAlt className="text-[#9C0D00]" />
            <p>Remove</p>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] w-[70%] mx-[auto]">

        {/* ORDER TABLE  */}  
        <div className="container mx-auto py-8">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Price</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map(order => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={order.product?.image.substring(13)}
                          alt={order.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">{order.product.name}</p>
                          <div>Category: {order.product.category}</div>
                          <div>Tag: {order.product.product_tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <button
                          onClick={() => decrementQuantity(order.id)}
                          className="border-[#8A8A8A] bg-[#FFFFFF] text-black px-2 py-1"
                        >
                          -
                        </button>
                        <p className="mx-2">{order.quantity}</p>
                        <button
                          onClick={() => incrementQuantity(order.id)}
                          className="border-[#8A8A8A] bg-[#FFFFFF] text-black px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{NairaFormat.format(order.total_price)}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ORDER TABLE ENDS */}
        </div>
      </div>
      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
