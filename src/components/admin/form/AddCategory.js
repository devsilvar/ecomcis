import React, { useState } from "react";
import { useAddCategoriesMutation } from "../../../services/productApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

function AddCategory({
  categoryLoading,
  setCategoryLoading,
  setAllCategories,
  allCategories,
}) {
  const [addCategories] = useAddCategoriesMutation();
  const notify = (msg) => toast(msg);

  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategoryLoading(true);

    addCategories({
      name: categoryName,
    })
      .then((res) => {
        setCategoryLoading(false);
        if (res.error) {
          notify("Something went wrong");
        } else {
          setAllCategories([...allCategories, res.data]);
          notify("Category added successfully");
        }

        setCategoryName("");
      })
      .catch((err) => {
        setCategoryLoading(false);
        setCategoryName("");

      });
  };
  return (
    <div className="mt-[40px] mx-[35px]">
      <h1 className="text-[1.5rem]"> Category Not on List Above</h1>

      <h2 className="text-[1rem] font-[700] text-[#A2A0A0]">Create Category</h2>
      <form onSubmit={handleAddCategory}>
        <div className="mt-[23px]">
          <p className="text-[0.875rem]">Category</p>
          <input
            className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
            placeholder="e.g. gown"
            name="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <button
          className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
          placeholder="e.g. Username"
        >
          {categoryLoading ? (
            <ClipLoader
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <p className="font-[500] text-[#ffffff]">Select Category</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
