import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/icons/Logo";
import { User } from "../../assets/icons/User";
import { getInitials } from "../../libs/utils";
import { FlashBanner } from "../home/FlashBanner";
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
      <FlashBanner />

      <nav className="bg-white shadow-[0px_0px_35px_0px_rgba(0,0,0,0.15)]">
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

          <ul className="flex items-center gap-5 lg:gap-8 text-sm">
            <li className="hidden md:block">
              <CurrencySelector />
            </li>
            <li className="flex items-center gap-2">
              <WishlistModal />
            </li>
            <li>
              <CartModal />
            </li>
            <li className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link
                    to="/account/profile"
                    className="h-8 w-8 flex bg-rebel-ruby-100 text-white font-bold items-center justify-center rounded-full"
                  >
                    <User className="text-lg" />
                  </Link>

                  <LogoutDialog />
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-2">
                  <User className="text-lg" />
                  <p className="hidden md:block">Log in</p>
                </Link>
              )}
            </li>
          </ul>
        </Wrapper>
      </nav>
    </header>
  );
};
