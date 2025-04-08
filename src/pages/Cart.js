import { useForm } from "react-hook-form";
import { PiMinus, PiPlus } from "react-icons/pi";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { CartTotal } from "../components/common/CartTotal";
import { Select, SelectItem } from "../components/common/Select";
import { TextInput } from "../components/common/TextInput";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useGetCartItemsQuery } from "../services/api";

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const Cart = () => {
  const { control, handleSubmit } = useForm({});

  const { data: cart, isLoading } = useGetCartItemsQuery();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper>
          <div className="text-xs text-[#515655] flex items-center gap-2">
            <p>Home</p>
            <p>/</p>
            <p>Shop</p>
            <p>/</p>
            <p className="text-rebel-ruby-100">Cart</p>
          </div>

          {/* box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.05); */}

          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="grid grid-cols-4 p-5 shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)] rounded">
                <p className="col-span-2">Product</p>
                <p>Price</p>
                <p className="text-right">Quantity</p>
              </div>

              <div className="grid grid-cols-4 p-5 rounded">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    alt=""
                    className="w-28 rounded h-28 object-cover object-top"
                    src={url}
                  />

                  <div>
                    <p>Dhyiama premium Dress Set</p>
                  </div>
                </div>

                <p className="font-medium text-lg">$98</p>

                <div className="flex flex-col gap-10 ml-auto">
                  <div className="flex items-center gap-1">
                    <button
                      // onClick={() =>
                      //   dispatch(decreaseQuantity({ id: item.id }))
                      // }
                      className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                      type="button"
                    >
                      <PiMinus />
                    </button>
                    <div className="h-9 w-11 border border-crystal-clear-300 rounded grid place-items-center">
                      <p>4</p>
                    </div>
                    <button
                      // onClick={() =>
                      //   dispatch(increaseQuantity({ id: item.id }))
                      // }
                      type="button"
                      className="h-9 text-sm w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                    >
                      <PiPlus />
                    </button>
                  </div>

                  <button
                    // onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    type="button"
                    className="text-xs text-right text-[#515655] underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <CartTotal />
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
