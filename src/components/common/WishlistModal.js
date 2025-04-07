import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { Cart } from "../../assets/icons/Cart";
import { Coupon } from "../../assets/icons/Coupon";
import { Heart } from "../../assets/icons/Heart";
import { Note } from "../../assets/icons/Note";
import { Shipping } from "../../assets/icons/Shipping";
import { removeFromWishlist } from "../../store/features/cart/saveToWishlist";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import Button from "./Button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./Sheet";
import * as React from "react";
import { saveToCart } from "../../store/features/cart/saveToCart";

export const WishlistModal = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currency, conversionRate } = useCurrency();
  const { wishlist } = useSelector((state) => state.wishlist);

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
            {wishlist.length}
          </p>
        </div>

        {wishlist.length ? (
          <ul className="flex flex-col gap-5">
            {wishlist.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  alt=""
                  className="w-32 rounded-md max-h-24 object-cover object-top"
                  src={item.images[0]}
                />

                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xl font-semibold">
                    {formatMoney(item.price, currency, conversionRate)}
                  </p>
                  {item.variations && item.variations.length ? (
                    item.variations[0].colors.length ? (
                      <div className="flex items-center gap-2">
                        {item.variations[0].colors.map((color) => (
                          <button
                            key={color.id}
                            // onClick={() => setSelectedColor(color)}
                            type="button"
                            style={{ background: color.name }}
                            className={`size-4 rounded-full`}
                          />
                        ))}
                      </div>
                    ) : null
                  ) : null}
                </div>

                <div className="flex flex-col gap-6 justify-between">
                  <button
                    onClick={() => {
                      dispatch(
                        saveToCart({
                          ...item,
                          quantity: 1,
                          color: item.variations[0].colors[0],
                          size: item.variations[0].colors[0].sizes[0],
                        })
                      );
                      dispatch(removeFromWishlist({ id: item.id }));
                    }}
                    type="button"
                    className="flex items-center text-sm gap-2 p-3"
                  >
                    <Cart />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromWishlist({ id: item.id }))
                    }
                    type="button"
                    className="text-xs text-[#515655] underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-2 mx-auto mt-4">
            <p>There are no product in your wishlist</p>
            <SheetClose asChild>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-black py-3"
              >
                <span>See Segusted Products</span>
                <ArrowRight className="text-xl" />
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
