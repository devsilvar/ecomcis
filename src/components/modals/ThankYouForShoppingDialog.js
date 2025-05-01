import { useForm } from 'react-hook-form'
import { PiInstagramLogoFill, PiTiktokLogoFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import Image001 from '../../assets/images/image-001.webp'
import { Dialog, DialogContent } from '../common/Dialog'

export const ThankYouForShoppingDialog = ({ open, setOpen }) => {
	const { control, handleSubmit } = useForm({})
	const navigate = useNavigate()

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				navigate('/shop')
				setOpen(false)
			}}>
			<DialogContent className='lg:grid lg:grid-cols-2 !p-0 max-w-4xl'>
				<img
					src={Image001}
					alt='Our Story'
					className='w-full object-cover object-top h-60 lg:h-[600px]'
				/>

				<div className='px-4 py-8 flex flex-col gap-4 md:gap-0'>
					<div>
						<h2 className='lg:text-5xl text-3xl w-72'>
							Thank You For Shopping With Us
						</h2>
						<p className='pt-1 text-sm text-neutral-500'>
							We have sent an order confirmation to your mail
						</p>
					</div>

					{/* <form onSubmit={handleSubmit(onSubmit)} className="my-auto">
            <Textarea
              control={control}
              name="message"
              label="Want to add any special note?"
              // rows={3}
              placeholder="Type your message here..."
              required
            />

            <Button disabled type="submit" className="mt-5 bg-black">
              <span>Submit</span>
              <ArrowRight className="text-xl" />
            </Button>
          </form> */}

					<div className='flex flex-col gap-1 mt-auto'>
						<p>Follow AMARAÉ Socials to stay connected</p>

						<div className='flex items-center gap-2 pt-1'>
							<a
								href='https://www.tiktok.com/@amarae.io?_t=ZN-8v0LgegdrK2&_r=1'
								target='_blank'
								rel='noopener noreferrer'
								className='size-8 rounded-full text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 grid place-items-center bg-black'>
								<PiTiktokLogoFill />
							</a>
							<a
								href='https://www.instagram.com/amaraebrand?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr'
								target='_blank'
								rel='noopener noreferrer'
								className='size-8 text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 rounded-full grid place-items-center bg-black'>
								<PiInstagramLogoFill />
							</a>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
