import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Cart } from '../../assets/icons/Cart'
import { Heart } from '../../assets/icons/Heart'
import { HeartFill } from '../../assets/icons/HeartFill'
import { saveToCart , increaseQuantity } from '../../store/features/cart/saveToCart'
import { removeFromWishlist, saveToWishlist } from '../../store/features/cart/saveToWishlist'
import { useCurrency } from '../../utils/CurrencyProvider'
import { formatMoney } from '../../utils/nairaFormat'
import { clearCart as ClearCartLS } from '../../store/features/cart/saveToCart'
import { useAddToCartMutation, useGetCartItemsQuery } from '../../services/api'

export const Product = ({ product, index }) => {
	const dispatch = useDispatch()

	  const { cart:offlineCart } = useSelector((state) => state.cart);
	
	const { currency, conversionRate } = useCurrency()
	const [addToCart] = useAddToCartMutation()
	const { refetch } = useGetCartItemsQuery();
	const { token } = useSelector((state) => state.auth);

	const [image, setImage] = useState(product.images[0])

	const { wishlist } = useSelector(state => state.wishlist)

	const isInWishlist = productId => wishlist.some(item => item.id === productId)

	const changeImage = () => {
		if (product.images.length > 1) {
			setImage(product.images[1])
		}
	}

	const revertImageBack = () => {
		setImage(product.images[0])
	}
	const addToCartHandler = async (e, product) => {
		e.preventDefault()
	
		const payload = {
			product_id: product.id,
			quantity: 1,
			color: product.variations[0].colors[0]?.name,
			size: product.variations[0].colors[0]?.sizes[0]?.name,
		}
	
		if (token) {
			try {
				await addToCart([payload]).unwrap() // backend expects an array
				toast.success("Added to cart")
				refetch() // refresh cart query
			} catch (error) {
				toast.error("Failed to add to cart")
				console.error(error)
			}
		} else {
			dispatch(
				saveToCart({
					...product,
					quantity: 1,
					color: product.variations[0].colors[0],
					size: product.variations[0].colors[0].sizes[0],
				})
			)
		//	toast.success("Added to cart")
		}
	}
	

	useEffect(() => {
		const syncOfflineCart = async () => {
			if (token && offlineCart.length > 0) {
				try {
					const payload = offlineCart.map(item => ({
						product_id: item.id,
						quantity: item.quantity || 1,
						size: item?.size?.name,
						color: item?.color?.name,
					}));
	
					await addToCart(payload).unwrap();
					dispatch(ClearCartLS());
					refetch();
//					toast.success("Offline cart synced");
				} catch (error) {
					console.error(error);
//					toast.error("Failed to sync offline cart.");
				}
			}
		};
	
		syncOfflineCart();
	}, [token, dispatch, offlineCart, addToCart, refetch]);
	
	return (
		<Link
			key={product.id}
			data-aos='fade-up'
			data-aos-delay={index * 100}
			onTouchStart={changeImage}
			onTouchEnd={revertImageBack}
			onPointerEnter={changeImage}
			onPointerLeave={revertImageBack}
			to={`/shop/product/${product.id}`}
			className='flex flex-col cursor-pointer gap-3'>
			<div className='relative overflow-hidden'>
				<img
					alt={product.name}
					className='w-full h-72 md:h-[450px] rounded-md object-cover object-top'
					src={image}
				/>

				<div className='absolute z-50 right-4 h-full top-0 py-4 md:py-6 flex flex-col justify-between'>
					<button
						type='button'
						onClick={e => {
							e.preventDefault()
							if (isInWishlist(product.id)) {
								dispatch(removeFromWishlist({ id: product.id }))
								return
							}

							dispatch(saveToWishlist(product))
						}}
						className={`size-7 grid place-items-center rounded-full ${
							isInWishlist(product.id) ? 'bg-red-100' : 'bg-white'
						}`}>
						{isInWishlist(product.id) ? (
							<HeartFill className='text-error' />
						) : (
							<Heart />
						)}
					</button>

					{/* {product.variations.length > 0 ? (
						<button
							type='button'
							onClick={e => {addToCartHandler(e , product)}}
							className='size-7 bg-white grid place-items-center rounded-full'>
							<Cart />
						</button>
					) : null} */}
				</div>
			</div>

			<div className='flex flex-col gap-1'>
				<p className='font-bold'>{product.name}</p>

				<p>{formatMoney(product.price, currency, conversionRate)}</p>
			</div>
		</Link>
	)
}
