import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AddProduct from "../../utils/AddProductContext";
import AddProductDrawer from "../../components/admin/drawer/AddProductDrawer";

function AdminContainer() {
  const { showCart, setShowCart } = useContext(AddProduct);

  return (
    <div className="admin bg-[#F8F8F8] flex">
      <div>
        <Sidebar setShowCart={setShowCart} />
      </div>
      <div className="flex-1">
        <AddProductDrawer showCart={showCart} setShowCart={setShowCart} />
        <Header />
        <Outlet setShowCart={setShowCart} />
      </div>
    </div>
  );
}

export default AdminContainer;
