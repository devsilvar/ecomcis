import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewArrivals from "./pages/NewArrivals";
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
import ThankYou from "./pages/account/ThankYou";

import NotFound from "./pages/NotFound";
import AddVariation from "./pages/admin/addVariation";
import About from "./pages/About";

import PrivateRoute from "./utils/PrivateRoute";
import MyOrderDetail from "./pages/account/MyOrderDetail";
import AddProduct from "./pages/admin/addProduct";
import AdminProductDetail from "./pages/admin/ProductDetail";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import TrendingProducts from "./pages/TrendingProduct";
import ForgotPassword from "./pages/ForgotPassword";
import { CurrencyProvider } from "./utils/CurrencyProvider";
import ResetPassword from "./pages/ResetPassword";
import { UserLogin } from "./pages/UserLogin";
import { UserRegister } from "./pages/UserRegister";
import { UserForgotPassword } from "./pages/UserForgotPassword";
import { UserResetPassword } from "./pages/UserResetPassword";
import { Shop } from "./components/common/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import Contact from "./pages/Contact";
import { ReportScam } from "./pages/ReportScam";
import { Checkout } from "./pages/Checkout";
import { Cart } from "./pages/Cart";
import { Payment } from "./pages/Payment";
import { ReturnPolicy } from "./pages/ReturnPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/forgot-password",
    element: <UserForgotPassword />,
  },
  {
    path: "/users/reset-password",
    element: <UserResetPassword />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/faqs",
    element: <FAQs />,
  },
  {
    path: "/about",
    element: <About />,
  },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  // },
  // {
  //   path: "/users/reset-password",
  //   element: <ResetPassword />,
  // },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/new-arrivals",
    element: <NewArrivals />,
  },
  // {
  //   path: "/trending-products",
  //   element: <TrendingProducts />,
  // },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  // {
  //   path: "/about",
  //   element: <App />,
  // },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/report-a-scam",
    element: <ReportScam />,
  },
  {
    path: "/return-policy",
    element: <ReturnPolicy />,
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
    path: "/order-confirmed",
    element: <ThankYou />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
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
        path: "/admin/products/:id",
        element: <AdminProductDetail />,
      },
      {
        path: "/admin/products/add",
        element: <AddProduct />,
      },
      {
        path: "/admin/products/variations/add",
        element: <AddVariation />,
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
        element: <Profile />, // <PrivateRoute> <Profile /></PrivateRoute> ,
      },
      {
        path: "/account/address-book",
        element: <AddressBook />, // <PrivateRoute> <AddressBook/></PrivateRoute> ,
      },
      {
        path: "/account/my-orders",
        element: <MyOrders />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
      },
      {
        path: "/account/my-orders/:id",
        element: <MyOrderDetail />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
      },
      {
        path: "/account/saved",
        element: <SavedItems />, //<PrivateRoute> <SavedItems /> </PrivateRoute>
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <CurrencyProvider>
          <AddProductProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AddProductProvider>
        </CurrencyProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
