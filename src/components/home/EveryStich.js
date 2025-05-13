import { RiLoader4Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Image002 from '../../assets/images/image-002.webp'
import Image003 from '../../assets/images/image-003.webp'
import Image005 from '../../assets/images/image-005.webp'
import { useGetProductsQuery } from '../../services/api'
import { useCurrency } from '../../utils/CurrencyProvider'
import { Wrapper } from '../common/Wrapper'
import { HomePageProduct } from './HomePageProduct'

export const EveryStitch = () => {
	const navigate = useNavigate()
	const { currency, conversionRate } = useCurrency()
	const { data: products, isLoading } = useGetProductsQuery()

	return (
		<>
			<section className='bg-[#FEF7F7] py-10'>
				<Wrapper>
					<h2
						data-aos='fade-up'
						className='text-4xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto'>
						Every Stitch, Every Detail, Every Design for you
					</h2>

					<ul className='grid items-center md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pt-10'>
						{isLoading ? (
							<div className='flex items-center col-span-full justify-center lg:justify-start gap-2'>
								<RiLoader4Line className='animate-spin text-3xl text-rebel-ruby-100' />
								<span>Getting products...</span>
							</div>
						) : products?.results.length ? (
							products.results
								.slice(0, 3)
								.map((product, index) => (
									<HomePageProduct index={index} key={index} product={product} />
								))
						) : null}
					</ul>
				</Wrapper>
			</section>

			<section className='grid md:grid-cols-2'>
				<img
					data-aos='zoom-in'
					alt=''
					className='w-full h-full object-cover object-top'
					src={Image003}
				/>
				<img
					data-aos='zoom-in'
					alt=''
					className='w-full h-full object-cover row-start-3 md:row-start-auto object-top'
					src={Image005}
				/>
				<div
					data-aos='zoom-in'
					className='bg-rebel-ruby-100 row-start-2 md:row-start-auto p-10 lg:px-24 flex items-center justify-center'>
					<p className='lg:text-5xl text-3xl text-center lg:text-left leading-snug text-white font-voga'>
						Discover Endless Ways To Remix, Restyle, and Reimagine Your Wardrobe Because
						Your Style is Ever-Evolving, Just Like You.
					</p>
				</div>
				<img
					data-aos='zoom-in-left'
					alt=''
					className='w-full object-cover object-top'
					src={Image002}
				/>
			</section>
		</>
	)
}
