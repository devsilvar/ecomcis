import * as React from 'react'
import { toast } from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import { PiMinus, PiPlus } from 'react-icons/pi'
import { RiLoader4Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from '../assets/icons/ArrowRight'
import { useSelector } from 'react-redux'
import Button from '../components/common/Button'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import { saveToCart } from '../store/features/cart/saveToCart'
import { ProductDescSheet } from '../components/modals/ProductDescSheet'
import { ZoomDialog } from '../components/modals/ZoomDialog'
import usePageTitle from '../hook/usePageTitle'
import { capitalize } from '../libs/utils'
import { useAddToCartMutation, useGetProductByIdQuery } from '../services/api'
import { useCurrency } from '../utils/CurrencyProvider'
import { formatMoney } from '../utils/nairaFormat'
import './admin/descriptionEditor/editor.css'
import { AlertTriangle, CheckCircle } from 'lucide-react'

function truncateHTML(html, maxLength) {
	let div = document.createElement('div')
	div.innerHTML = html

	let truncated = ''
	let length = 0

	function traverse(node) {
		if (node.nodeType === Node.TEXT_NODE) {
			if (length + node.textContent.length > maxLength) {
				truncated += node.textContent.substring(0, maxLength - length)
				length = maxLength
			} else {
				truncated += node.textContent
				length += node.textContent.length
			}
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			truncated += `<${node.nodeName.toLowerCase()}`
			for (let attr of node.attributes) {
				truncated += ` ${attr.name}="${attr.value}"`
			}
			truncated += '>'

			for (let child of node.childNodes) {
				if (length >= maxLength) break
				traverse(child)
			}

			truncated += `</${node.nodeName.toLowerCase()}>`
		}
	}

	traverse(div)

	return `${truncated}...`
}

export const ProductDetails = () => {
	const { id } = useParams()
  const { token } = useSelector((state) => state.auth);
	const { currency, conversionRate } = useCurrency()
	const { data: product, isLoading, isError } = useGetProductByIdQuery(id)
	const [isZoomed, setIsZoomed] = React.useState(false)

	usePageTitle(`${capitalize(product?.name) ?? 'Payment Details'} | Amaraé`)
	const dispatch = useDispatch()
	const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()

	const [imageIndex, setImageIndex] = React.useState(0)
	const [quantity, setQuantity] = React.useState(1)
	const [selectedColor, setSelectedColor] = React.useState(null)
	const [selectedSize, setSelectedSize] = React.useState(null)

	React.useEffect(() => {
		if (product?.variations?.length > 0 && product.variations[0]?.colors?.length > 0) {
		  setSelectedColor(product.variations[0].colors[0]);
		}
	  }, [product]);
	  

	function findVariationByImage(product, imageUrl) {
		if (!product || !product.variations || !Array.isArray(product.variations)) {
		  return null;
		}
		//   setSelectedSize()
		
		const results = product.variations.find(variation => variation.image === imageUrl) || null;
		if (results?.colors?.[0]) {
			setSelectedColor(results.colors[0])
			if (results.colors[0].sizes?.[0]) {
				//setSelectedSize(results.colors[0].sizes[0])
//				setQuantity(results.colors[0].sizes[0].quantity)
			}
		}
		
		
	    console.log(results)
		return results
	}
	  


	const addProductToCart = async () => {
		if (!selectedColor?.name || !selectedSize?.name) {
			toast.error('Please select both a color and a size')
			return
		}

if(token){
		const payload = [
			{
				product_id: product.id, // use snake_case if your backend uses this
				quantity: quantity,
				color: selectedColor.name,
				size: selectedSize.name,
			},
		]

		try {
			await addToCart(payload).unwrap()
			toast.success('Product added to cart')
		} catch (error) {
			if (error?.status === 401) {
				toast.error('Please login to add items to your cart')
				return
			}

			const message = error?.data?.message ?? error?.data?.detail
			toast.error(message || 'Failed to add to cart. Please try again.')
		}

  }else{
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color or size");
      return;
    }

    dispatch(
      saveToCart({
        ...product,
        quantity:quantity,
        color: selectedColor,
        size: selectedSize,
      })
    );
  }
	}
	console.log(product, "product")

	return (
		<WebsiteLayout>
			<section className='py-10'>
				<Wrapper className='flex flex-col gap-10'>
					<div className='text-xs text-[#515655] flex items-center gap-2'>
						<Link className='hover:underline' to='/'>
							Home
						</Link>
						<p>/</p>
						<Link className='hover:underline' to='/shop'>
							Shop
						</Link>
						<p>/</p>
						{isLoading ? (
							<RiLoader4Line className='animate-spin text-base text-rebel-ruby-100' />
						) : (
							<span className='text-rebel-ruby-100'>
								{product ? capitalize(product?.name) : ''}
							</span>
						)}
					</div>

					{isLoading ? (
						<div className='flex justify-center w-full items-center gap-2'>
							<RiLoader4Line className='animate-spin text-3xl text-rebel-ruby-100' />
							<span>Loading...</span>
						</div>
					) : isError ? (
						<div className='flex flex-col w-80 mx-auto text-center items-center col-span-full justify-center lg:justify-start gap-2'>
							<h2 className='text-xl font-abril'>Error Getting product</h2>
							<p className='text-sm'>
								We are encountering an issue fetching this product or it does not
								exists. Refresh this page to try again.
							</p>
						</div>
					) : (
						<div className='grid lg:grid-cols-7'>
							<div
								data-aos='fade-in'
								className='col-span-4 lg:sticky lg:top-0 lg:self-start flex flex-col gap-4'>
								<img
									alt={product.name}
									onClick={() => setIsZoomed(true)}
									className='w-full h-full cursor-zoom-in rounded-lg object-cover object-top'
									src={product.images[imageIndex]}
									fetchPriority='high'
								/>

								<div className='grid grid-cols-4 gap-1.5 md:gap-2.5'>
									{product.images.length
										? product.images.map(url => (
												<button
													key={url}
													onClick={() =>{
														setImageIndex(product.images.indexOf(url))

														
													}}
													type='button'
													className={`hover:opacity-70  transition-opacity ${
														imageIndex === product.images.indexOf(url)
															? 'opacity-70'
															: ''
													}`}>
													<img
														alt={product.name}
														className='w-full max-h-48 rounded-md object-cover object-center'
														src={url}
													/>
												</button>
										  ))
										: null}
								</div>
							</div>

							<div
								data-aos='fade-in'
								data-aos-delay='200'
								className='col-span-3 flex flex-col gap-6 lg:px-10 py-6'>
								<div className='flex flex-col gap-2'>
									<h2 className='text-4xl font-abril font-normal'>
										{capitalize(product?.name)}
									</h2>
									<p className='font-bold text-2xl'>
										{formatMoney(product.price, currency, conversionRate)}
									</p>
								</div>

								<div className='py-3 flex flex-col gap-6 items-start border-b border-b-neutral-300 pt-2'>
									<p className='leading-relaxed'>
										<div
											className='editor-content'
											dangerouslySetInnerHTML={{
												__html: truncateHTML(product.desc, 250),
											}}
										/>
									</p>


									<ProductDescSheet desc={product.detail} />
								</div>
							
								{product.variations?.length > 0 ? (
	<>
		<div className='flex flex-col gap-2'>
			<p className='text-sm font-medium text-[#515655]'>Colors</p>

			<div className='flex items-center gap-4'>
				{[
					...new Map(
						product.variations
							.flatMap(variation => variation.colors || [])
							.map(color => [color.id, color]) // Remove duplicates by ID
					).values()
				].map(color => (
					<button
						key={color.id}
						onClick={() => setSelectedColor(color)}
						type='button'
						style={{ background: color.name }}
						className={`size-6 rounded-full ${
							selectedColor?.name === color.name
								? 'outline outline-offset-2 outline-rebel-ruby-100'
								: ''
						}`}
					/>
				))}
			</div>
		</div>

		{selectedColor && selectedColor.sizes && selectedColor.sizes.length ? (
			<div className='flex flex-col gap-2'>
				<p>Sizing</p>

				<div className='flex items-center gap-4'>
					{selectedColor.sizes.map(size => (
						<button
							key={size.id}
							onClick={() => setSelectedSize(size)}
							type='button'
							className={`h-12 w-14 grid place-items-center border rounded-md transition-all ${
								size.id === selectedSize?.id
									? 'bg-rebel-ruby-100 text-white border-rebel-ruby-100'
									: 'hover:bg-neutral-100 border-[#C2C1BE]'
							}`}>
							<p>{size.name}</p>
						</button>
					))}
				</div>
			</div>
		) : null}
	</>
) : null}

<div>
	
	<ProductAvailability availableQuantity={selectedColor?.sizes[0].quantity || 0 } />
</div>
								<div className='flex flex-col gap-2'>
									<p>Quantity</p>

									<div className='flex items-center gap-1'>
										<button
											onClick={() => {
												if (quantity <= 1) return
												setQuantity(quantity - 1)
											}}
											className='h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center'
											type='button'>
											<PiMinus />
										</button>
										<div className='h-12 w-14 border border-crystal-clear-300 rounded grid place-items-center'>
											<p>{quantity}</p>
										</div>
										<button
											onClick={() => {
												if (!selectedSize) {
													toast('Please select a size')
													return
												}

												if (quantity === selectedSize.quantity) {
													toast('Maximum quantity reached')
													return
												}

												setQuantity(quantity + 1)
											}}
											type='button'
											className='h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center'>
											<PiPlus />
										</button>
									</div>
								</div>
								<div className='mx-auto flex flex-col items-center pt-10 gap-4'>
									<Button disable={selectedColor?.sizes[0].quantity==0} type='button' onClick={addProductToCart}>
										{isAdding ? <FaSpinner /> : <span>{selectedColor?.sizes[0].quantity== 0 ? "Out of Stock" : "Add to Cart"} </span>}
										<ArrowRight className='text-xl' />
									</Button>

									<Link to='/cart' className='underline text-sm'>
										View Cart
									</Link>
								</div>
							</div>
						</div>
					)}
				</Wrapper>
			</section>

			{product ? (
				<ZoomDialog
					src={product.images[imageIndex]}
					open={isZoomed}
					setOpen={setIsZoomed}
					alt=''
				/>
			) : null}
		</WebsiteLayout>
	)
}


// function QuantityProgress ({ quantityLeft, totalQuantity }){
// 	const percentage = (quantityLeft / totalQuantity) * 100;
// 	const getColor = (percent) => {
// 	  if (percent > 50) return 'bg-rebel-ruby-100';
// 	  if (percent > 20) return 'bg-rebel-ruby-100';
// 	  return 'bg-rebel-ruby-100';
// 	};
  
// 	return (
// 	  <div className='flex flex-col gap-1'>
// 		<div className='text-sm text-gray-600'>
// 		  Quantity remaining: <span className='font-medium'>{totalQuantity - quantityLeft}</span> of {totalQuantity}
// 		</div>
// 		<div className='w-full bg-gray-200 rounded-full h-3'>
// 		  <div
// 			className={`h-full rounded-full transition-all duration-300 ${getColor(percentage)}`}
// 			style={{ width: `${percentage}%` }}
// 		  ></div>
// 		</div>
// 	  </div>
// 	);
//   };


// Make sure lucide-react is installed


const ProductAvailability = ({ availableQuantity }) => {
  return (
    <div className="mt-4">
      {availableQuantity === 0 ? (
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-sm w-fit text-sm font-medium">
          <AlertTriangle size={16} className="text-red-600" />
          Out of Stock
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-sm w-fit text-sm font-medium">
          <CheckCircle size={16} className="text-green-600" />
          In Stock
        </div>
      )}
    </div>
  );
};
