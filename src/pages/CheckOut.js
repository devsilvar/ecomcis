import React,{useState, useEffect} from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import { FaRegTrashAlt } from "react-icons/fa";
import { customStyles } from "../utils/constant";

import DataTable from "react-data-table-component";

import { useGetCartItemQuery } from "../services/cartApi";



function CheckOut() {

  const [cartItems, setCartItems] = useState([])
  const { data: cartItem, error: cartItemError, isError, isLoading } = useGetCartItemQuery("CUS-003-1839")

  const columns = [
    {
      name: "Product",
      selector: (row) => row.product,
    },
  
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
  
    // {
    //   name: "",
    //   selector: (row) => <PopoverBtn id={row.id} />,
    // },
  ];

  useEffect(() =>{
    if (!isLoading){
      if (!isError){
        setCartItems(cartItem)
      }else{
        console.log(cartItemError)
      }
    }
  }, [cartItem])

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
        <div className="flex flex-col gap-[16px]">
        <DataTable
          columns={columns}
          data={cartItem}
          pagination
          customStyles={customStyles}
        />
        </div>
      </div>
      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
