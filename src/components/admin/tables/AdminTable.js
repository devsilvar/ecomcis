import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../../utils/constant";
import { IoEllipsisVerticalSharp, IoTrash } from "react-icons/io5";
import { Modal, Popover } from "antd";
import EditProductDrawer from "../drawer/EditProductDrawer";
import clsx from "clsx";

import ClipLoader from "react-spinners/ClipLoader";

import AdminDetailsDrawer from "../drawer/AdminDetailsDrawer";


import { useDispatch, useSelector } from "react-redux";
import { listAdmins } from "../../../store/features/admin/admins/listAdmins";
import { removeProduct } from "../../../store/features/product/removeProduct";


const columns = [
  {
    name: "Name",
    selector: (row) => row.full_name,
  },

  {
    name: "Email Address",
    selector: (row) => row.email,
  },
  {
    name: "Last Seen",
    selector: (row) => row.updated_at,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
  {
    name: "",
    selector: (row) => <PopoverBtn id={row.id} />,
  },
];

const PopoverBtn = ({ id }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidePopOver, setHidePopOver] = useState(false);
  const removeProductState = useSelector((state) => state.removeProduct);
  const [showAdminDetailsDrawer, setShowAdminDetailsDrawer] = useState(false);

  const handleDelete = (id) => {
    dispatch(removeProduct({ product_ids: [id] }));
  };

  console.log('REMOVE PRODUCT STATE', removeProductState);

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
            <div className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5">
              <p
                className=" leading-normal font-normal text-sm"
                onClick={() => setShowAdminDetailsDrawer(true)}
              >
                View Details
              </p>
            </div>

            <div className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5">
              <p
                className=" leading-normal font-normal text-sm"
                onClick={handleOpenEditProductDrawer}
              >
                Lock Admin
              </p>
            </div>

            <div
              className="flex gap-2 items-center  cursor-pointer hover:translate-y-0.5"
              onClick={handleShowDelete}
            >
              <p className=" leading-normal font-normal text-sm text-[red]">
                Remove Admin
              </p>
            </div>
          </div>
        }
        trigger="click"
        open={hovered}
        onOpenChange={handleHoverChange}
      >
        <div className="flex flex-col justify-center items-center text-gray-1 font-bold cursor-pointer">
          <IoEllipsisVerticalSharp className="w-6 h-6 text-grey-1" />
        </div>
      </Popover>

      <Modal open={openModal}>
        <div className="flex justify-between border-b-[1px] pb-[10px]">
          <p className="text-[#E0E0E0] text-[1.25rem]">Remove Admin</p>
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
            Are you sure you want to delete this Admin?
          </p>
        </div>

        <button
          className="bg-[#E31313] w-[100%] py-[17px] rounded-[8px] mb-[50px]"
          onClick={() => handleDelete(id)}
        >
          <p className="text-[#ffffff]">Delete Product</p>
        </button>
      </Modal>
      <AdminDetailsDrawer
        setShowAdminDetailsDrawer={setShowAdminDetailsDrawer}
        showAdminDetailsDrawer={showAdminDetailsDrawer}
      />
    </>
  );
};

function AdminTable() {
  const [admins, setAdmins] = useState([]);
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.listAdmin);


  const {data, loading, error} = adminState;

  useEffect(() => {
    dispatch(listAdmins());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!error) {
        setAdmins(data?.results);
      } else {
        console.log(error);
      }
    }
  }, [loading]);
  return (
    <>
      <DataTable
        columns={columns}
        data={admins}
        pagination
        customStyles={customStyles}
      />
    </>
  );
}

export default AdminTable;
