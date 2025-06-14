import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AbandonedCart from './pages/admin/AbandonedCart'
import AdminContainer from './pages/admin/AdminContainer'
import AdminProducts from './pages/admin/AdminProducts'
import Admins from './pages/admin/Admins'
import Customers from './pages/admin/Customers'
import Dashboard from './pages/admin/Dashboard'
import Login from './pages/admin/Login'
import Orders from './pages/admin/Orders'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import Home from './pages/Home'
import { AddProductProvider } from './utils/AddProductContext'
// import { store } from "./utils/store";
import { AuthProvider } from './AuthContext/AuthContext'
import AccountContainer from './pages/account/AccountContainer'
import AddressBook from './pages/account/AddressBook'
import MyOrders from './pages/account/MyOrders'
import Profile from './pages/account/Profile'
import ThankYou from './pages/account/ThankYou'
import Extra from './pages/admin/Extra'
import OrderDetail from './pages/admin/OrderDetail'
import CreateAccount from './pages/CreateAccount'
import Registration from './pages/Registration'
import store from './store'

import About from './pages/About'
import AddVariation from './pages/admin/addVariation'
import NotFound from './pages/NotFound'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { Toaster } from 'react-hot-toast'
import { Shop } from './components/common/Shop'
import MyOrderDetail from './pages/account/MyOrderDetail'
import AddProduct from './pages/admin/addProduct'
import AdminProductDetail from './pages/admin/ProductDetail'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/CheckOut'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import { LegalPrivacy } from './pages/LegalPrivacy'
import { NewArrivals } from './pages/NewArrivals'
import { Payment } from './pages/Payment'
import { ProductDetails } from './pages/ProductDetails'
import { ReportScam } from './pages/ReportScam'
import { ReturnPolicy } from './pages/ReturnPolicy'
import Support from './pages/Support'
import { UserForgotPassword } from './pages/UserForgotPassword'
import { UserLogin } from './pages/UserLogin'
import { UserRegister } from './pages/UserRegister'
import { UserResetPassword } from './pages/UserResetPassword'
import { CurrencyProvider } from './utils/CurrencyProvider'
import ScrollToTop from './components/common/ScrollTotop'
import ShippingSettingsPage from './pages/admin/Shipping'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <UserLogin />,
	},
	{
		path: '/register',
		element: <UserRegister />,
	},
	{
		path: '/forgot-password',
		element: <UserForgotPassword />,
	},
	{
		path: '/users/reset-password',
		element: <UserResetPassword />,
	},
	{
		path: '/shop',
		element: <Shop />,
	},
	{
		path: '/shop/product/:id',
		element: <ProductDetails />,
	},
	{
		path: '/faqs',
		element: <FAQs />,
	},
	{
		path: '/about',
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
		path: '/support',
		element: <Support />,
	},
	{
		path: '/new-in',
		element: <NewArrivals />,
	},
	// {
	//   path: "/trending-products",
	//   element: <TrendingProducts />,
	// },
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '/checkout',
		element: <Checkout />,
	},
	{
		path: '/payment',
		element: <Payment />,
	},
	{
		path: '/legal-privacy',
		element: <LegalPrivacy />,
	},
	{
		path: '/contact-us',
		element: <Contact />,
	},
	{
		path: '/report-a-scam',
		element: <ReportScam />,
	},
	{
		path: '/return-policy',
		element: <ReturnPolicy />,
	},
	{
		path: '/register',
		element: <Registration />,
	},
	{
		path: '/create-account',
		element: <CreateAccount />,
	},
	{
		path: '/order-confirmed',
		element: <ThankYou />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
	},
	{
		path: '/admin/login',
		element: <Login />,
	},

	{
		path: '/admin/',
		element: <AdminContainer />,

		children: [
			{
				path: '/admin/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/admin/products',
				element: <AdminProducts />,
			},
			{
				path: '/admin/products/:id',
				element: <AdminProductDetail />,
			},
			{
				path: '/admin/products/add',
				element: <AddProduct />,
			},
			{
				path: '/admin/products/variations/add',
				element: <AddVariation />,
			},
			{
				path: '/admin/orders',
				element: <Orders />,
			},
			{
				path: '/admin/shipping',
				element: <ShippingSettingsPage/>,
			},
			{
				path: '/admin/orders/order/:id',
				element: <OrderDetail />,
			},
			{
				path: '/admin/customers',
				element: <Customers />,
			},
			{
				path: '/admin/reports',
				element: <Reports />,
			},
			{
				path: '/admin/abandoned-cart',
				element: <AbandonedCart />,
			},
			{
				path: '/admin/admins',
				element: <Admins />,
			},
			{
				path: '/admin/settings',
				element: <Settings />,
			},
			{
				path: '/admin/extras',
				element: <Extra />,
			},
		],
	},
	{
		path: '/account',
		element: <AccountContainer />,
		children: [
			{
				path: '/account/profile',
				element: <Profile />, // <PrivateRoute> <Profile /></PrivateRoute> ,
			},
			{
				path: '/account/address-book',
				element: <AddressBook />, // <PrivateRoute> <AddressBook/></PrivateRoute> ,
			},
			{
				path: '/account/my-orders',
				element: <MyOrders />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
			},
			{
				path: '/account/my-orders/:id',
				element: <MyOrderDetail />, //<PrivateRoute> <MyOrders /> </PrivateRoute>
			},
			// {
			//   path: "/account/saved",
			//   element: <SavedItems />, //<PrivateRoute> <SavedItems /> </PrivateRoute>
			// },
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])

function App() {
	React.useEffect(() => {
		AOS.init({
			duration: 700,
			easing: 'ease-out-cubic',
		})
	}, [])

	return (
		<>

			<AuthProvider>
				<Provider store={store}>
					<CurrencyProvider>
						<AddProductProvider>
							{/* <ScrollToTop /> */}
							<RouterProvider router={router} />
							<Toaster />
						</AddProductProvider>
					</CurrencyProvider>
				</Provider>
			</AuthProvider>
		</>
	)
}

export default App
