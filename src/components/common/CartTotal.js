import { RiLoader4Line } from "react-icons/ri";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { useGetCartItemsQuery } from "../../services/api";
import { useCurrency } from "../../utils/CurrencyProvider";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils/nairaFormat";
import Button from "./Button";

export const CartTotal = ({ btnText, isPending }) => {
  const { currency, conversionRate } = useCurrency();
  const { data:cart, isLoading } = useGetCartItemsQuery();
  const { cart:newCart } = useSelector((state) => state.cart);
  const total = cart?.reduce(
    (acc, item) => acc + parseInt(item.total_price),
    0
  );
  const newTotal = newCart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const previousCartTotal = (total - newTotal ) || 0;
 return (
    <div className="flex flex-col h-fit gap-8 border border-crystal-clear-400 rounded md:px-6 py-6 px-4 bg-neutral-50">
      <h3 className="font-abril text-xl font-normal">Cart Totals</h3>

      {isLoading ? (
        <div className="flex items-center gap-2 justify-center">
          <RiLoader4Line className="animate-spin text-lg text-rebel-ruby-100" />
          <p className="font-medium">Loading...</p>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4">
              <p className="font-medium">Current Cart Total</p>
              <p className="font-semibold">
                  {total != 0 ?  formatMoney(newTotal, currency, conversionRate) : formatMoney(total, currency, conversionRate)}
              </p>
            </li>
            
            {(total != 0 && previousCartTotal != 0) && <li className="flex items-center justify-between gap-2 border-b border-b-neutral-200 pb-4">
              <p className="font-medium">Previous Cart Total</p>
              <p className="font-semibold">
                {previousCartTotal > 0 ?  formatMoney(previousCartTotal, currency, conversionRate) : '---'}
              </p>
             
            </li>}

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
            form="form"
            disabled={isPending || cart.length <= 0}
            type="submit"
            className="mt-5 mx-auto"
          >
            {isPending ? (
              <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
            ) : (
              <>
                <span>{btnText}</span>
                <ArrowRight className="text-xl" />
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};
