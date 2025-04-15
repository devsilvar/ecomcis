import { RiLoader4Line } from "react-icons/ri";
import { CartTotal } from "../components/common/CartTotal";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import {
  useCreateOrderMutation,
  useGetCartItemsQuery,
  useGetShippingAddressQuery,
} from "../services/api";
import { useCurrency } from "../utils/CurrencyProvider";
import { formatMoney } from "../utils/nairaFormat";
import * as React from "react";
import { PaymentOptionsDialog } from "../components/modals/PaymentOptionsDialog";
import { toast } from "react-hot-toast";
import usePageTitle from "../hook/usePageTitle";
import { ThankYouForShoppingDialog } from "../components/modals/ThankYouForShoppingDialog";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Payment = () => {
  usePageTitle("Payment | Amaraé");
  const [order, setOrder] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openThankYouModal, setOpenThankYouModal] = React.useState(false);
  const { data: shippingAddress } = useGetShippingAddressQuery();
  const { currency, conversionRate } = useCurrency();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { data: cart, isLoading } = useGetCartItemsQuery();
  const [createOrder, { isLoading: isPending }] = useCreateOrderMutation();
  const handleCreateOrder = async (e) => {
    e.preventDefault();

    try {
      const resp = await createOrder({
        shipping_address_id: shippingAddress.id,
      }).unwrap();
      // toast.success("Order created successfully!");
      setOrder(resp);
      setOpen(true);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("You must be logged in to checkout!");
    }
  }, [token]);

  return (
    <WebsiteLayout>
      <section className="py-10 md:py-20">
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
            <Link className="hover:underline" to="/cart">
              Cart
            </Link>
            <p>/</p>
            <Link className="hover:underline" to="/checkout">
              Checkout
            </Link>
            <p>/</p>
            <p className="text-rebel-ruby-100">Payment</p>
          </div>

          <form
            id="form"
            onSubmit={handleCreateOrder}
            className="lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10"
          >
            {isLoading ? (
              <div className="flex col-span-2 items-center gap-2">
                <RiLoader4Line className="animate-spin text-lg text-rebel-ruby-100" />
                <p className="font-medium">Loading...</p>
              </div>
            ) : (
              <div className="col-span-2 flex flex-col gap-6">
                <div className="hidden md:grid md:grid-cols-6 p-5 shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] rounded">
                  <p className="col-span-3">Product</p>
                  <p>Unit Price</p>
                  <p className="text-center">Quantity</p>
                  <p className="text-right">Total</p>
                </div>

                {cart?.length &&
                  cart?.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-6 gap-2 md:gap-5 md:p-5 pb-0 md:shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] rounded"
                    >
                      <div className="md:col-span-3 col-span-4 flex items-center gap-2 md:gap-4">
                        <img
                          alt={item.product.name}
                          className="w-28 rounded h-20 object-cover object-top"
                          src={item.product.first_image.image}
                        />

                        <div>
                          <p>{item.product.name}</p>

                          <p className="text-xs">
                            Size:{" "}
                            <span className="font-semibold">{item.size}</span>
                          </p>
                          <p className="text-xs flex items-center gap-1">
                            Color:{" "}
                            <span
                              style={{ backgroundColor: item.color }}
                              className="size-4 inline-block rounded-full"
                            />
                          </p>
                        </div>
                      </div>

                      <p className="font-medium hidden md:block">
                        {formatMoney(
                          item.product.price,
                          currency,
                          conversionRate
                        )}
                      </p>
                      <p className="font-medium text-center">{item.quantity}</p>

                      <p className="flex flex-col gap-10 ml-auto">
                        {formatMoney(
                          item.total_price,
                          currency,
                          conversionRate
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            <CartTotal isPending={isPending} btnText="Pay for Order" />
          </form>
        </Wrapper>
      </section>

      <PaymentOptionsDialog
        open={open}
        setOpen={setOpen}
        order={order}
        setOpenThankYouModal={setOpenThankYouModal}
      />
      <ThankYouForShoppingDialog
        open={openThankYouModal}
        setOpen={setOpenThankYouModal}
      />
    </WebsiteLayout>
  );
};
