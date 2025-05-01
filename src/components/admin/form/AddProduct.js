import { FaUpload } from "react-icons/fa6";
import React, { useRef, useState, useEffect } from "react";

import Input from "./Input";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../../store/features/product/listCategory";
import { addProduct } from "../../../store/features/product/addPoduct";

import ClipLoader from "react-spinners/ClipLoader";

import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function AddProduct() {
  const fileRef = useRef(null);
  const [showForm, setShowForm] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleListCategory = () => {
    dispatch(listCategory());
  };

  useEffect(() => {
    handleListCategory();
  }, []);

  const { data, error } = useSelector((state) => state.listCategory);
  const addProductState = useSelector((state) => state.addProduct);

  toast(addProduct?.message);

  // FORM VALUES

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [variations, setVariations] = useState([]);

  const handleFileChange = (event, setFileFunc, setImageUrlFunc) => {
    const uploadedFile = event.target.files[0];
    setFileFunc(uploadedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrlFunc(reader.result);
    };
    console.log(uploadedFile)
    reader.readAsDataURL(uploadedFile);
  };

  const handleClick = (fileRef) => {
    fileRef.current.click();
  };

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      { name: "", stock_quantity: 1, size: "", color: "#000000" },
    ]);
  };

  const handleSetShowForm = () => {
    setShowForm(false);
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = variations.map((variation, i) =>
      i === index ? { ...variation, [field]: value } : variation
    );

    setVariations(newVariations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", file, name, category, description, price, quantity);
return;
    // const formData = new FormData();
    // formData.append("image", file);
    // formData.append("name", name);
    // formData.append("category_id", category);
    // formData.append("desc", description);
    // formData.append("price", price);
    // formData.append("quantity", quantity);

    // dispatch(addProduct(formData));
  };

  const handleSetCategory = (id) => {
    setCategory(id);
  };
  return (
    <div>
      <Toaster />
      <div className="left-arrow" onClick={handleSetShowForm}>
        &#x2190;
      </div>
      <form>
        <Input
          topText="Product Name"
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
            <p className="text-[0.875rem]">Categories</p>
            <select
              required={true}
              onChange={(e) => handleSetCategory(e.target.value)}
              className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]"
            >
              <option value=""> - Select Category - </option>
              {data
                ? data.map((item) => (
                    <option key={item.id} name="category" value={item.id}>
                      {item.name}
                    </option>
                  ))
                : ""}
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

        <div>
          <hr className="mt-[23px] border-[1px] border-[#E0E0E0] h-[1px] w-[100%]" />
          <div className="flex items-center py-5 justify-between">
            <p className="text-[0.875rem]">Variation</p>
            <div className="flex items-center">
              {" "}
              <button type="button" onClick={handleAddVariation}>
                +
              </button>{" "}
            </div>
          </div>
          {variations.map((variation, index) => (
            <div key={index} className="transition-all duration-500">
              <Input
                topText="Stock Quantity"
                name={`variation_quantity_${index}`}
                placeholder="10"
                type="number"
                className="mt-[23px]"
                onChange={(e) =>
                  handleVariationChange(index, "stock_quantity", e.target.value)
                }
                value={variation.stock_quantity}
              />

              <div className="mt-[23px]">
                <p className="text-[0.875rem]">Size</p>
                <select
                  onChange={(e) =>
                    handleVariationChange(index, "size", e.target.value)
                  }
                  value={variation.size}
                  className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]"
                >
                  <option value=""> - Select Size - </option>
                  <option name="variation_size" value="XS">
                    XS
                  </option>
                  <option name="variation_size" value="S">
                    S
                  </option>
                  <option name="variation_size" value="M">
                    M
                  </option>
                  <option name="variation_size" value="L">
                    L
                  </option>
                  <option name="variation_size" value="XL">
                    XL
                  </option>
                  <option name="variation_size" value="XXL">
                    XXL
                  </option>
                </select>
              </div>

              <Input
                topText="Variation Color"
                name={`variation_color_${index}`}
                placeholder="red"
                type="color"
                className="mt-[23px]"
                onChange={(e) =>
                  handleVariationChange(index, "color", e.target.value)
                }
                value={variation.color}
              />
              <div className="flex items-center py-5 justify-between">
                <p className="text-[0.875rem]">Add Another Variation</p>
                <div className="flex items-center">
                  {" "}
                  <button type="button" onClick={handleAddVariation}>
                    +
                  </button>{" "}
                </div>
              </div>
              <hr className="mt-[23px] border-[1px] border-[#E0E0E0] h-[1px] w-[100%]" />
            </div>
          ))}
        </div>
        <br></br>

        <button
          onClick={handleSubmit}
          className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] mb-[50px]"
        >
          <p className="text-[#ffffff]">
            {addProductState.loading ? (
              <ClipLoader
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
                color="#ffffff"
              />
            ) : (
              "Add Product"
            )}
          </p>
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
