import React, {useState, useEffect, useRef} from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer } from "react-toastify";
import Input from "../components/admin/form/Input";
import { FaUpload } from "react-icons/fa6";

import { addProduct } from "../store/features/product/addPoduct";

import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../store/features/product/addCategory";


function AddProduct() {
  const dispatch = useDispatch()
  const fileRef = useRef(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [addCategoryData, setAddCategory] = useState("");
  const [variations, setVariations] = useState([]);
  const [showVariation, setShowVariation] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [categorayModal, setCategorayModal] = useState(false);
  const categoryState = useSelector((store)=> store.addCategory);

  const { data } = useSelector((state) => state.listCategory);
  const addProductState = useSelector((state) => state.addProduct);


  const handleFileChange = (event, setFileFunc, setImageUrlFunc) => {
    const uploadedFile = event.target.files[0];
    setFileFunc(uploadedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrlFunc(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleClick = (fileRef) => {
    fileRef.current.click();
  };

  const handleAddVariation = () => {
    setVariations([...variations, { name: "", stock_quantity: 1, size: "", color: "#000000" }]);
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = variations.map((variation, i) =>
      i === index ? { ...variation, [field]: value } : variation
    );

    setVariations(newVariations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("desc", description);
    formData.append("price", price);
    formData.append("quantity", quantity);

    dispatch(addProduct(formData));
  };

  const handleSetCategory = (id) => {
    setCategory(id);
  };

  const handleOpenModal = () => {
    setCategorayModal(true);
  };

  const handleCloseModal = () => {
    setCategorayModal(false);
  };


  const handleAddCategoryChange = (event) => {
    setAddCategory(event.target.value)
  }

  const handleAddCategorySubmit = (event) => {
    event.preventDefault();
    dispatch(addCategory({name: addCategoryData}));
    setCategorayModal(false);
  }

  useEffect(()=>{
    if(addProductState.data){
      setShowVariation(true)
    }
  }, [addProductState.data])
  
  return (
    <div>
      <ToastContainer />

        {/* ADD CATEGORY MODAL */}
        <div class={`${categorayModal ? 'flex' : 'hidden'} fixed top-0 left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}>
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <button onClick={handleCloseModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-y-auto p-7">
                  <form>
                    <Input 
                        topText="Category name" 
                        name="name" 
                        placeholder="Enter Category Name" 
                        type="text"
                        className="mt-[23px]" 
                        onChange={handleAddCategoryChange} 
                        value={addCategoryData} 
                        />
                    <button
                      onClick={handleAddCategorySubmit}
                      className="bg-[#4E0240] py-[17px] px-[17px] rounded-[8px] my-[10px] text-[#fff]"
                    > {categoryState.loading? <ClipLoader color="#fff" size={10} /> : '+ Add Category'}</button>
                  </form>

                </div>
            </div>
        </div>


      <div className="flex p-9">

        <div className={`w-2/3 bg-[#fff] rounded-[10px] p-5 ${!showVariation ? "flex" : "hidden"}`}>
          <form className="w-[100%]">
              <Input
                topText="Product name"
                name="name"
                placeholder="Enter Product Name"
                type="text"
                className="mt-[23px]"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <Input
                topText="Quantity"
                name="quantity"
                placeholder="10"
                type="number"
                className="mt-[23px]"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <Input
                topText="Price"
                name="price"
                placeholder="100000"
                type="number"
                className="mt-[23px]"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />

              <div className="mt-[23px]">
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  ref={fileRef}
                  onChange={(e) => handleFileChange(e, setFile, setImageUrl)}
                />
                <p className="text-[0.875rem]">Images</p>
                {file ? (
                  <div className="flex mt-[16px] lg:gap[56px] gap-[20px] items-center">
                    <div>
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-[200px] h-[200px] rounded-[12px] shadow-lg shadow-neutral-300/50 "
                      />
                    </div>
                    <div
                      className="outline-0 border-[1px] bg-[#F8F8F8] w-[50%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer"
                      onClick={() => handleClick(fileRef)}
                    >
                      <FaUpload className="text-[#BDBDBD]" />
                      <p className="text-[#BDBDBD]">Upload Image(S)</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer"
                    onClick={() => handleClick(fileRef)}
                  >
                    <FaUpload className="text-[#BDBDBD]" />
                    <p className="text-[#BDBDBD]">Upload Image(S)</p>
                  </div>
                )}

                <div className="mt-[23px]">
                  <p className="text-[0.875rem]">Category</p>
                  <div className="flex">
                    <select
                      required={true}
                      onChange={(e) => handleSetCategory(e.target.value)}
                      className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[60%] mx-[10px] rounded-[8px] px-[16px]">
                      <option value=""> - Select Category - </option>
                      {data ? data.map((item) => (
                        <option
                          key={item.id}
                          name="category"
                          value={item.id}>{item.name}</option>
                      )) : ""}
                    </select>
                    <div 
                      onClick={handleOpenModal}
                      className="bg-[#4E0240] p-3 rounded text-[#fff] cursor-pointer">+ Category</div>
                  </div>
                </div>

                <div className="mt-[23px]">
                  <p className="text-[0.875rem]">Description</p>
                  <textarea
                    placeholder="Description"
                    name="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer"
                  ></textarea>
                </div>

              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5">
                  {addProductState.loading ?
                    <ClipLoader
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      color="#ffffff"
                    /> : "Add Product"
                  }
              </button>

          </form>
        </div>
        
        <div className={`w-2/3 bg-[#fff] rounded-[10px] p-5 ${showVariation ? "block" : "hidden"}`}>
          <form>
          <div>
                <div className="flex items-center py-5 justify-between">
                  <h1> Add Variation</h1>
                </div>
                <hr className="mt-[23px] border-[1px] border-[#E0E0E0] h-[1px] w-[100%]" />
                {/* INITIAL VARAITON FORM */}
                <div>
                  <div className="transition-all duration-500">
                      <Input
                        topText="Stock Quantity"
                        name={`variation_quantity_0`}
                        placeholder="10"
                        type="number"
                        className="mt-[23px]"
                        onChange={(e) => handleVariationChange(0, 'stock_quantity', e.target.value)}
                        // value={variation.stock_quantity}
                      />

                      <div className="mt-[23px]">
                        <p className="text-[0.875rem]">Size</p>
                        <select
                          className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]">
                          <option value=""> - Select Size - </option>
                          <option name="variation_size" value="XS">XS</option>
                          <option name="variation_size" value="S">S</option>
                          <option name="variation_size" value="M">M</option>
                          <option name="variation_size" value="L">L</option>
                          <option name="variation_size" value="XL">XL</option>
                          <option name="variation_size" value="XXL">XXL</option>
                        </select>
                      </div>

                      <Input
                        topText="Variation Color"
                        placeholder="red"
                        type="color"
                        className="mt-[23px]"
                      />
                      
                      <Input
                        topText="Price"
                        placeholder="10000"
                        type="number"
                        className="mt-[23px]"
                      />
                      <div className="mt-[23px] ">
                      <p className="text-[0.875rem] mb-[10px]">Variation Image</p>
                        <input
                          type="file"
                          accept="jpeg,png,jpg"
                          // onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                  </div>

                  <hr className="mt-[23px] border-[1px] border-[#E0E0E0] h-[1px] w-[100%]" />
                  <div className="flex items-center py-5 justify-between">
                    <p className="text-[0.875rem]">Add Another Variation</p>
                    <div className="flex items-center"> <button className="bg-[#e9e9e9] px-[10px] py-[5px]" type="button" onClick={handleAddVariation}>+</button> </div>
                  </div>

                  {variations.map((variation, index) => (
                  <div key={index} className="transition-all duration-500">
                    <Input
                      topText="Stock Quantity"
                      name={`variation_quantity_${index}`}
                      placeholder="10"
                      type="number"
                      className="mt-[23px]"
                      onChange={(e) => handleVariationChange(index, 'stock_quantity', e.target.value)}
                      value={variation.stock_quantity}
                    />

                    <div className="mt-[23px]">
                      <p className="text-[0.875rem]">Size</p>
                      <select
                        onChange={(e) => handleVariationChange(index, 'size', e.target.value)}
                        value={variation.size}
                        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]">
                        <option value=""> - Select Size - </option>
                        <option name="variation_size" value="XS">XS</option>
                        <option name="variation_size" value="S">S</option>
                        <option name="variation_size" value="M">M</option>
                        <option name="variation_size" value="L">L</option>
                        <option name="variation_size" value="XL">XL</option>
                        <option name="variation_size" value="XXL">XXL</option>
                      </select>
                    </div>

                    <Input
                      topText="Variation Color"
                      name={`variation_color_${index}`}
                      placeholder="red"
                      type="color"
                      className="mt-[23px]"
                      onChange={(e) => handleVariationChange(index, 'color', e.target.value)}
                      value={variation.color}
                    />
                    <div className="flex items-center py-5 justify-between">
                      <p className="text-[0.875rem]">Add Another Variation</p>
                      <div className="flex items-center"> <button type="button" onClick={handleAddVariation}>+</button> </div>
                    </div>
                    <hr className="mt-[23px] border-[1px] border-[#E0E0E0] h-[1px] w-[100%]" />
                  </div>
                ))}

                </div>
               
              </div>
              <br></br>
              <div className="flex justify-between">
                <button className="bg-[#4E0240] text-[#fff] rounded px-10 py-2">Submit</button> 
                <button className="text-[#4E0240] rounded bg-[#E9E9E9] px-5 py-2">Skip</button>
              </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default AddProduct;
