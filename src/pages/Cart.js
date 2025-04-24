import { toast } from "react-hot-toast";
import { RiLoader4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import { CartProduct } from "../components/CartProduct";
import Button from "../components/common/Button";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useAddToCartMutation } from "../services/api";
import React from "react";
import { useCurrency } from "../utils/CurrencyProvider";
import { formatMoney } from "../utils/nairaFormat";
import { useSelector } from "react-redux";

export const Cart = () => {
  const navigate = useNavigate();
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
      navigate("/checkout");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper>
          <div className="text-xs text-[#515655] flex items-center gap-2">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <p>/</p>
            <Link className="hover:underline" to="/shop">
              Shop
            </Link>
            <p>/</p>
            <p className="text-rebel-ruby-100">Cart</p>
          </div>

          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="hidden md:grid md:grid-cols-4 p-5 shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] rounded">
                <p className="col-span-2">Product</p>
                <p className="text-right md:text-center lg:text-left">Price</p>
                <p className="text-right">Quantity</p>
              </div>

              {cart.length ? (
                cart.map((product) => (
                  <CartProduct key={product.id} item={product} />
                ))
              ) : (
                <div className="flex flex-col gap-2 mx-auto mt-4">
                  <p>There are no product in your cart </p>

                  <Button
                    onClick={() => navigate("/shop")}
                    className="bg-black py-3"
                  >
                    <span>See all Products</span>
                    <ArrowRight className="text-xl" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col h-fit gap-8 border border-crystal-clear-400 rounded p-6 bg-neutral-50">
              <h3 className="font-abril text-xl font-normal">Cart Total</h3>

              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4">
                  <p className="font-medium">SubTotal</p>
                  <p className="font-semibold">
                    {formatMoney(total, currency, conversionRate)}
                  </p>
                </li>
                <li className="flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4">
                  <p className="font-medium">Shipping</p>
                  <p className="font-semibold">---</p>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <p className="font-medium">Total</p>
                  <p className="font-semibold text-lg">
                    {formatMoney(total, currency, conversionRate)}
                  </p>
                </li>
              </ul>

              <Button
                onClick={proceedToCheckout}
                disabled={isLoading}
                className="mt-5 mx-auto"
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
            </div>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
