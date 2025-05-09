import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-hot-toast'
import { logout } from '../store/authSlice'
import { baseUrl } from '../utils/constant'

const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithReauth = async (args, store, extraOptions) => {
	let result = await baseQuery(args, store, extraOptions)

	// const authState = store.getState().auth;

	if (result.error && result.error.status === 401 && store.getState().auth.token) {
		// if (!authState.token || !authState.refreshToken) return result;
		store.dispatch(logout())
		toast.error('Session expired, please login again')
		window.location.href = '/login'
	}

	return result
}

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	keepUnusedDataFor: 60 * 60 * 24, // 24 hours
	refetchOnReconnect: true,
	endpoints: build => ({
		getProducts: build.query({
			query: (args = {}) => {
				const { name = '', color = '', size = '', price_min = '', price_max = '' } = args

				return {
					url: 'products/products-filter',
					...(args && { params: { name, color, size, price_min, price_max } }),
				}
			},
		}),
		getProductById: build.query({
			query: id => `products/product/${id}`,
		}),
		getCartItems: build.query({
			query: () => `cart/cart-items`,
			providesTags: ['Cart'],
		}),
		addToCart: build.mutation({
			query: product => ({
				url: `cart/add-to-cart/`,
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Cart'],
		}),
		deleteFromCart: build.mutation({
			query: id => ({
				url: `cart/cart/remove/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Cart'],
		}),
		clearCart: build.mutation({
			query: () => ({
				url: 'cart/cart/clear',
				method: 'DELETE',
			}),
			invalidatesTags: ['Cart'],
		}),
		addToWishlist: build.mutation({
			query: product => ({
				url: `cart/wishlist/`,
				method: 'POST',
				body: product,
			}),
		}),
		login: build.mutation({
			query: user => ({
				url: `users/login/`,
				method: 'POST',
				body: user,
			}),
		}),
		register: build.mutation({
			query: user => ({
				url: `users/register/`,
				method: 'POST',
				body: user,
			}),
		}),
		forgotPassword: build.mutation({
			query: payload => ({
				url: `users/password-reset/`,
				method: 'POST',
				body: payload,
			}),
		}),
		resetPassword: build.mutation({
			query: payload => ({
				url: `users/reset-password/${payload.userId}/${payload.token}/`,
				method: 'POST',
				body: payload.data,
			}),
		}),
		getShippingAddress: build.query({
			query: () => `users/shipping_address_details/`,
		}),
		addShippingAddress: build.mutation({
			query: payload => ({
				url: `users/addresses/create/`,
				method: 'POST',
				body: payload,
			}),
		}),
		createOrder: build.mutation({
			query: payload => ({
				url: `orders/create-order/`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Cart'],
		}),
		payWithWallx: build.mutation({
			query: payload => ({
				url: `https://business.wallx.co/api-v1/claim_paycode/`,
				method: 'POST',
				body: payload,
			}),
		}),
		getCurrencyRates: build.query({
			query: () =>
				`https://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API_KEY}`,
		}),
		getNewsFlash: build.query({
			query: () => 'notifications/newsflash/',
		}),
		getUserLocation: build.query({
			query: () => 'https://ipapi.co/json/',
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useAddToCartMutation,
	useAddToWishlistMutation,
	useGetCartItemsQuery,
	useResetPasswordMutation,
	useLoginMutation,
	useRegisterMutation,
	useForgotPasswordMutation,
	useAddShippingAddressMutation,
	useGetShippingAddressQuery,
	useCreateOrderMutation,
	usePayWithWallxMutation,
	useGetCurrencyRatesQuery,
	useGetNewsFlashQuery,
	useDeleteFromCartMutation,
	useClearCartMutation,
	useGetUserLocationQuery,
} = api
