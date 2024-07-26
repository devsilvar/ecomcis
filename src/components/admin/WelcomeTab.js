import React, { useContext, useState } from "react";
import AddProduct from "../../utils/AddProductContext";
import AddAdminDrawer from "./drawer/AddAdminDrawer";

import { Link } from "react-router-dom";

function WelcomeTab({ tabName }) {
  const { showCart, setShowCart } = useContext(AddProduct);

  const [showAdminDrawer, setShowAdminDrawer] = useState(false);

  function getGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning!🌄";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good Afternoon!🌄";
    } else if (currentHour >= 18 && currentHour < 21) {
      greeting = "Good Evening!🌆";
    } else {
      greeting = "Good Night!🌆";
    }

    return greeting;
  }

  return (
    <>
      <div className="mt-[15px] text-[#828282] flex justify-between items-center">
        {!tabName ? (
          <div>
            <p className="text-[1.25rem]">{getGreeting()}, Admin</p>
            <p className="text-[0.875rem]">
              Here's the updates since you last logged in
            </p>
          </div>
        ) : (
          <p className="text-[1.5rem]">{tabName}</p>
        )}

        <div>
          {tabName === "Admins" ? (
            <button
              className="rounded-[4px] text-[#fff] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#4E0240]"
              onClick={() => setShowAdminDrawer(!showAdminDrawer)}
            >
              <p>+</p>
              <p>Add an Admin</p>
            </button>
          ) : (
            <Link 
              className="rounded-[4px] w-[173px] h-[48px] px-[20px] items-center justify-between flex bg-[#4E0240] text-[#fff]"
              to="/admin/products/add">+ Add a product</Link>
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
