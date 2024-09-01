import React, {useEffect, useState} from "react";
import SubText from "../../ui/account/SubText";
import Text from "../../ui/account/Text";

import { useSelector, useDispatch } from "react-redux";
import { getShippingAddress } from "../../store/features/account/getShippingAddress";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "../../components/common/Loader";
import { addShippingAddress } from "../../store/features/account/addShippingAddress";

function AddressBook() {
  const dispatch = useDispatch();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const addShippingState = useSelector((state) => state.addShippingAddress)
  const {data, loading} = useSelector((state) => state.getShippingAddress);

  const handleShowAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };
  const handleGetShippingAddress = () => {
    dispatch(getShippingAddress());
  };

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


  useEffect(() => {
    handleGetShippingAddress();
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
       <Loader/>
      </div>
    );
  }

  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between text-[#4E0240]">
        <p>ADDRESS BOOK</p>
        <button onClick={handleShowAddressForm} className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>

      <div className={`transition-all duration-500 ${showAddressForm ? 'hidden' : 'block'}`}>
        <SubText text="ADDRESS 1" />
        <Text text={data?.apartment_address} />
        {data?.country && <Text text={data?.street_address +", "+ data?.city +", "+ data?.country} /> }
        
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
  );
}

export default AddressBook;
