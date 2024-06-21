import React,{useState, useEffect} from "react";
import SubText from "../ui/account/SubText";
import Text from "../ui/account/Text";

// 
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// 

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import { FaRegTrashAlt } from "react-icons/fa";
import { customStyles } from "../utils/constant";
import NairaFormat from "../utils/nairaFormat";


import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/features/cart/getCart";
import { getShippingAddress } from "../store/features/account/getShippingAddress";

import OrderTable from "../components/product/OrderTable";

import { addShippingAddress } from "../store/features/account/addShippingAddress";




function CheckOut() {

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  
  const {data, loading, error} = useSelector((state) => state.getCart)
  const shippingAddress = useSelector((state) => state.getShippingAddress)
  const addShippingState = useSelector((state) => state.addShippingAddress)
  // 
  const location = useLocation();
  const { pathname } = location;
  // 
  const handleGetCart = () =>{
    dispatch(getCart()) // update this to be dynamic
  }

  const handleGetShippingAddress = ()=>{
    dispatch(getShippingAddress())
  }
  const [userAddress, setUserAddress] = useState({})
  // address state
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [apartmentAddress, setApartmentAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [addressSet, setAddressSet] = useState(false)

  const handleAddShippingAddress = (e) => {
    e.preventDefault()
    dispatch(addShippingAddress(
      {
        city: city, 
        country: country, 
        postal_code: postalCode,
        street_address: streetAddress, 
        apartment_address: apartmentAddress, 
        address_type: "S"
      }))
  }


  useState(()=>{
    handleGetCart()
    handleGetShippingAddress()
  }, [])


  useEffect(() => {
    if (shippingAddress ) {
      setUserAddress(shippingAddress);

      if (shippingAddress.data.country){
        setAddressSet(true)
      }
    }
  }, [shippingAddress]);

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };


  console.log("ADDRESS: ", shippingAddress)


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
            {addressSet && (
              <div className="border-[2px] py-[5px] px-[5px] bg-[#F2F2F2] mb-[5px] border-radius: 6px; ">
                <p>{shippingAddress.data?.country}</p>
                <p>{shippingAddress.data?.state}</p>
                <p>{shippingAddress.data?.city}</p>
                <p>{shippingAddress.data?.street_address}</p>
              </div>
            )}
            <button 
              onClick={handleShowAddressForm}
              className="bg-[#242424] text-center p-3 rounded-[4px] text-[#ffffff]">
                Update Shipping Address
            </button>
          </div>

          <div className={`transition-all duration-500 ${showAddressForm ? 'block' : 'hidden'}`}>
            <form  >
              <div className="flex flex-col gap-[10px]">
                <label className="text-gray-500">Country <span className="text-red-500">*</span></label>
                <select required={true} onChange={(e)=>setCountry(e.target.value)} className="w-[100%] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]">
                    <option>-- Select Country --</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="KY">Kenya</option>
                </select>
                
                <label className="text-gray-500">City <span className="text-red-500">*</span></label>
                <input 
                  required={true}
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
                  className="w-[100%] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]"></input>

                <label className="text-gray-500">Street Address<span className="text-red-500">*</span></label>
                <input 
                  required={true}
                  value={streetAddress}
                  onChange={(e)=>setStreetAddress(e.target.value)}
                  className="w-[100%] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]"></input>

                <label className="text-gray-500">Apartment Address<span className="text-red-500">*</span></label>
                <input 
                  required={true}
                  value={apartmentAddress}
                  onChange={(e)=>setApartmentAddress(e.target.value)}
                  className="w-[100%] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]"></input>

                <label className="text-gray-500">Postal Code</label>
                <input 
                  value={postalCode}
                  onChange={(e)=>setPostalCode(e.target.value)}
                  className="w-[100%] rounded-[4px] border-[1px] border-[#E6E6E6] p-[10px]"></input>

                  <button 
                    onClick={handleAddShippingAddress}
                    className="bg-[#242424] text-center p-5 rounded-[4px] text-[#ffffff]" >
                      {addShippingState.loading ? <ClipLoader color="#fff" size={10}/> : "Submit"}
                  </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
          <div className="flex justify-between">
            <p className="font-[700] text-[1.25rem]">ORDER SUMMARY</p>
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
              {data?.map(order => (
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
                        <div>Quantity: {order.quantity}</div>
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
          {/* <div className="flex gap-[16px]">
            <button className="bg-[#242424] text-center p-3 rounded-[4px] text-[#ffffff]">Pay with Wallx</button>
            <button className="bg-[#003D76] text-center p-3 rounded-[4px] text-[#ffffff]">Pay with PayStack</button>
          </div> */}
          <div className="flex gap-[16px]">
            <button 
              disabled={!addressSet}
              className="bg-[#242424] text-center p-3 rounded-[4px] text-[#ffffff]">Confirm Order</button>
          </div>
        </div>
      </div>

      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
