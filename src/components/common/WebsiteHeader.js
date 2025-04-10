import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { RiMenu2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Heart } from "../../assets/icons/Heart";
import Logo from "../../assets/icons/Logo";
import { Search } from "../../assets/icons/Search";
import { getInitials } from "../../libs/utils";
import { LogoutDialog } from "../modals/LogoutModal";
import { MobileMenuSheet } from "../modals/MobileMenuSheet";
import { SearchDialog } from "../modals/SearchDialog";
import { CartModal } from "./CartModal";
import { CurrencySelector } from "./CurrencySelector";
import { WishlistModal } from "./WishlistModal";
import { Wrapper } from "./Wrapper";

export const WebsiteHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="bg-rebel-ruby-100 text-white">
        <Wrapper className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <a
              href="https://www.tiktok.com/@amarae.io?_t=ZN-8v0LgegdrK2&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <PiTiktokLogoFill />
            </a>
            <a
              href="https://www.instagram.com/amarae_io?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <PiInstagramLogoFill />
            </a>
          </div>
          <p className="flex-1 text-center font-semibold">
            Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop
            now
          </p>
        </Wrapper>
      </div>

      <nav className="bg-white p-1 shadow-[0px_0px_35px_0px_rgba(0,0,0,0.15)]">
        <Wrapper className="flex items-center justify-between gap-2">
          <ul className="flex items-center gap-5 lg:gap-10 text-sm">
            <li className="md:hidden leading-none">
              <MobileMenuSheet />
            </li>
            <li className="flex md:items-center gap-2">
              <SearchDialog />
            </li>

            <li className="hidden md:block">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-rebel-ruby-100 transition-all font-semibold"
                    : "hover:text-rebel-ruby-100"
                }
              >
                Shop
              </NavLink>
            </li>
            <li className="hidden md:block">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-rebel-ruby-100 transition-all font-semibold"
                    : "hover:text-rebel-ruby-100"
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          <Link to="/">
            <Logo />
          </Link>

          <ul className="flex items-center gap-5 lg:gap-10 text-sm">
            <li className="hidden md:block">
              <CurrencySelector />
            </li>
            <li className="flex items-center gap-2">
              <WishlistModal />
            </li>
            <li>
              <CartModal />
            </li>
            {user ? (
              <li className="hidden md:flex items-center gap-2">
                <Link
                  to="/account/profile"
                  className="h-8 w-8 flex bg-rebel-ruby-100 text-white font-bold items-center justify-center rounded-full"
                >
                  <p className="leading-none">{getInitials(user.full_name)}</p>
                </Link>

                <LogoutDialog />
              </li>
            ) : null}
          </ul>
        </Wrapper>
      </nav>
    </header>
  );
};
