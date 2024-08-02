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

const PopoverBtn = ({ id, products, setProducts }) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidePopOver, setHidePopOver] = useState(false);

  const dispatch = useDispatch();
  const deleteProductState = useSelector((state) => state.removeProduct);

  const handleDelete = (id) => {
    dispatch(removeProduct({ product_ids: [id] }))
  };

  const [openModal, setOpenModal] = useState(false);
  const handleShowDelete = () => {
    setOpenModal(!openModal);
  };

  const handleOpenEditProductDrawer = () => {
    setOpen(!open);
    setHidePopOver(!hidePopOver);
    setHovered(false);
  };

  const handleHoverChange = (open) => {
    setHovered(open);
  };

  return (
    <>
      <Popover
        className="-z-[1]"
        placement="bottom"
        content={
          <div className={clsx(" flex flex-col gap-2 text-gray-3 px-2")}>
            <div
              className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5"
              onClick={handleOpenEditProductDrawer}
            >
              <p className=" leading-normal font-normal text-sm">
                View details
              </p>
            </div>
            <div className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5">
              <p
                className=" leading-normal font-normal text-sm"
                onClick={handleOpenEditProductDrawer}
              >
                Update Stock
              </p>
            </div>

            <div
              className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5"
              onClick={handleShowDelete}
            >
              <p className=" leading-normal font-normal text-sm text-[red]">
                Delete Item
              </p>
            </div>
          </div>
        }
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
      >
        <div className="flex flex-col justify-center items-center text-gray-1 font-bold cursor-pointer">
          <IoEllipsisVerticalSharp className="w-6 h-6 text-grey-1" />
        </div>
      </Popover>
      <EditProductDrawer open={open} setOpen={setOpen} id={id} />

      <Modal open={openModal}>
        <div className="flex justify-between border-b-[1px] pb-[10px]">
          <p className="text-[#E0E0E0] text-[1.25rem]">Delete Item</p>
          <div
            className="text-[#E0E0E0] h-[30px] w-[30px] flex items-center justify-center rounded-[50%] border-[1px]"
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            X
          </div>
        </div>

        <div className="py-[55px] flex justify-center flex-col items-center">
          <IoTrash className="text-[50px] text-[#E31313]" />
          <p className="text-center">
            Are you sure you want to delete this products?
          </p>
        </div>

        <button
          className="bg-[#E31313] w-[100%] py-[17px] rounded-[8px] mb-[50px]"
          onClick={() => handleDelete(id)}
        >
          <p className="text-[#ffffff]">
            {deleteProductState?.loading ? <ClipLoader color="#fff" size={10} /> : "Delete Product"}
          </p>
        </button>
      </Modal>
    </>
  );
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
                          src={product?.image.substring(13)}
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
                        <p>{product.category}</p>
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
