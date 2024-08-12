import { Drawer } from "antd";
import React, {useEffect} from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../store/features/product/getProduct";

function EditProductDrawer({ open, setOpen, id }) {
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.getProduct);

  const handleGetProduct = () => {
    dispatch(getProduct(id));
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  const onClose = () => {
    setOpen(false);
  };


  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      key={"right"}
      className="z-[100] w-[720px] m-0 p-[0px]"
    >
      <div className="w-[720px]"></div>
      <div className="h-[120px] bg-[#F8F8F8]">
        <div className="flex justify-between">
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
            <p className="text-[1.5rem] text-[#333333]">{data?.name}</p>
          </div>{" "}
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaEdit
              className="cursor-pointer text-[30px] text-[#333333]"
              onClick={() => {
                setOpen(false);
              }}
            />
            <IoTrash
              className="cursor-pointer text-[30px] text-[#DE1717]"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-[32px] flex flex-col gap-[24px]">
        <p className="text-[2rem] font-[400]">{data?.name}</p>
        <div className="flex gap-[10px]">
          <p className="text-[#828282]">Date added: </p>
          <p>{data?.created_at}</p>
        </div>
        <div className="flex gap-[10px]">
          <p className="text-[#828282]">Date added: </p>
          <p>24-08-2023</p>
        </div>

        <p>Product Info</p>
        <div className="bg-[#F8F8F8] w-[100%] rounded-[8px]">
          <div className="py-[10px]">
            <table className="w-[100%] text-center">
              <tr className="border-b-[1px] text-align py-[10px]">
                <th className="font-[400] pb-[10px]">Size</th>
                <th className="font-[400] pb-[10px]">Color</th>
                <th className="font-[400] pb-[10px]">Quantity Available</th>
                <th className="font-[400] pb-[10px]">Price(NGN)</th>
              </tr>
              <tr>
                <td className="pt-[10px]">S</td>
                <td className="pt-[10px]">Black</td>
                <td className="pt-[10px]">{data?.quantity}</td>
                <td className="pt-[10px]">{data?.price}</td>
              </tr>
            </table>
          </div>
        </div>
        <p className="text-[1.25rem]">Images/Videos</p>

        <img src={data?.image_url} alt="" className="w-[100%]" />
      </div>
    </Drawer>
  );
}

export default EditProductDrawer;
