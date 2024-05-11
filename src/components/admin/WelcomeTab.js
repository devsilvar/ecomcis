import React, { useContext, useState } from "react";
import AddProduct from "../../utils/AddProductContext";
import AddAdminDrawer from "./drawer/AddAdminDrawer";

function WelcomeTab({ tabName }) {
  const { showCart, setShowCart } = useContext(AddProduct);

  const [showAdminDrawer, setShowAdminDrawer] = useState(false);

  return (
    <>
      <div className="mt-[15px] text-[#828282] flex justify-between items-center">
        {!tabName ? (
          <div>
            <p className="text-[1.25rem]">Good Morning🌄, Admin</p>
            <p className="text-[0.875rem]">
              Here’s the updates since you last logged in
            </p>
          </div>
        ) : (
          <p className="text-[1.5rem]">{tabName}</p>
        )}

        <div>
          {tabName === "Admins" ? (
            <button
              className="rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#000]"
              onClick={() => setShowAdminDrawer(!showAdminDrawer)}
            >
              <p>+</p>
              <p>Add an Admin</p>
            </button>
          ) : (
            <button
              className="rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#000]"
              onClick={() => setShowCart(!showCart)}
            >
              <p>+</p>
              <p>Add a product</p>
            </button>
          )}
        </div>
      </div>
      <AddAdminDrawer
        setShowDrawer={setShowAdminDrawer}
        showAdminDrawer={showAdminDrawer}
      />
    </>
  );
}

export default WelcomeTab;
