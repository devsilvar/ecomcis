import { PiMinus, PiPlus } from "react-icons/pi";
import { RiLoader4Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useGetProductByIdQuery } from "../services/api";
import { useCurrency } from "../utils/CurrencyProvider";
import { formatMoney } from "../utils/nairaFormat";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { saveToCart } from "../store/features/cart/saveToCart";

export const ProductDetails = () => {
  const { id } = useParams();
  const { currency, conversionRate } = useCurrency();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  const dispatch = useDispatch();

  const [imageIndex, setImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(null);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.variations[0].colors[0]);
    }
  }, [product]);

  const addProductToCart = (product) => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color or size");
      return;
    }

    dispatch(
      saveToCart({
        ...product,
        quantity,
        color: selectedColor,
        size: selectedSize,
      })
    );
    toast.success("Product added to cart");
  };

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper className="flex flex-col gap-10">
          <div className="text-xs text-[#515655] flex items-center gap-2">
            <p>Home</p>
            <p>/</p>
            <p>Shop</p>
            <p>/</p>
            {isLoading ? (
              <RiLoader4Line className="animate-spin text-base text-rebel-ruby-100" />
            ) : (
              <span className="text-rebel-ruby-100">{product.name}</span>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center w-full items-center gap-2">
              <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="grid lg:grid-cols-7">
              <div className="col-span-4 flex flex-col gap-4">
                <img
                  alt={product.name}
                  className="w-full max-h-[700px] rounded-lg object-cover object-top"
                  src={product.images[imageIndex]}
                />

                <div className="grid grid-cols-4 gap-2.5">
                  {product.images.length
                    ? product.images.map((url) => (
                        <button
                          key={url}
                          onClick={() =>
                            setImageIndex(product.images.indexOf(url))
                          }
                          type="button"
                          className={`hover:opacity-70  transition-opacity ${
                            imageIndex === product.images.indexOf(url)
                              ? "opacity-70"
                              : ""
                          }`}
                        >
                          <img
                            alt={product.name}
                            className="w-full h-40 rounded-md object-cover object-top"
                            src={url}
                          />
                        </button>
                      ))
                    : null}
                </div>
              </div>

              <div className="col-span-3 flex flex-col gap-6 lg:px-10 py-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-abril font-normal">
                    {product.name}
                  </h2>
                  <p>{product.desc}</p>
                </div>

                <div className="py-3 border-b border-b-neutral-300 pt-10">
                  <p className="font-bold text-2xl">
                    {formatMoney(product.price, currency, conversionRate)}
                  </p>
                </div>

                {product.variations && product.variations.length ? (
                  product.variations[0].colors.length ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-[#515655]">
                          Colors
                        </p>

                        <div className="flex items-center gap-4">
                          {product.variations[0].colors.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setSelectedColor(color)}
                              type="button"
                              style={{ background: color.name }}
                              className={`size-6 rounded-full ${
                                selectedColor?.name === color.name
                                  ? "outline outline-offset-2 outline-rebel-ruby-100"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {selectedColor && selectedColor.sizes.length ? (
                        <div className="flex flex-col gap-2">
                          <p>Sizing</p>

                          <div className="flex items-center gap-4">
                            {selectedColor.sizes.map((size) => (
                              <button
                                key={size.id}
                                onClick={() => setSelectedSize(size)}
                                type="button"
                                className={`h-12 w-14 grid place-items-center border rounded-md transition-all ${
                                  size.id === selectedSize?.id
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
                    </>
                  ) : null
                ) : null}

                <div className="flex flex-col gap-2">
                  <p>Quantity</p>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (quantity <= 1) return;
                        setQuantity(quantity - 1);
                      }}
                      className="h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                      type="button"
                    >
                      <PiMinus />
                    </button>
                    <div className="h-12 w-14 border border-crystal-clear-300 rounded grid place-items-center">
                      <p>{quantity}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (!selectedSize) {
                          toast("Please select a size");
                          return;
                        }

                        if (quantity === selectedSize.quantity) {
                          toast("Maximum quantity reached");
                          return;
                        }

                        setQuantity(quantity + 1);
                      }}
                      type="button"
                      className="h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                    >
                      <PiPlus />
                    </button>
                  </div>
                </div>

                <div className="mx-auto flex flex-col items-center pt-10 gap-4">
                  <Button onClick={addProductToCart}>
                    <span>Add to Cart</span>
                    <ArrowRight className="text-xl" />
                  </Button>

                  <Link to="/cart" className="underline text-sm">
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
