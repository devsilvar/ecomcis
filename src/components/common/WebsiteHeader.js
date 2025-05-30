import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/icons/Logo'
import { User } from '../../assets/icons/User'
import { FlashBanner } from '../home/FlashBanner'
import { LogoutDialog } from '../modals/LogoutModal'
import { MobileMenuSheet } from '../modals/MobileMenuSheet'
import { SearchDialog } from '../modals/SearchDialog'
import { CartModal } from './CartModal'
import { CurrencySelector } from './CurrencySelector'
import { WishlistModal } from './WishlistModal'
import { Wrapper } from './Wrapper'
import { Currency } from 'lucide-react'

export const WebsiteHeader = () => {
	const { user } = useSelector(state => state.auth)
	const [isSticky, setIsSticky] = React.useState(false)
	const [lastScrollY, setLastScrollY] = React.useState(0)

	React.useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			// Always show header at top of page
			if (currentScrollY <= 0) {
				setIsSticky(false)
				return
			}

			// Hide/show logic with threshold to prevent jitter
			if (Math.abs(currentScrollY - lastScrollY) < 50) {
				return
			}

			setIsSticky(true)
			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY])

	return (
		<header className={`bg-white shadow-[0px_0px_35px_0px_rgba(0,0,0,0.15)] transition-all ${
			isSticky ? 'fixed top-0 left-0 z-50 w-full' : 'relative'
		}`}>
			<FlashBanner />

			<nav className='bg-white shadow-[0px_0px_35px_0px_rgba(0,0,0,0.15)] transition-all'
				>
				<Wrapper className='flex items-center  justify-between gap-2'>
					<ul className='flex items-center gap-5 lg:gap-10 text-sm'>
						<li className='md:hidden leading-none'>
							<MobileMenuSheet />
						</li>
						<li className='flex md:items-center gap-2'>
							<SearchDialog />
						</li>

						<li className='hidden md:block'>
							<NavLink
								to='/shop'
								className={({ isActive }) =>
									isActive
										? 'text-rebel-ruby-100 transition-all font-semibold'
										: 'hover:text-rebel-ruby-100'
								}>
								Shop
							</NavLink>
						</li>
						{/* <li className="hidden md:block">
              <NavLink
                to="/new-in"
                className={({ isActive }) =>
                  isActive
                    ? "text-rebel-ruby-100 transition-all font-semibold"
                    : "hover:text-rebel-ruby-100"
                }
              >
                New In
              </NavLink>
            </li> */}
						<li className='hidden md:block'>
							<NavLink
								to='/about'
								className={({ isActive }) =>
									isActive
										? 'text-rebel-ruby-100 transition-all font-semibold'
										: 'hover:text-rebel-ruby-100'
								}>
								About
							</NavLink>
						</li>
					</ul>

					<Link
						to='/'
						className='flex-1 absolute top-1/2 left-1/2 translate-y-[20%] -translate-x-1/2 self-center flex items-center justify-center'>
						<Logo  />
					</Link>

					<ul className='flex items-center gap-5 lg:gap-8 text-sm'>
						<li className='hidden md:block'>
							<CurrencySelector />
						</li>
						<li className='flex items-center gap-2'>
							<WishlistModal />
						</li>
						<li>
							<CartModal />
						</li>
						<li className='hidden md:flex items-center gap-2'>
							{user ? (
								<>
									<Link
										to='/account/profile'
										className='h-8 w-8 flex bg-rebel-ruby-100 text-white font-bold items-center justify-center rounded-full'>
										<User className='text-lg' />
									</Link>

									<LogoutDialog />
								</>
							) : (
								<Link to='/login' className='flex items-center gap-2'>
									<User className='text-lg' />
									{/* <p className="hidden md:block">Log in</p> */}
								</Link>
							)}
						</li>
					</ul>
				</Wrapper>
			</nav>
		</header>
	)
}
