import { PiMinus, PiPlus } from "react-icons/pi";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { Cart } from "../../assets/icons/Cart";
import { Coupon } from "../../assets/icons/Coupon";
import { Heart } from "../../assets/icons/Heart";
import { Note } from "../../assets/icons/Note";
import { Shipping } from "../../assets/icons/Shipping";
import Button from "./Button";
import { Sheet, SheetContent, SheetTrigger } from "./Sheet";

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const WishlistModal = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2">
        <Heart className="text-lg" />
        <p className="hidden md:block">Wishlist</p>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-abril font-normal">My Wishlist</h2>
          <p className="text-xs px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 w-fit">
            1
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              alt=""
              className="w-32 rounded-md max-h-28 object-cover object-top"
              src={url}
            />

            <div className="flex-1 flex flex-col gap-4">
              <p className="font-semibold">Dhyiama premium Dress Set</p>
              <p className="text-xl font-semibold">$98</p>
              <div>
                <p className="text-xs">Size: M</p>
                <p className="text-xs">Color: Red</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 justify-between">
              <button type="button" className="flex items-center gap-2 p-3">
                <Cart />
                <span>Add To Cart</span>
              </button>

              <button type="button" className="text-xs underline">
                Remove
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
