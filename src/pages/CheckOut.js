import React,{useState, useEffect} from "react";
import SubText from "../ui/account/SubText";
import Text from "../ui/account/Text";

// 
import { Link, useLocation, useNavigate } from "react-router-dom";

// 

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

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.getCart)
  
  // 
  const location = useLocation();
  const { pathname } = location;
  // 
  const handleGetCart = () =>{
    dispatch(getCart("CUS-003-1839")) // update this to be dynamic
  }

  useState(()=>{
    handleGetCart()
  }, [])

  const {data, loading, error} = useSelector((state) => state.getCart)

  // useEffect(() => {
  //   if (data ) {
  //     setCartItems(data);
  //   }
  // }, [data]);


  console.log(cartItems)

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };




  return (
    <div>
      <Header />
      <Container>
      
      <div className="flex gap-[32px]">
        <div className="md:w-[306px] md:h-[645px] border-[2px] py-[33px] px-[24px] flex md:flex-col gap-[16px] overflow-scroll w-[100%] mb-[10px] md:mb-0">
          <div className="flex gap-[10px] w-[150px] md:w-[100%] flex-none h-[48px] items-center px-[19px] bg-[#F2F2F2] rounded-[6px]">
            My Address
          </div>
          <div className={`transition-all duration-500 ${showAddressForm ? 'hidden' : 'block'}`}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
            <button 
              onClick={handleShowAddressForm}
              className="bg-[#242424] text-center p-3 rounded-[4px] text-[#ffffff]">Update Address</button>
          </div>

          <div className={`transition-all duration-500 ${showAddressForm ? 'block' : 'hidden'}`}>
            <form  >
              <div className="flex flex-col gap-[10px]">
                <label className="text-gray-500">Address</label>
                <textarea className="w-[100%] h-[100px] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]"></textarea>
                
                <button className="bg-[#242424] text-center p-5 rounded-[4px] text-[#ffffff]" >Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
          <div className="flex justify-between">
            <p className="font-[700] text-[1.25rem]">ORDERS</p>
            <p className="bg-[#F2F2F2] px-[22px] py-[8px]">NGN200,000</p>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                {/* <th className="py-3 px-6 text-left">Quantity</th> */}
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
                      <p>{NairaFormat.format(order.total_price)}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-[16px]">
            <button className="bg-[#242424] text-center p-3 rounded-[4px] text-[#ffffff]">Pay with Wallx</button>
            <button className="bg-[#003D76] text-center p-3 rounded-[4px] text-[#ffffff]">Pay with PayStack</button>
          </div>
        </div>
      </div>

      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
