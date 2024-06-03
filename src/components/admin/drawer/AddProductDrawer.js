import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import AddProduct from "../form/AddProduct";
import SelectCategory from "../form/SelectCategory";
import AddVariation from "../form/AddVariation";

import AddCategory from "../form/AddCategory";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import listProductSlice, { listProduct} from "../../../store/features/product/listProduct";

function AddProductDrawer({ showCart, setShowCart }) {
  const [showCategory, setShowCategory] = useState(false);
  const [addVariation, setAddVariation] = useState(false);
//   const [createProduct] = useCreateProductMutation();
  const [allCategories, setAllCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

//   const { data, error, isError, isLoading } = useGetAllCategoriesQuery();

  const handleListProducts = () => {
    dispatch(listProduct())
  }

  const productData = useSelector((state) => state.listProduct)


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

    setShowCategory(true);
  };

  return (
    <div class="w-2/5 hidden absolute top-0 right-0">
        <AddProduct></AddProduct>
    </div>
  );
}

export default AddProductDrawer;
