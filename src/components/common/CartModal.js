import { toast } from "react-hot-toast";
import { PiMinus, PiPlus } from "react-icons/pi";
import { RiLoader4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { Cart } from "../../assets/icons/Cart";
import { Coupon } from "../../assets/icons/Coupon";
import { Note } from "../../assets/icons/Note";
import { Shipping } from "../../assets/icons/Shipping";
import { useAddToCartMutation } from "../../services/api";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/features/cart/saveToCart";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import Button from "./Button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./Sheet";

export const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currency, conversionRate } = useCurrency();

  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const proceedToCheckout = async () => {
    if (!token) {
      toast("You must be logged in to checkout!");
      navigate("/login");
      return;
    }
    try {
      const payload = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        size: item?.size.name,
        color: item?.color.name,
      }));
      await addToCart(payload).unwrap();
      toast.success("Items successfully added to cart.");
      dispatch(clearCart());
      navigate("/checkout");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2">
        <Cart className="text-lg" />
        <p className="hidden md:block">Cart</p>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-abril font-normal">My Cart</h2>
          <p className="text-xs px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 w-fit">
            {cart.length}
          </p>
        </div>

        {cart.length > 0 ? (
          <>
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    alt=""
                    className="w-32 rounded-md max-h-28 object-cover object-top"
                    src={item.images[0]}
                  />

                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs">
                        Size:{" "}
                        <span className="font-semibold">{item.size.name}</span>
                      </p>
                      <p className="text-xs flex items-center gap-1">
                        Color:{" "}
                        <span
                          style={{ backgroundColor: item.color.name }}
                          className="size-4 inline-block rounded-full"
                        />
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: item.id }))
                        }
                        className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                        type="button"
                      >
                        <PiMinus />
                      </button>
                      <div className="h-9 w-11 border border-crystal-clear-300 rounded grid place-items-center">
                        <p>{item.quantity}</p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantity({ id: item.id }))
                        }
                        type="button"
                        className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                      >
                        <PiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 justify-between">
                    <p className="text-xl font-semibold">
                      {formatMoney(
                        item.price * item.quantity,
                        currency,
                        conversionRate
                      )}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                      type="button"
                      className="text-xs text-[#515655] underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-y border-crystal-clear-300 flex items-center gap-12 py-6">
              <div className="flex items-center gap-2">
                <Note />
                <p className="text-sm text-crystal-clear-400">Order Note</p>
              </div>
              <div className="flex items-center gap-2">
                <Coupon />
                <p className="text-sm text-crystal-clear-400">Coupon</p>
              </div>
              <div className="flex items-center gap-2">
                <Shipping />
                <p className="text-sm text-crystal-clear-400">Shipping</p>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between">
              <div>
                <p className="font-medium">Subtotal</p>
                <p className="text-xs text-neutral-500">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <p className="text-xl font-semibold">
                {formatMoney(total, currency, conversionRate)}
              </p>
            </div>

            <Button
              disabled={isLoading}
              onClick={proceedToCheckout}
              className="mx-auto"
            >
              {isLoading ? (
                <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="text-xl" />
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mx-auto mt-4">
            <p>There are no product in your cart </p>
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
