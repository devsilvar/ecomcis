import * as React from 'react'
import { toast } from 'react-hot-toast'
import { PiMinus, PiPlus } from "react-icons/pi";
import { RiLoader4Line } from 'react-icons/ri'
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CartTotal } from '../components/common/CartTotal'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import { PaymentOptionsDialog } from '../components/modals/PaymentOptionsDialog'
import { ThankYouForShoppingDialog } from '../components/modals/ThankYouForShoppingDialog'
import usePageTitle from '../hook/usePageTitle'
import { useDispatch } from "react-redux";

import {
	useCreateOrderMutation,
	useDeleteFromCartMutation,
	useClearCartMutation,
	useUpdateQuantityMutation,
	useGetUserLocationQuery,
	useGetCartItemsQuery,
	useGetShippingAddressQuery,
} from '../services/api'
import { removeFromCart, decreaseQuantity,
	increaseQuantity } from '../store/features/cart/saveToCart'
import { useCurrency } from '../utils/CurrencyProvider'
import { formatMoney } from '../utils/nairaFormat'

export const Payment = () => {
	usePageTitle('Payment | Amaraé')
	const [order, setOrder] = React.useState(null)
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false)
	const [openThankYouModal, setOpenThankYouModal] = React.useState(false)
	const { data: shippingAddress } = useGetShippingAddressQuery()
	const navigate = useNavigate()

	const [clearCart] = useClearCartMutation()
	const { token } = useSelector(state => state.auth)
	const { data: cart, isLoading } = useGetCartItemsQuery()

	const [createOrder, { isLoading: isPending }] = useCreateOrderMutation()
	const handleCreateOrder = async e => {
		e.preventDefault()
		try {
			const resp = await createOrder({
				shipping_address_id: shippingAddress.id,
			}).unwrap()
			alert('working')
			 toast.success("Order created successfully!");
			setOrder(resp)
		} catch (error) {
			alert('got an arror')
			toast.error("Error creating order")
			console.error(error)
		}
	}

	React.useEffect(() => {
		if (!token) {
			navigate('/login')
			toast.error('You must be logged in to checkout!')
		}
	}, [token])
console.log(cart, "cart items");
	
	const DeleteAllCartItem = async () => {
		try {
			await clearCart().unwrap()
			setIsModalOpen(false)
			toast.success('Cart cleared successfully!')
		} catch (error) {
			console.error(error)
			toast.error('Failed to clear cart')
		}
	}
	

	return (
		<>		
		 <Modal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="Confirm Clear Cart"
      >
        <p className="text-3xl">Are you sure you want to clear the cart?</p>
        <div className="flex justify-end gap-4 mt-4 ">
          <button onClick={() => setIsModalOpen(false)} className=" btn-cancel bg-gray-300 px-4 py-2">
            Cancel
          </button>
          <button onClick={DeleteAllCartItem} className="bg-rebel-ruby-100 text-white px-4 py-2 btn-confirm">
            Yes, Clear Cart
          </button>
        </div>
      </Modal>
		<WebsiteLayout>
			<section className='py-10'>
				<Wrapper>
					<div className='text-xs text-[#515655] flex items-center gap-2'>
						<Link className='hover:underline' to='/'>
							Home
						</Link>
						<p>/</p>
						<Link className='hover:underline' to='/shop'>
							Shop
						</Link>
						<p>/</p>
						<Link className='hover:underline' to='/checkout'>
							Checkout
						</Link>
						<p>/</p>
						<p className='text-rebel-ruby-100'>Payment</p>
					</div>

					<form
						id='form'
						onSubmit={handleCreateOrder}
						className='lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10'>
						{isLoading ? (
							<div className='flex col-span-2 items-center gap-2'>
								<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
								<p className='font-medium'>Loading...</p>
							</div>
						) : (
							<div className='col-span-2 flex flex-col gap-6'>
								<div className='hidden md:grid md:grid-cols-7 p-5 shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] rounded'>
									<p className='col-span-3'>Product</p>
									<p>Unit Price</p>
									<p className='text-center'>Quantity</p>
									<p className='text-right'>Total</p>
									<p className='text-right'></p>
								</div>

								{cart?.length ? (
									[...cart]?.sort((a, b) => a.id - b.id).map(item => (
										<CartItem key={item.id} item={item} />
									  ))
								) : (
									<p className='text-sm'>Your Cart is empty!</p>
								)}
							</div>
						)}
						<CartTotal isPending={isPending} btnText='Proceed to Payment' />
					</form>
						<button onClick={() => setIsModalOpen(true)} className="bg-gray-300 p-2 my-4">Clear Cart</button>
				</Wrapper>
			</section>
			<PaymentOptionsDialog
				open={open}
				setOpen={setOpen}
				order={order}
				setOpenThankYouModal={setOpenThankYouModal}
			/>
			<ThankYouForShoppingDialog open={openThankYouModal} setOpen={setOpenThankYouModal} />
		</WebsiteLayout>
	</>
	)
}

export const CartItem = ({ item }) => {
	const { currency, conversionRate } = useCurrency();
	const [deleteFromCart, { isLoading: isDeleting }] = useDeleteFromCartMutation();
	const [updateQuantity] = useUpdateQuantityMutation(); 
	const { data: cart, isLoading, refetch } = useGetCartItemsQuery();
	const dispatch = useDispatch();
	const [isUpdating, setIsUpdating] = React.useState(false);

  console.log(item)
	const handleDeleteFromCart = async (productId) => {
	  try {
		await deleteFromCart(productId).unwrap();
		toast.success("Product removed from cart!");
	  } catch (error) {
		toast.error(error.data.message);
		console.error(error);
	  }
	};
	const handleQuantityChange = async (itemId, newQuantity) => {
		if (!item || typeof newQuantity !== 'number') return;
		if (!item) {
			console.warn('Cart item not found!');
			return null;
		}

		console.log(item)
		// Update Redux immediately (optional)
		dispatch(
			newQuantity > item.quantity
				? increaseQuantity({ id: itemId })
				: decreaseQuantity({ id: itemId })
		);
	  setIsUpdating(true);
		try {
			await updateQuantity({
				item_id: itemId,
				quantity: newQuantity,
			}).unwrap();
			refetch();
			toast.success('Quantity updated!');
		} catch (err) {
			toast.error('Failed to sync with server.');
			// Optional: rollback redux
		}finally{
			setIsUpdating(false);
		}
	};
	
	return (
	  <div
		className={`grid md:grid-cols-4 grid-cols-2 md:p-5 rounded md:shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] ${
		  isDeleting ? "opacity-50" : ""
		}`}
	  >
		<div className="md:col-span-2 flex md:items-center gap-4">
		  <img
			alt={item.product.name}
			className="w-28 rounded h-28 object-cover object-top"
			src={item.product.first_image.image}
		  />
  
		  <div className="flex flex-col gap-2 md:gap-4">
			<p>{item.product.name}</p>
  
			<div className="flex flex-col md:flex-row md:items-center gap-4">
			  {item.color && (
				<div className="flex flex-col gap-1">
				  <p className="text-xs font-medium text-[#515655]">Color</p>
				  <div className="flex items-center gap-2">
					<span
					  style={{ backgroundColor: item.color }}
					  className="size-6 rounded-full outline outline-offset-2 outline-rebel-ruby-100"
					/>
				  </div>
				</div>
			  )}
  
			  {item.size && (
				<>
				  <p className="hidden md:block">|</p>
				  <div className="flex flex-col gap-1">
					<p className="text-xs font-medium text-[#515655]">Size</p>
					<div className="flex items-center gap-2">
					  <button
						type="button"
						className="h-8 w-9 grid place-items-center border rounded bg-rebel-ruby-100 text-white border-rebel-ruby-100"
					  >
						<p>{item.size}</p>
					  </button>
					</div>
				  </div>
				</>
			  )}
			</div>
		  </div>
		</div>
  
		<p className="font-medium text-right md:text-center lg:text-left text-lg">
		  {formatMoney(item.product.price * item.quantity, currency, conversionRate)}
		</p>
  
		<div className="flex flex-row pt-4 md:pt-0 items-center justify-between md:flex-col gap-10 ml-auto">
		  <div className="flex items-center gap-1">
			<button
			  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
			  className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
			  type="button"
			>
				{isUpdating	? <div className='flex col-span-2 items-center gap-2'>
								<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
								
							</div>
							:
							<PiMinus />
						}
			</button>
			<div className="h-9 w-11 border border-crystal-clear-300 rounded grid place-items-center">
			  <p>{item.quantity}</p>
			</div>
			<button
			   onClick={() => handleQuantityChange(item.id, item?.quantity + 1)} 
			  type="button"
			  className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
			>
				{isUpdating	? <div className='flex col-span-2 items-center gap-2'>
								<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
							</div>
							:	
			  <PiPlus />
							}
			</button>
		  </div>
		  <button
			disabled={isDeleting}
			onClick={() => {
			  handleDeleteFromCart(item.id);
			  dispatch(removeFromCart({ id: item.product.id }));
			}}
			type="button"
			className="text-xs text-right text-[#515655] underline disabled:cursor-not-allowed"
		  >
			{isDeleting ? "Removing..." : "Remove"}
		  </button>
		</div>
	  </div>
	);
  };