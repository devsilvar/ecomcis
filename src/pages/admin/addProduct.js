import React, { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Toaster } from "react-hot-toast";
import Input from "../../components/admin/form/Input";

import { addProduct } from "../../store/features/product/addPoduct";

import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../store/features/product/addCategory";

import Button from "../../components/common/Button";

function AddProduct() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [addCategoryData, setAddCategory] = useState("");
  const [showVariation, setShowVariation] = useState(false);

  const [categorayModal, setCategorayModal] = useState(false);
  const categoryState = useSelector((store) => store.addCategory);
  const [productId, setProductId] = useState("");

  const { data } = useSelector((state) => state.listCategory);
  const addProductState = useSelector((state) => state.addProduct);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("image_files", image);
    });

    formData.append("image", file);
    formData.append("name", name);
    formData.append("category_id", category);
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
    setAddCategory(event.target.value);
  };

  const handleAddCategorySubmit = (event) => {
    event.preventDefault();
    dispatch(addCategory({ name: addCategoryData }));
  };

  useEffect(() => {
    if (addProductState.data) {
      setProductId(addProductState.data?.product.id);
    }
  }, [addProductState.data]);

  return (
    <div>
      <Toaster />

      {/* ADD CATEGORY MODAL */}
      <div
        className={`${
          categorayModal ? "flex" : "hidden"
        } fixed top-0 left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={handleCloseModal}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
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
              >
                {" "}
                {categoryState.loading ? (
                  <ClipLoader color="#fff" size={10} />
                ) : (
                  "+ Add Category"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex p-9">
        <div
          className={`w-2/3 bg-[#fff] rounded-[10px] p-5 ${
            !showVariation ? "flex" : "hidden"
          }`}
        >
          <form className="w-[100%]">
            <div className="mt-[23px]">
              <p className="text-[0.875rem]">Category</p>
              <div className="flex justify-between items-center">
                <select
                  required={true}
                  onChange={(e) => handleSetCategory(e.target.value)}
                  className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[80%] mx-[10px] rounded-[8px] px-[16px]"
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
                <div
                  onClick={handleOpenModal}
                  className="bg-[#4E0240] p-3 rounded text-[#fff] cursor-pointer"
                >
                  + Category
                </div>
              </div>
            </div>
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
              <p className="text-[0.875rem]">Description</p>
              <textarea
                placeholder="Description"
                name="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[100px] rounded-[8px] px-[16px] mt-[16px] flex items-center justify-center cursor-pointer"
              ></textarea>
            </div>

            <div className="mt-[23px]">
              <p className="text-[0.875rem] mb-[10px]">
                Images{" "}
                <span className="text-[#aaa]">
                  (Select about 3 to 4 images and images should not be more than
                  500mb)
                </span>
              </p>
              <input
                type="file"
                name="image"
                ref={fileRef}
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange(e)}
              />
              <div className="flex flex-wrap mt-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="mr-2 mb-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`selected-${index}`}
                      className="h-24 w-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSubmit}>
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
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
