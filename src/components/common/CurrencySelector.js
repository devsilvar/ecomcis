import { PiCaretDown } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import * as React from "react";
import { useCurrency } from "../../utils/CurrencyProvider";

const currencies = [
  {
    id: 1,
    label: "₦ NGN",
    value: "NGN",
  },
  {
    id: 2,
    label: "$ USD",
    value: "USD",
  },
  {
    id: 3,
    label: "€ EUR",
    value: "EUR",
  },
  {
    id: 4,
    label: "£ GBP",
    value: "GBP",
  },
  {
    id: 5,
    label: "$ CAD",
    value: "CAD",
  },
];

export const CurrencySelector = () => {
  const [open, setOpen] = React.useState(false);
  const { currency, changeCurrency } = useCurrency();

  const handleCurrencyChange = (value) => {
    changeCurrency(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center mt-4 md:mt-0 gap-1.5">
        <PiCaretDown className="text-lg" />
        <span>{currency}</span>
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
