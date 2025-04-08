import { Dialog, DialogContent, DialogTitle } from "../common/Dialog";
import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { TextInput } from "../common/TextInput";
import { useFlutterwave } from "flutterwave-react-v3";
import { useCurrency } from "../../utils/CurrencyProvider";
import usePageTitle from "../../hook/usePageTitle";

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

export const PaymentOptionsDialog = ({ open, setOpen, order }) => {
  console.log("order", order);
  const { currency, conversionRate } = useCurrency();
  const { register, handleSubmit, control, watch } = useForm({
    shouldUnregister: true,
    defaultValues: {
      payment_method: "",
    },
  });

  // const handleFlutterPayment = useFlutterwave({
  //   public_key: flutterWavePublicKey,
  //   tx_ref: order.payment.eference,
  //   amount: handleCurrencyConversion(order.payment.amount, currency),
  //   currency: currency,
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: order.payment?.email,
  //     name: order.payment?.customer,
  //     order_number: order.order_number
  //   },
  //   customizations: {
  //     title: `Pay for Order - ${order.order_number}`,
  //     description: "Payment for items in cart",
  //     logo: "/images/logo.png",
  //   },
  // });

  const selectedMethod = watch("payment_method");
  const onSubmit = (data) => {
    console.log(data);
  };

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
                  className="accent-rebel-ruby-100 size-5 border border-neutral-200"
                  {...register("payment_method")}
                />
                <p>WallX</p>
              </div>

              {selectedMethod === "wallx" && (
                <div className="flex flex-col gap-4 text-sm pt-4">
                  <TextInput
                    control={control}
                    name="paycode"
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
              )}
            </label>
          </div>

          <Button type="submit" className="my-6 mx-auto">
            <span>Make Payment</span>
            <ArrowRight className="text-xl" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
