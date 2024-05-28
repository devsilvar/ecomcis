import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import AddProduct from "../form/AddProduct";
import SelectCategory from "../form/SelectCategory";
import AddVariation from "../form/AddVariation";
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
} from "../../../services/productApi";
import AddCategory from "../form/AddCategory";
import { toast } from "react-toastify";

function AddProductDrawer({ showCart, setShowCart }) {
  const [showCategory, setShowCategory] = useState(false);
  const [addVariation, setAddVariation] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [allCategories, setAllCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const { data, error, isError, isLoading } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        setAllCategories(data);
      } else {
        console.log(error);
      }
    }
  }, [isLoading]);

  const notify = (msg) => toast(msg);

  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("name", e.target.name.value);
    formData.append("category", parseInt(e.target.category.value));
    formData.append("desc", e.target.desc.value);
    formData.append("price", e.target.price.value);
    formData.append("quantity", e.target.quantity.value);

    createProduct(formData).then((res) => {
      setLoading(false);
      if (res.error) {
        notify("Something went wrong");
      } else {
        console.log("set");
        setAddVariation(true);
      }
    });

    setShowCategory(true);
  };

  return (
    <div
      className={clsx(
        "fixed  right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-300 ease-in-out",
        showCart ? "" : "translate-x-[100vw]"
      )}
    >
      {addVariation ? (
        <div className="ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]">
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setShowCart(false);
                setAddVariation(false);
                setShowCategory(false);
              }}
            />
            <p className="text-[1.5rem]">Add Variation</p>
          </div>
          <AddVariation />
        </div>
      ) : (
        <div
          className={clsx(
            "ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]"
          )}
        >
          {showCategory ? (
            <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px] ">
              <FaArrowLeft
                className="cursor-pointer"
                onClick={() => {
                  setShowCategory(false);
                }}
              />
              <p className="text-[1.5rem]">Add Category</p>
            </div>
          ) : (
            <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px] ">
              <FaArrowLeft
                className="cursor-pointer"
                onClick={() => {
                  setShowCart(false);
                }}
              />
              <p className="text-[1.5rem]">Add a Product</p>
            </div>
          )}
          <div>
            <form
              className="px-[35px]"
              enctype="multipart/form-data"
              onSubmit={handleAddProduct}
            >
              <div className={clsx(showCategory ? "hidden" : "")}>
                <AddProduct />
              </div>
              {showCategory && (
                <div>
                  <SelectCategory
                    loading={loading}
                    setLoading={setLoading}
                    allCategories={allCategories}
                    isError={isError}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </form>

            {showCategory && (
              <AddCategory
                allCategories={allCategories}
                setAllCategories={setAllCategories}
                categoryLoading={categoryLoading}
                setCategoryLoading={setCategoryLoading}
              />
            )}
          </div>

          {!showCategory && (
            <div className="mt-[23px] mx-[35px]">
              <button
                onClick={() => setShowCategory(true)}
                className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
                placeholder="e.g. Username"
              >
                <p className="font-[500] text-[#ffffff]">Add Product</p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddProductDrawer;
