import { input, Form, Formik } from "formik";
import { FaUpload } from "react-icons/fa6";
import React, { useRef, useState } from "react";
import { useCreateProductMutation } from "../../../services/api";

function AddProduct({ setShowCategory }) {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const [createProduct] = useCreateProductMutation();

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", file);
    setFile(e.target.files[0]);
  };

  return (
    <div className="px-[35px]">
      <form
        enctype="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.image.value);
          const image = file;

          console.log(image, 0);
          createProduct({
            name: "Women's Black Dress",
            product_tag: "WDRESS-001",
            category: 2,
            desc: "Elegant black dress for women.",
            price: 79.99,
            quantity: 30,
            image: image,
          }).then((res) => {
            console.log(res);
          });

          setShowCategory(true);
        }}
      >
        <div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Name</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            />
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Description</p>
            <input
              type="textarea"
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] p-[16px] mt-[16px]"
              placeholder="Description"
            />
          </div>
          <div className="mt-[23px]">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="hidden"
              ref={fileRef}
            />
            <p className="text-[0.875rem]">Images</p>
            <div
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer
              "
              onClick={() => fileRef.current.click()}
            >
              <FaUpload className="text-[#BDBDBD]" />
              <p className="text-[#BDBDBD]">Upload Image(S)</p>
            </div>
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Stock in hand</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="100"
            />
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Price</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="₦100000"
            />
          </div>

          <div className="mt-[23px]">
            <button
              className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            >
              <p className="font-[500] text-[#ffffff]">Add Product</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
