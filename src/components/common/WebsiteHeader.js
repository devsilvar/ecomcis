import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Heart } from "../../assets/icons/Heart";
import Logo from "../../assets/icons/Logo";
import { Search } from "../../assets/icons/Search";
import { CartModal } from "./CartModal";
import { WishlistModal } from "./WishlistModal";
import { Wrapper } from "./Wrapper";

export const WebsiteHeader = () => {
  return (
    <header>
      <div className="bg-rebel-ruby-100 text-white">
        <Wrapper className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <PiTiktokLogoFill />
            <PiInstagramLogoFill />
          </div>
          <p className="flex-1 text-center font-semibold">
            Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop
            now
          </p>
        </Wrapper>
      </div>

      <nav className="bg-white shadow-[0px_0px_35px_0px_rgba(0,0,0,0.15)]">
        <Wrapper className="flex items-center justify-between gap-2">
          <ul className="flex items-center gap-10 text-sm">
            <li className="flex items-center gap-2">
              <Search className="text-lg" />
              <p>Search</p>
            </li>

            <li>
              <Link
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "text-rebel-ruby-100 underline" : ""
                }
              >
                Shop
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "text-rebel-ruby-100 underline" : ""
                }
              >
                About
              </Link>
            </li>
          </ul>

          <Link to="/">
            <Logo />
          </Link>

          <ul className="flex items-center gap-10 text-sm">
            <li>USD</li>
            <li className="flex items-center gap-2">
              <WishlistModal />
            </li>
            <li>
              <CartModal />
            </li>
          </ul>
        </Wrapper>
      </nav>
    </header>
  );
};
