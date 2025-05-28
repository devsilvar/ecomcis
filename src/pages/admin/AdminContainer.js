import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AddProduct from "../../utils/AddProductContext";
import AddProductDrawer from "../../components/admin/drawer/AddProductDrawer";
import { Toaster } from 'react-hot-toast';
import AuthContext from "../../AuthContext/AuthContext";
import ScrollToTop from "../../components/common/ScrollTotop";

function AdminContainer({ children, ...rest }) {
  const { showCart, setShowCart } = useContext(AddProduct);

  let { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <div className="admin bg-[#F8F8F8] flex">
      <ScrollToTop/>
      <div>
        <Sidebar setShowCart={setShowCart} />
      </div>
      <div className="flex-1">
        <AddProductDrawer showCart={showCart} setShowCart={setShowCart} />
        <Header />
        <Outlet setShowCart={setShowCart} />
        {/* <Toaster /> */}
      </div>
    </div>
  );
}

export default AdminContainer;
