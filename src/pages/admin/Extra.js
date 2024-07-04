import React, { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import BusinessInfoForm from "../../components/admin/form/BusinessInfoForm";
import SelectFormTab from "../../components/admin/settings/SelectFormTab";
import SecurityForm from "../../components/admin/form/SecurityForm";

import { listProduct } from "../../store/features/product/listProduct";
import { useSelector, useDispatch } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";



function Extra() {
  const [whatForm, setWhatForm] = useState("Extras");
  const dispatch = useDispatch()

  const [featuredProduct, setFeaturedProduct] = useState("featuredProduct")
  const [selectedId, setSelectedId] = useState(null);

  const {data, loading} = useSelector((store)=> store.listProduct);

  const handleListProduct = ()=>{
    return dispatch(listProduct())
  }

  useEffect(()=>{
    handleListProduct()
  }, [])

  const handleSetWhatForm = (text) => {
    setWhatForm(text);
  };

  const handleRadioChange = (event) => {
    setSelectedId(event.target.value);
    console.log(event.target.value);
    console.log(selectedId)
  };

  console.log(" -- ", selectedId)


  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] flex mt-[25px] gap-[8px]">
          <div className="w-[50%] bg-[#ffffff] min-h-[100vh] px-[16px] py-[21px]">
            <p>Front page carousel</p>
            <form>
              
              <label class="block text-sm font-medium text-gray-900" for="large_size">Image 1</label>
              <input class="block mb-2 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="large_size" type="file" />
              
              <label class="block text-sm font-medium text-gray-900" for="large_size">Image 2</label>
              <input class="block mb-2 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="large_size" type="file" />
              
              <label class="block text-sm font-medium text-gray-900" for="large_size">Image 3</label>
              <input class="block mb-2 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="large_size" type="file" />


              <button className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] my-[10px] text-[#fff]">Submit</button>
            </form>
            
          </div>


          <div className="w-[50%] h-[100%] bg-[#ffffff] scroll px-[16px] py-[21px]">
            <div className="h-[50%]">
              <p id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Set Featured Product</p>
            
              <form>
              <div id="dropdownHelperRadio" class="bg-white rounded-lg shadow w-[100%]">
                <ul class="flex w-full gap-3 flex-col p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperRadioButton">
                  {loading ? <MoonLoader /> : data?.results?.map((item)=>{
                    return (
                      <div key={item.id}>
                        <li>
                          <div class="flex p-2 rounded">
                            <div class="flex items-center h-5">
                                <input
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  type="radio"
                                  name="featuredProduct"
                                  value={item.id}
                                  checked={selectedId === item.id.toString()}
                                  onChange={handleRadioChange}
                                />
                            </div>
                            <div class="ms-2 text-sm w-[100%]">
                                <label for={item.id}  class="font-medium text-[#000] flex justify-between w-[100%]">
                                  <div>
                                    <div>{item.name}</div>
                                    <p id="helper-radio-text-5" class="text-xs font-normal text-[#000]">{item.desc.length > 30 ? item.desc.substring(0, 30) + '...' : item.desc}</p>
                                  </div>
                                  <div>
                                    <img src={item.image.substring(13)} className="w-[50px] rounded-2" alt="" />
                                  </div>
                                </label>
                            </div>
                          </div>
                        </li>

                      </div>
                    )
                  })}
                </ul>
                <button className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] my-[10px] text-[#fff]">Submit</button>
              </div>
              </form>
            </div>

            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Extra;
