import { RiMenu2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getInitials } from "../../libs/utils";
import { CurrencySelector } from "../common/CurrencySelector";
import { Sheet, SheetContent, SheetTrigger } from "../common/Sheet";
import { LogoutDialog } from "./LogoutModal";

export const MobileMenuSheet = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Sheet>
      <SheetTrigger type="button" className="text-xl">
        <RiMenu2Fill />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col max-w-60 gap-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
          Mobile Menu{" "}
        </p>

        <div className="flex flex-col gap-1">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-rebel-ruby-100 text-white transition-all font-semibold"
                  : "hover:text-rebel-ruby-100"
              } w-full flex-1 py-2 px-4 rounded-md`
            }
          >
            Shop
          </NavLink>
          {/* <NavLink
            to="/new-in"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-rebel-ruby-100 text-white transition-all font-semibold"
                  : "hover:text-rebel-ruby-100"
              } w-full flex-1 py-2 px-4 rounded-md`
            }
          >
            New In
          </NavLink> */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-rebel-ruby-100 text-white transition-all font-semibold"
                  : "hover:text-rebel-ruby-100"
              } w-full flex-1 py-2 px-4 rounded-md`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-rebel-ruby-100 text-white transition-all font-semibold"
                  : "hover:text-rebel-ruby-100"
              } w-full flex-1 py-2 px-4 rounded-md`
            }
          >
            Contact Us
          </NavLink>

          <CurrencySelector />
        </div>

        {user ? (
          <div className="flex items-center gap-3 mt-auto bg-rebel-ruby-100 p-3 rounded">
            <Link
              to="/account/profile"
              className="size-10 flex bg-white text-rebel-ruby-100 font-bold items-center justify-center rounded-full"
            >
              <p>{getInitials(user.full_name)}</p>
            </Link>

            <div className="text-sm text-white">
              <p className="font-bold leading-none">{user.full_name}</p>
              <LogoutDialog />
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
