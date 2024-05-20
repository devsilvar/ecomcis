import { input, Form, Formik } from "formik";
import { FaUpload } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import { useCreateProductMutation } from "../../../services/productApi";
import Input from "./Input";

const ADDPRODUCTFIELDS = [
  {
    name: "name",
    placeholder: "Enter Product Name",
    text: "Product Name",
  },
  {
    name: "quantity",
    placeholder: "Quantity",
    text: "Quantity",
    type: "number",
  },
  {
    name: "price",
    placeholder: "Enter price",
    text: "Price",
    type: "number",
  },
];

function AddProduct() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div>
      {ADDPRODUCTFIELDS.map((fields) => (
        <Input
          className="mt-[23px]"
          key={fields.name}
          name={fields.name}
          placeholder={fields.placeholder}
          topText={fields.text}
          type={fields.type}
        />
      ))}

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
          <p className="text-[0.875rem]">Description</p>
          <textarea
            placeholder="Description"
            name="desc"
            className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
