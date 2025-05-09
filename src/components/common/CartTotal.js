import { RiLoader4Line } from 'react-icons/ri'
import { ArrowRight } from '../../assets/icons/ArrowRight'
import { useGetCartItemsQuery } from '../../services/api'
import { useCurrency } from '../../utils/CurrencyProvider'
import { formatMoney } from '../../utils/nairaFormat'
import Button from './Button'

export const CartTotal = ({ btnText, isPending }) => {
	const { currency, conversionRate } = useCurrency()
	const { data: cart, isLoading } = useGetCartItemsQuery()

	const total = cart?.reduce((acc, item) => acc + parseInt(item.total_price), 0)

	return (
		<div className='flex flex-col h-fit gap-8 border border-crystal-clear-400 rounded md:px-6 py-6 px-4 bg-neutral-50'>
			<h3 className='font-abril text-xl font-normal'>Cart Total</h3>

			{isLoading ? (
				<div className='flex items-center gap-2 justify-center'>
					<RiLoader4Line className='animate-spin text-lg text-rebel-ruby-100' />
					<p className='font-medium'>Loading...</p>
				</div>
			) : (
				<>
					<ul className='flex flex-col gap-4'>
						<li className='flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4'>
							<p className='font-medium'>SubTotal</p>
							<p className='font-semibold'>
								{formatMoney(total, currency, conversionRate)}
							</p>
						</li>
						<li className='flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4'>
							<p className='font-medium'>Shipping</p>
							<p className='font-semibold'>---</p>
						</li>
						<li className='flex items-center justify-between gap-2'>
							<p className='font-medium'>Total</p>
							<p className='font-semibold text-lg'>
								{formatMoney(total, currency, conversionRate)}
							</p>
						</li>
					</ul>

					<Button
						form='form'
						disabled={isPending || cart.length <= 0}
						type='submit'
						className='mt-5 mx-auto'>
						{isPending ? (
							<RiLoader4Line className='animate-spin text-2xl text-rebel-ruby-100' />
						) : (
							<>
								<span>{btnText}</span>
								<ArrowRight className='text-xl' />
							</>
						)}
					</Button>
				</>
			)}
		</div>
	)
}
