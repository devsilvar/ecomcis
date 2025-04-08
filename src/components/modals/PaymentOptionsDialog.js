import { Dialog, DialogContent, DialogTitle } from "../common/Dialog";
import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { TextInput } from "../common/TextInput";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useCurrency } from "../../utils/CurrencyProvider";
import { RiLoader4Line } from "react-icons/ri";
import { formatMoney } from "../../utils/nairaFormat";
import { usePayWithWallxMutation } from "../../services/api";
import { toast } from "react-hot-toast";

const handleCurrencyConversion = (amount, currency) => {
  let exchangeRate = localStorage.getItem("exchangeRates");
  const ratesFromStorage = exchangeRate ? JSON.parse(exchangeRate) : null;

  if (!ratesFromStorage || !ratesFromStorage[currency]) {
    return amount.toFixed(2); // Return the original amount with 2 decimal places if no rate is found
  }

  let conversionRate = ratesFromStorage[currency] || 1;
  let convertedAmount = amount * conversionRate;

  return convertedAmount.toFixed(2);
};

const flutterWavePublicKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY;
const merchant_id = process.env.REACT_APP_WALLX_MERCHANT_ID;

export const PaymentOptionsDialog = ({
  open,
  setOpen,
  order: item,
  setOpenThankYouModal,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { currency, conversionRate } = useCurrency();
  const { register, handleSubmit, control, watch } = useForm({
    shouldUnregister: true,
    defaultValues: {
      payment_method: "",
      pin: "",
      secret: "",
    },
  });

  const handleFlutterPayment = useFlutterwave({
    public_key: flutterWavePublicKey,
    tx_ref: item?.payment?.reference,
    amount: handleCurrencyConversion(item?.payment?.amount, currency),
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: item?.payment?.email,
      name: item?.payment?.customer,
      order_number: item?.order?.order_number,
    },
    customizations: {
      title: `Pay for Order - ${item?.order?.order_number}`,
      description: "Payment for items in cart",
      logo: "/images/logo.png",
    },
  });

  const selectedMethod = watch("payment_method");
  const [payWithWallx, { isLoading }] = usePayWithWallxMutation();
  const onSubmit = async (data) => {
    setLoading(true);
    if (data.payment_method === "card") {
      handleFlutterPayment({
        callback: (response) => {
          // console.log(response);
          // show success modal
          closePaymentModal();
          setLoading(false);
          setOpenThankYouModal(true);
        },
        onClose: () => {
          setLoading(false);
        },
      });
      return;
    }

    if (data.payment_method === "wallx") {
      try {
        const response = await payWithWallx({
          merchant_id: merchant_id,
          pin: data.pin,
          secret: data.secret,
          amount: handleCurrencyConversion(item?.payment?.amount, currency),
          currency: currency,
        }).unwrap();
        console.log(response);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong, please try again later");
      }
    }
  };

  React.useEffect(() => setLoading(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogTitle className="font-abril">Choose Payment Method</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 pt-4">
            <label className="flex items-center cursor-pointer p-4 has-[:checked]:bg-[#FAE3E3] has-[:checked]:border-[#FAE3E3] border border-crystal-clear-400 rounded-md gap-2">
              <input
                type="radio"
                name="payment_method"
                id="card"
                value="card"
                required
                className="accent-rebel-ruby-100 size-5 border border-neutral-100"
                {...register("payment_method")}
              />
              <p>Credit Card</p>
            </label>

            <label className="cursor-pointer flex flex-col gap-4 p-4 has-[:checked]:bg-[#FAE3E3] has-[:checked]:border-[#FAE3E3] border border-crystal-clear-400 rounded-md">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment_method"
                  id="wallx"
                  value="wallx"
                  required
                  className="accent-rebel-ruby-100 size-5 border border-neutral-200"
                  {...register("payment_method")}
                />
                <p>WallX</p>
              </div>

              {selectedMethod === "wallx" && (
                <>
                  <p className="text-sm">
                    Paying with WallX is an easier way to make payment, please
                    proceed to apply your <strong>PayCode</strong> and{" "}
                    <strong>Secret Word</strong>
                    <br /> <hr /> <br />
                    <strong className="text-[2em]">
                      {formatMoney(
                        item?.payment?.amount,
                        currency,
                        conversionRate
                      )}
                    </strong>
                  </p>

                  <div className="flex flex-col gap-4 text-sm pt-4">
                    <TextInput
                      control={control}
                      name="pin"
                      type="text"
                      label="PayCode"
                      placeholder="Enter your generated payment paycode"
                      required
                    />
                    <TextInput
                      control={control}
                      name="secret"
                      type="text"
                      label="Secret Word"
                      placeholder="Enter your secret word used to generate paycode"
                      required
                    />
                  </div>
                </>
              )}
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading || isLoading}
            className="my-6 mx-auto"
          >
            {loading || isLoading ? (
              <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
            ) : (
              <>
                <span>Make Payment</span>
                <ArrowRight className="text-xl" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
