import { Modal, Popover } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoEllipsisVerticalSharp, IoTrash } from "react-icons/io5";
import EditProductDrawer from "../drawer/EditProductDrawer";
import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../../store/features/product/listProduct";
import { removeProduct } from "../../../store/features/product/removeProduct";
import {formatDateOnly, formatMoney} from "../../../utils/nairaFormat";

import ClipLoader from "react-spinners/ClipLoader";
import MoonLoader from "react-spinners/MoonLoader";
import Products from "../../newarrivals/Products";
import { Link } from "react-router-dom";

const customStyles = {
  rows: {
    style: {
      padding: "12px 0px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

function ProductsTables() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.listProduct);
  
  const {data, loading} = productData;

  const handleGetProduct = () => {
    dispatch(listProduct());
  };

  useEffect(() => {
    handleGetProduct();
  }, []);



  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">QTY.</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {loading ? <div className="w-full mx-auto flex justify-center items-center text-[#4E0240]"> <MoonLoader size="60"/> </div>: (
                data?.results?.map(product => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product?.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p>{product.product_tag}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{formatMoney(product.price)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{product.category.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{product.quantity}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{formatDateOnly(product.created_at)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <Link className="p-3 bg-[#000] text-[#fff]" to={`/admin/products/${product.id}`}>Details</Link>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
    </div>
  );
}

export default ProductsTables;
