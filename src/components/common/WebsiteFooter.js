import { Wrapper } from "./Wrapper";
import { useForm } from "react-hook-form";
import { TextInput } from "./TextInput";
import Button from "./Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export const WebsiteFooter = () => {
  const { control, handleSubmit } = useForm({});

  const onSubscribe = (data) => {
    console.log(data);
  };

  return (
    <footer className="bg-crystal-clear-200 border-t border-t-crystal-clear-300">
      <Wrapper className="py-10 grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="font-semibold">Shop</p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-semibold">Help</p>

              <ul className="text-sm flex flex-col gap-3">
                <li>
                  <Link
                    to="/customer-support"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal-privacy"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Legal & Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report-a-scam"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Report a Scam
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-semibold">My Account</p>

              <ul className="text-sm flex flex-col gap-3">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-cart"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    View Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gift-cart"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Gift Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-settings"
                    className="hover:text-rebel-ruby-100 hover:underline transition-all"
                  >
                    Cookie Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">Socials</p>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.facebook.com"
                  className="size-8 rounded-full text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 grid place-items-center bg-black"
                >
                  <PiTiktokLogoFill />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="size-8 text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 rounded-full grid place-items-center bg-black"
                >
                  <PiInstagramLogoFill />
                </a>
              </div>
            </div>

            <p className="text-sm text-midnight-noir-200">
              ©{new Date().getFullYear()} AMARAÉ All Rights Reserved
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold">
            Subscribe for Exclusive Sneak Peeks, Style Inspo, and Secret Perks!
          </p>

          <form
            className="flex items-center gap-4"
            onSubmit={handleSubmit(onSubscribe)}
          >
            <TextInput
              wrapperClassName="flex-1"
              control={control}
              name="email"
              type="email"
              required
            />

            <Button className="bg-black" type="button">
              <span>Subscribe</span>
              <ArrowRight className="text-xl" />
            </Button>
          </form>
          <p className="text-sm pt-2 text-midnight-noir-200">
            By signing up, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};
