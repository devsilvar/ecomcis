import { RiMenu2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { User } from "../../assets/icons/User";
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
        <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
          Mobile Menu{" "}
        </p>

        <div className="flex flex-col gap-8">
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
          </div>
          {user ? (
            <div className="flex items-center gap-3 px-2 py-2.5 mt-auto bg-neutral-200">
              <Link
                to="/account/profile"
                className="size-9 flex bg-white text-rebel-ruby-100 font-bold items-center justify-center rounded-full"
              >
                <User className="text-lg" />
              </Link>

              <div className="text-sm text-black">
                <p className="font-bold leading-none">{user.full_name}</p>
                <LogoutDialog />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 border-t pt-4 border-t-neutral-200">
              <Link
                to="/login"
                className="flex mt-auto py-2 px-4 items-center gap-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex mt-auto py-2 px-4 items-center gap-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="mt-auto border-t pt-4 flex flex-col gap-1 border-t-neutral-200">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
            Currency Selector
          </p>
          <CurrencySelector />
        </div>
      </SheetContent>
    </Sheet>
  );
};
