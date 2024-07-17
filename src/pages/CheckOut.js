import React,{useState, useEffect} from "react";

import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import NairaFormat from "../utils/nairaFormat";

import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/features/cart/getCart";
import { getShippingAddress } from "../store/features/account/getShippingAddress";

import { addShippingAddress } from "../store/features/account/addShippingAddress";
import { toast } from "react-toastify";

import { createOrder } from "../store/features/order/createOrder";




function CheckOut() {

  const [showAddressForm, setShowAddressForm] = useState(false);
  const dispatch = useDispatch()
  
  const {data, loading, error} = useSelector((state) => state.getCart)
  const shippingAddress = useSelector((state) => state.getShippingAddress)
  const addShippingState = useSelector((state) => state.addShippingAddress)
  const createOrderState = useSelector((state) => state.createOrder)
  // 
  const location = useLocation();
  const { pathname } = location;
  // 
  const handleGetCart = () =>{
    dispatch(getCart())
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
        default: true,
        city: city, 
        country: country, 
        postal_code: postalCode,
        street_address: streetAddress, 
        apartment_address: apartmentAddress, 
        address_type: "S"
      }))
  }

  const getTotalAmount = data?.reduce((total, item) => {
    return total + parseFloat(item.total_price);
  }, 0);



  useState(()=>{
    handleGetCart()
    handleGetShippingAddress()
  }, [])


  useEffect(() => {
    if (shippingAddress ) {
      setUserAddress(shippingAddress.data);

      if (shippingAddress?.data?.country){
        setAddressSet(true)
      }
    }
  }, [shippingAddress]);

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };


  const handlePlaceOrder = () =>{
    if(!addressSet){
      toast("Please set your address first")
      return
    }else{
        dispatch(createOrder({
          shipping_address_id: userAddress.id
        }))
    }
  }


  return (
    <div>
      <ToastContainer />
      <Header />
      <Container>
      
      <div className="lg:flex gap-[32px] ">
        <div className="md:w-[306px] md:h-[645px] border-[2px] py-[33px] px-[24px] gap-[16px] overflow-scroll w-[100%] mb-[10px] md:mb-0">
          <div className="flex gap-[10px] w-[100%] mb-2 items-center px-[19px] py-[19px] bg-[#F2F2F2] rounded-[6px]">
            My Address
          </div>
          <div className={`transition-all duration-500 ${showAddressForm ? 'hidden' : 'block'}`}>
            {addressSet && (
              <div className="border-[2px] py-[5px] px-[5px] bg-[#F2F2F2] mb-[5px] border-radius: 6px; ">
                <p>{userAddress?.country}</p>
                <p>{userAddress?.state}</p>
                <p>{userAddress?.city}</p>
                <p>{userAddress?.street_address}</p>
              </div>
            )}
            <button 
              onClick={handleShowAddressForm}
              className="bg-[#4E0240] text-center p-3 rounded-[4px] text-[#ffffff]">
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
                    className="bg-[#4E0240] text-center p-5 rounded-[4px] text-[#ffffff]" >
                      {addShippingState.loading ? <ClipLoader color="#fff" size={10}/> : "Submit"}
                  </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
          <div className="flex justify-between">
            <p className="font-[700] text-[1.25rem]">ORDER SUMMARY</p>
            <p className="bg-[#F2F2F2] px-[22px] py-[8px]">{NairaFormat.format(getTotalAmount)}</p>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity & Price</th>
                <th className="py-3 px-6 text-left">Total Price</th>
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
                      <p>Price: {order.total_price / order.quantity} X {order.quantity}</p>
                    </div>
                    <div>
                      <p>Discount: {order.discount}</p>
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
              onClick={handlePlaceOrder}
              className="bg-[#4E0240] text-center p-3 rounded-[4px] text-[#ffffff]">
                {createOrderState.loading ? <ClipLoader color="#fff" size={10}/> : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>

      </Container>
      <Footer />
    </div>
  );
}

export default CheckOut;
