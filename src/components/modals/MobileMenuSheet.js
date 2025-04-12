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
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
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

            {/* <CurrencySelector /> */}
          </div>
          {user ? (
            <div className="flex items-center gap-3 py-2 px-4 mt-auto bg-rebel-ruby-100 rounded">
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
      </SheetContent>
    </Sheet>
  );
};
