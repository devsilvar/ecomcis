import { PiCaretDown } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import * as React from "react";
import { useCurrency } from "../../utils/CurrencyProvider";
import { RiLoaderLine } from "react-icons/ri";
import { acceptedCurrencies } from "../../libs/constants";

const currencies = acceptedCurrencies.map((currency, index) => ({
  id: index + 1,
  label: `${currency.symbol} ${currency.code}`,
  value: currency.code,
}));

export const CurrencySelector = () => {
  const [open, setOpen] = React.useState(false);
  const { currency, changeCurrency, isLoading } = useCurrency();

  const handleCurrencyChange = (value) => {
    changeCurrency(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={isLoading}
        className="flex items-center gap-1.5"
      >
        <PiCaretDown className="text-lg" />
        <span>
          {isLoading ? <RiLoaderLine className="animate-spin" /> : currency}
        </span>
      </PopoverTrigger>

      <PopoverContent className="w-24 p-1.5">
        <div className="flex flex-col gap-1">
          {currencies.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCurrencyChange(item.value)}
              type="button"
              className={`p-2 text-sm rounded w-full ${
                currency === item.value
                  ? "bg-rebel-ruby-100 text-white"
                  : "hover:bg-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
