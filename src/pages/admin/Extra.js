import React, { useState, useEffect } from "react";

import { listProduct } from "../../store/features/product/listProduct";
import { useSelector, useDispatch } from "react-redux";
import { uploadImages } from "../../store/features/admin/carousel";
import MoonLoader from "react-spinners/MoonLoader";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "../../components/admin/form/Input";

import { addCategory } from "../../store/features/product/addCategory";



function Extra() {

  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const imageUrls = useSelector((state) => state.uploadImages);
  const status = useSelector((state) => state.uploadImages.status);

  const {data, loading} = useSelector((store)=> store.listProduct);
  const categoryState = useSelector((store)=> store.addCategory);

  const handleListProduct = ()=>{
    return dispatch(listProduct())
  }


  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    dispatch(uploadImages(selectedFiles));
  };

  useEffect(()=>{
    handleListProduct()
  }, [])

  const handleRadioChange = (event) => {
    setSelectedId(event.target.value);
  };

  
  const handleAddCategory = (event) => {
    event.preventDefault();
    dispatch(addCategory({name: category}))
  }

  const handleSetCategory = (event) => {
    setCategory(event.target.value)
  }


  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] flex mt-[25px] gap-[8px]">
          <div className="w-[50%] bg-[#ffffff] min-h-[100vh] px-[16px] py-[21px]">
            <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
                <p className="text-xl font-bold text-center">Front page carousel</p>
                <small>Select at least three images, not more than 190kb each</small>
                <input
                  type="file"
                  multiple
                  accept="jpeg,png,jpg"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  onClick={handleUpload}
                  disabled={imageUrls.loading || selectedFiles.length === 0}
                  className={`mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    imageUrls.loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {imageUrls.loading ? <ClipLoader color="#fff" size={10}  /> : 'Upload'}
                </button>

                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Selected Images:</h3>
                    <div className="flex flex-wrap mt-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="w-1/4 p-2">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected ${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {status === 'succeeded' && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Uploaded Images:</h3>
                    <div className="flex flex-wrap mt-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="w-1/4 p-2">
                          <img
                            src={url}
                            alt={`Uploaded ${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {status === 'failed' && <p className="text-red-500 mt-2">Failed to upload images.</p>}
            </div>
            
            <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-[20px]">  
                <p className="text-xl font-bold text-center">Add Product Category</p>
                <form>
                  <Input 
                      onChange={handleSetCategory}
                      value={category}
                      type="text" 
                      name="name" label="Name" />
                  <button 
                      onClick={handleAddCategory}
                      className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] my-[10px] text-[#fff]"
                      >{categoryState.loading? <ClipLoader color="#fff" size={10} /> : '+ Add Category'}
                  </button>
                </form>
            </div>
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
                                    <img src={item.image_url} className="w-[50px] rounded-2" alt="" />
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
