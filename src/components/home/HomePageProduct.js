import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cart } from '../../assets/icons/Cart'
import { useCurrency } from '../../utils/CurrencyProvider'
import { formatMoney } from '../../utils/nairaFormat'
import Button from '../common/Button'

export const HomePageProduct = ({ product, index }) => {
	const { currency, conversionRate } = useCurrency()
	const [image, setImage] = useState(product.images[0])
	const navigate = useNavigate()

	const changeImage = () => {
		if (product.images.length > 1) {
			setImage(product.images[1])
		}
	}

	const revertImageBack = () => {
		setImage(product.images[0])
	}

	return (
		<li
			data-aos='fade-up'
			data-aos-delay={index * 100}
			onTouchStart={changeImage}
			onTouchEnd={revertImageBack}
			onPointerEnter={changeImage}
			onPointerLeave={revertImageBack}
			className='rounded-lg overflow-hidden relative'>
			<img
				alt='Juniper Set'
				className='w-full h-[400px] md:h-[550px] object-cover object-top'
				src={image}
			/>

			<Link
				to={`/shop/product/${product.id}`}
				className='absolute bottom-8 left-0 bg-white/50 w-full flex items-center gap-4 justify-between p-4'>
				<div className='flex-1 flex flex-col gap-1'>
					<h3 className='text-sm font-abril font-semibold'>{product.name}</h3>
					<p>{formatMoney(product.price, currency, conversionRate)}</p>
				</div>

				<Button
					onClick={() => navigate(`/shop/product/${product.id}`)}
					className='text-sm py-3 px-4'>
					<span>Shop Now</span>
					<Cart />
				</Button>
			</Link>
		</li>
	)
}
