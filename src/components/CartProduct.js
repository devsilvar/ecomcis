import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setSelectedSize,
  setSelectedColor,
} from "../store/features/cart/saveToCart";
import { useCurrency } from "../utils/CurrencyProvider";
import { formatMoney } from "../utils/nairaFormat";
import * as React from "react";

export const CartProduct = ({ item }) => {
  const dispatch = useDispatch();
  const { currency, conversionRate } = useCurrency();

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 md:p-5 rounded md:shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)]">
      <div className="md:col-span-2 flex md:items-center gap-4">
        <img
          alt=""
          className="w-28 rounded h-28 object-cover object-top"
          src={item.images[0]}
        />

        <div className="flex flex-col gap-2 md:gap-4">
          <p>{item.name}</p>

          {item.variations.length ? (
            item.variations[0].colors.length ? (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-[#515655]">Colors</p>
                  <div className="flex items-center gap-2">
                    {item.variations[0].colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => {
                          dispatch(setSelectedColor({ id: item.id, color }));
                          dispatch(
                            setSelectedSize({
                              id: item.id,
                              size: color.sizes[0],
                            })
                          );
                        }}
                        type="button"
                        style={{ background: color.name }}
                        className={`size-6 rounded-full ${
                          item.color?.name === color.name
                            ? "outline outline-offset-2 outline-rebel-ruby-100"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="hidden md:block">|</p>

                {item.color && item.color.sizes.length ? (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-[#515655]">Sizes</p>
                    <div className="flex items-center gap-2">
                      {item.color.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() =>
                            dispatch(setSelectedSize({ id: item.id, size }))
                          }
                          type="button"
                          className={`h-8 w-9 grid place-items-center border rounded transition-all ${
                            size.id === item.size?.id
                              ? "bg-rebel-ruby-100 text-white border-rebel-ruby-100"
                              : "hover:bg-neutral-100 border-[#C2C1BE]"
                          }`}
                        >
                          <p>{size.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null
          ) : null}
        </div>
      </div>

      <p className="font-medium text-right md:text-center lg:text-left text-lg">
        {formatMoney(item.price * item.quantity, currency, conversionRate)}
      </p>

      <div className="flex flex-row pt-4 md:pt-0 items-center justify-between md:flex-col gap-10 ml-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
            className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
            type="button"
          >
            <PiMinus />
          </button>
          <div className="h-9 w-11 border border-crystal-clear-300 rounded grid place-items-center">
            <p>{item.quantity}</p>
          </div>
          <button
            onClick={() => dispatch(increaseQuantity({ id: item.id }))}
            type="button"
            className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
          >
            <PiPlus />
          </button>
        </div>

        <button
          onClick={() => dispatch(removeFromCart({ id: item.id }))}
          type="button"
          className="text-xs text-right text-[#515655] underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
