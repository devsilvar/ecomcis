import React,{useState, useEffect} from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import { FaRegTrashAlt } from "react-icons/fa";
import { customStyles } from "../utils/constant";

import DataTable from "react-data-table-component";

import { useGetCartItemQuery } from "../services/cartApi";

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

          <OrderTable orders={cartItems} />
        </div>
      </div>
      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
