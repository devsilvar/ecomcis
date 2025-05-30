import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiLoader4Line } from 'react-icons/ri'
import { ArrowRight } from '../assets/icons/ArrowRight'
import ImageMono from '../assets/images/image-mono.webp'
import Button from '../components/common/Button'
import { Textarea } from '../components/common/Textarea'
import { TextInput } from '../components/common/TextInput'
import { WebsiteLayout } from '../components/common/WebsiteLayout'
import { Wrapper } from '../components/common/Wrapper'
import { FormSuccessDialog } from '../components/modals/FormSuccessDialog'
import usePageTitle from '../hook/usePageTitle'
import { useSendComplaintMutation } from '../services/api'

const About = () => {
	usePageTitle('About | Amaraé')
	const [open, setOpen] = useState(false)
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			full_name: '',
			message: '',
			email: '',
		},
	})

	const [sendComplaints, { isLoading }] = useSendComplaintMutation()
	const onSubmit = async data => {
		try {
			await sendComplaints({
				...data,
				phone_number: 'questions',
			}).unwrap()
			setOpen(true)
			reset()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<WebsiteLayout>
			<section className='py-10 relative'>
				<Wrapper className='flex flex-col re gap-8'>
					<div className='flex flex-col gap-2 text-center max-w-[400px] mx-auto'>
						<h1 data-aos='fade-in' className='text-4xl md:text-5xl'>
							Our Purpose and Promise
						</h1>
						<p data-aos='fade-in' data-aos-delay='200' className='text-sm md:text-base'>
							Empowering women through stylish, accessible fashion that celebrates
							individuality and confidence
						</p>
					</div>
				</Wrapper>
			</section>

			<section className='pb-20'>
				<Wrapper className='lg:grid lg:grid-cols-2 flex flex-col-reverse gap-10'>
					<article
						data-aos='fade-in'
						data-aos-delay='300'
						className='flex md:text-xl w-full flex-col gap-6'>
						<h2 className='text-left text-5xl'>Our Story</h2>

						<p className='leading-relaxed'>
							At <span className='uppercase'>Amaraé</span>, we believe in the power of
							fashion to transform and empower. Our brand is dedicated to providing
							stylish, high-quality clothing that is accessible to women from all
							walks of life. Founded on the principles of inclusivity and empowerment,
							we celebrate individuality and confidence, offering a diverse range of
							designs that empower women to express their unique identities.
						</p>

						<p className='leading-relaxed'>
							Our collections are thoughtfully curated to reflect a diverse range of
							styles and preferences, ensuring that every woman can find something
							that resonates with her unique sense of style. At the heart of{' '}
							<span className='uppercase'>Amaraé</span> is a commitment to our
							customers, prioritizing their needs and experiences in everything we do.
						</p>

						<p className='leading-relaxed'>
							We invite you to explore our collections and join us in celebrating the
							beauty of individuality through fashion
						</p>
					</article>

					<img
						src={ImageMono}
						alt='Our Story'
						className='w-full object-cover object-top h-[700px]'
					/>
				</Wrapper>
			</section>

			<section className='md:py-20 pt-96 bg-subscribe-bg bg-center md:bg-right-top bg-cover bg-neutral-200'>
				<Wrapper className='!pb-0'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col border border-neutral-100 md:w-[70%] lg:w-1/2 gap-10 py-8 px-5 md:px-8 bg-white rounded-md'>
						<div className='flex flex-col gap-2'>
							<p className='text-xl text-rebel-ruby-100 font-bold'>Got Questions?</p>
							<h3 className='text-2xl lg:text-5xl'>Send us an email</h3>
						</div>

						<div className='flex flex-col gap-6'>
							<TextInput
								control={control}
								name='full_name'
								type='text'
								label='Full Name'
								required
							/>
							<TextInput
								control={control}
								name='email'
								type='email'
								label='Email Address'
								required
							/>
							<Textarea
								control={control}
								name='message'
								label='Message'
								rows={5}
								placeholder='Type your message here...'
								required
							/>

							<Button type='submit' disabled={isLoading}>
								{isLoading ? (
									<RiLoader4Line className='animate-spin text-2xl text-rebel-ruby-100' />
								) : (
									<>
										<span>Send Question</span>
										<ArrowRight className='text-xl' />
									</>
								)}
							</Button>
						</div>
					</form>
				</Wrapper>
			</section>

			<FormSuccessDialog
				open={open}
				setOpen={setOpen}
				text='Thank you for reaching out! Your message has been received successfully. Our team will get back to you within 24 - 48 hours.'
			/>
		</WebsiteLayout>
	)
}

export default About
