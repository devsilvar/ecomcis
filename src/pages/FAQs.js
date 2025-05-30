import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../components/common/Accordion'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import usePageTitle from '../hook/usePageTitle'
import ScrollToTop from '../components/ScrollToTop'

const questions = [
	{
		question: 'What payment methods do you accept?',
		answer: 'We accept all major credit cards (Visa, MasterCard, Verve, Discover, American Express (AMEX)) and Wallx.',
	},
	{
		question: 'How can I track my order?',
		answer: 'Once your order is shipped, you will receive an email with a tracking number and a link to track your package.',
	},
	{
		question: 'Do you ship internationally?',
		answer: 'Yes, we offer international shipping. Shipping costs and delivery times will vary depending on your location.',
	},
	{
		question: 'How long will it take to receive my order?',
		answer: 'Orders are typically processed within 1-3 business days. Delivery times vary based on your location and the shipping method selected at checkout.',
	},
	{
		question: 'Can I change or cancel my order after it has been placed?',
		answer: 'Orders can be changed or canceled within 24 hours of placing the order. Please contact our customer service team as soon as possible.',
	},
	{
		question: 'What should I do if I receive a damaged or incorrect item?',
		answer: 'If you receive a damaged or incorrect item, please contact our customer service team within 7 days of receiving your order. We will arrange for a replacement or refund.',
	},
	{
		question: 'How do I care for my clothing?',
		answer: 'Each item comes with specific care instructions on the label. Generally, we recommend washing your clothing in cold water and laying it flat to dry.',
	},
	// {
	//   question: "Do you offer gift cards?",
	//   answer:
	//     "Yes, we offer gift cards in various amounts. You can purchase them on our website.",
	// },
	{
		question: 'How can I contact customer service?',
		answer: `You can contact our customer service team via email at support@amarae.io`,
	},
	{
		question: 'Do you have physical stores?',
		answer: 'Currently, we operate exclusively online. Subscribe to our newsletter for updates on potential pop-up shops and events.',
	},
]

function FAQs() {
	const location = useLocation()
	usePageTitle('FAQs | Amaraé')

	useEffect(() => {
		window && window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [location])

	return (
		<WebsiteLayout>
			<ScrollToTop/>
			<section className='py-10'>
				<Wrapper>
					<h1 className='text-xl font-abril font-bold'>FAQs</h1>

					<Accordion className='grid grid-cols-1 lg:grid-cols-2 pt-6 gap-6'>
						{questions.map(item => (
							<AccordionItem
								value={item}
								className='border border-neutral-200 p-4 rounded-md data-[state=open]:bg-neutral-100'>
								<AccordionTrigger>{item.question}</AccordionTrigger>
								<AccordionContent className='pt-3 text-sm leading-relaxed text-[#515655]'>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
					{/* </div> */}
				</Wrapper>
			</section>
		</WebsiteLayout>
	)
}

export default FAQs
