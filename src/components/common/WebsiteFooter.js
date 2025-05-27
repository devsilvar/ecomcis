import { useForm } from "react-hook-form"
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi"
import { RiLoader4Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import { ArrowRight } from "../../assets/icons/ArrowRight"
import { useSubscribeMutation } from "../../hook/useSubscribeMutation"
import Button from "./Button"
import { TextInput } from "./TextInput"
import { Wrapper } from "./Wrapper"

export const WebsiteFooter = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { onSubscribe: subscribe, isLoading } = useSubscribeMutation();
  const onSubscribe = async (data) => {
    try {
      await subscribe(data.email);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
		<footer className='bg-crystal-clear-200 py-10 border-t border-t-crystal-clear-300'>
			<Wrapper className='flex flex-col gap-16'>
				<div className='grid lg:grid-cols-2 gap-6 md:gap-10'>
					<div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
						{/* <div>
              <p className="font-semibold">Shop</p>
            </div> */}

						<div className='flex flex-col gap-4'>
							<p className='font-semibold'>Help</p>

							<ul className='text-sm flex flex-col'>
								<li className='py-2'>
									<Link
										// reloadDocument
										to='/contact-us'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										Contact Us
									</Link>
								</li>
								<li className='py-2'>
									<Link
										to='/legal-privacy'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										Legal & Privacy
									</Link>
								</li>
								<li className='py-2'>
									<Link
										// reloadDocument
										to='/faqs'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										FAQs
									</Link>
								</li>
								<li className='py-2'>
									<Link
										to='/report-a-scam'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										Report a Scam
									</Link>
								</li>
							</ul>
						</div>

						<div className='flex flex-col gap-4'>
							<p className='font-semibold'>My Account</p>

							<ul className='text-sm flex flex-col gap-3'>
								<li>
									<Link
										to='/login'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										Sign In
									</Link>
								</li>
								<li>
									<Link
										to='/cart'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										View Cart
									</Link>
								</li>
								{/* <li>
                  <Link
                    to="/gift-cart"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Gift Cart
                  </Link>
                </li> */}
								<li>
									<Link
										to='/return-policy'
										className='hover:text-rebel-ruby-100 hover:underline transition-all'>
										Return Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div>
						<p className='font-semibold'>
							Subscribe for Exclusive Sneak Peeks, Style Inspo, and Secret Perks!
						</p>

						<form
							className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4'
							onSubmit={handleSubmit(onSubscribe)}>
							<TextInput
								wrapperClassName='flex-1'
								control={control}
								name='email'
								type='email'
								required
							/>

							<Button className='bg-black' type='submit'>
								{isLoading ? (
									<RiLoader4Line className='animate-spin text-2xl text-white' />
								) : (
									<>
										<span>Subscribe</span>
										<ArrowRight className='text-xl' />
									</>
								)}
							</Button>
						</form>
						<p className='text-sm pt-2 text-midnight-noir-200'>
							By signing up, you agree to our Privacy Policy and Terms of Service.
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-6'>
					<div>
						<p className='text-sm'>Socials</p>

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

					<p className='text-sm text-midnight-noir-200'>
						©{new Date().getFullYear()} AMARAÉ All Rights Reserved
					</p>
				</div>
			</Wrapper>
		</footer>
  )
};
