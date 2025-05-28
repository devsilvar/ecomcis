import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import ScrollToTop from '../components/ScrollToTop'
import usePageTitle from '../hook/usePageTitle'

function Contact() {
	usePageTitle('Contact | Amaraé')

	return (
		<WebsiteLayout>
			<ScrollToTop/>
			<section className='py-10'>
				<Wrapper className='flex flex-col lg:gap-10'>
					<h1 className='text-xl font-abril font-bold'>Contact Us</h1>

					<div className='lg:grid lg:grid-cols-[1fr,20px,1fr] gap-4 flex flex-col mt-4 md:mt-0 bg-rebel-ruby-100 p-8 rounded'>
						<div className='flex flex-col gap-4 pb-8'>
							{/* <div className='flex items-center gap-4'>
								<div className='size-10 rounded-full bg-white grid place-items-center'>
									<PiMailbox className='text-2xl text-rebel-ruby-100' />
								</div>
								<p className='text-lg text-white font-semibold'>Email Us</p>
							</div> */}

							<div className='flex flex-col gap-4 text-lg text-white'>
								{/* <p>We are available 24/7, 7 days a week.</p> */}

								<p>
									Email us at{' '}
									<a href='mailto:support@amarae.io' className='underline'>
										support@amarae.io
									</a>{' '}
									for Complaints, Updates on Delivery, Order Tracking and Returns
								</p>
							</div>
						</div>

						<div className='lg:h-full h-px w-full lg:w-px bg-white' />

						<div className='flex flex-col gap-4 pb-8'>
							<div className='flex flex-col gap-4 text-lg text-white'>
								{/* <p>We are available 24/7, 7 days a week.</p> */}

								<p>
									Email us at{' '}
									<a href='mailto:info@amarae.io' className='underline'>
										info@amarae.io
									</a>{' '}
									for Partnerships, Collaborations, Licensing, Press and Media
									Inquiries, Sponsorship Opportunities and Business Development.
								</p>
							</div>
						</div>
					</div>
				</Wrapper>
			</section>
		</WebsiteLayout>
	)
}

export default Contact
