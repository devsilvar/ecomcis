import { input, Form, Formik } from "formik";
import { FaUpload } from "react-icons/fa6";
import React, { useRef, useState, useEffect } from "react";

import Input from "./Input";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../../store/features/product/listCategory";
import { addProduct } from "../../../store/features/product/addPoduct";

import ClipLoader from "react-spinners/ClipLoader";

import { toast, ToastContainer } from "react-toastify";

function AddProduct() {
  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  
  const dispatch = useDispatch();
  
  const handleListCategory = () => {
    dispatch(listCategory())
  }
  
  useEffect(() => {
    handleListCategory()
  }, [])
  
  const {data} = useSelector((state)=> state.listCategory);
  const addProductState = useSelector((state) => state.addProduct);

  toast(addProduct?.message);
  
  // FORM VALUES
  
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("category", "10");
    formData.append("desc", description);
    formData.append("price", price);
    formData.append("quantity", quantity);

    dispatch(addProduct(formData))
  }



  return (
    <div>
      <ToastContainer />
      <form >

        <Input 
          topText="Product name"
          name="name"
          placeholder="Enter Product Name"
          type="text"
          className="mt-[23px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
            onChange={handleFileChange}
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
                className="outline-0 border-[1px] bg-[#F8F8F8] w-[50%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer
                "
                onClick={handleClick}
              >
                <FaUpload className="text-[#BDBDBD]" />
                <p className="text-[#BDBDBD]">Upload Image(S)</p>
              </div>
            </div>
          ) : (
            <div
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer
                "
              onClick={handleClick}
            >
              <FaUpload className="text-[#BDBDBD]" />
              <p className="text-[#BDBDBD]">Upload Image(S)</p>
            </div>
          )}

          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Categories</p>
            <select 
                className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]">
                  <option value=""> - Select Category - </option>
                  {data ? data.map((item) => (
                    <option 
                      key={item.id}
                      name="category"
                      onChange={() => setCategory(item.id)}
                      value={item.id}>{item.name}</option>
                  )) : ""}
            </select>
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
          className="bg-[#000] w-[100%] py-[17px] rounded-[8px] mb-[50px]"
        >
          <p className="text-[#ffffff]">
                  {addProductState.loading ? 
                    <ClipLoader
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="#ffffff"
                    /> : "Add Product"
                }
            </p>
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
