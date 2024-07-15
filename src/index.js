import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewArrivals from "./pages/NewArrivals";
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";
import AdminContainer from "./pages/admin/AdminContainer";
import { AddProductProvider } from "./utils/AddProductContext";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Reports from "./pages/admin/Reports";
import AbandonedCart from "./pages/admin/AbandonedCart";
import Admins from "./pages/admin/Admins";
import Settings from "./pages/admin/Settings";
import AdminProducts from "./pages/admin/AdminProducts";
import Login from "./pages/admin/Login";
import { Provider } from "react-redux";
// import { store } from "./utils/store";
import store from "./store";
import { AuthProvider } from "./AuthContext/AuthContext";
import Registration from "./pages/Registration";
import CreateAccount from "./pages/CreateAccount";
import AccountContainer from "./pages/account/AccountContainer";
import Profile from "./pages/account/Profile";
import AddressBook from "./pages/account/AddressBook";
import MyOrders from "./pages/account/MyOrders";
import SavedItems from "./pages/account/SavedItems";
import AllProducts from "./pages/Products";
import Extra from "./pages/admin/Extra";
import OrderDetail from "./pages/admin/OrderDetail";

import NotFound from "./pages/NotFound";

import PrivateRoute from "./utils/PrivateRoute";
import Payment from "./pages/account/Payment";
import MyOrderDetail from "./pages/account/MyOrderDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new-arrivals",
    element: <NewArrivals />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "all-products",
    element: <AllProducts />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/about",
    element: <App />,
  },
  {
    path: "/contact",
    element: <App />,
  },
  {
    path: "/products",
    element: <App />,
  },
  {
    path: "payment",
    element: <Payment />,
  },

  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "/admin/",
    element: <AdminContainer />,

    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/orders/order/:id",
        element: <OrderDetail />,
      },
      {
        path: "/admin/customers",
        element: <Customers />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },
      {
        path: "/admin/abandoned-cart",
        element: <AbandonedCart />,
      },
      {
        path: "/admin/admins",
        element: <Admins />,
      },
      {
        path: "/admin/settings",
        element: <Settings />,
      },
      {
        path: "/admin/extras",
        element: <Extra />,
      },
    ],
  },
  {
    path: "/account",
    element: <AccountContainer />,
    children: [
      {
        path: "/account/profile",
        element:<Profile/>// <PrivateRoute> <Profile /></PrivateRoute> ,
      },
      {
        path: "/account/address-book",
        element: <AddressBook/>// <PrivateRoute> <AddressBook/></PrivateRoute> ,
      },
      {
        path: "/account/my-orders",
        element: <MyOrders/>//<PrivateRoute> <MyOrders /> </PrivateRoute>
      },
      {
        path: "/account/my-orders/:id",
        element: <MyOrderDetail/>//<PrivateRoute> <MyOrders /> </PrivateRoute>
      },
      {
        path: "/account/saved",
        element:  <SavedItems/>//<PrivateRoute> <SavedItems /> </PrivateRoute>
      },
    ],
  },
  {
    path:"*",
    element: <NotFound />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <AddProductProvider>
          <RouterProvider router={router} />
        </AddProductProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
