import * as React from "react";
import { toast } from "react-hot-toast";
import { PiMinus, PiPlus } from "react-icons/pi";
import { RiLoader4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import usePageTitle from "../hook/usePageTitle";
import { capitalize } from "../libs/utils";
import { useGetProductByIdQuery } from "../services/api";
import { saveToCart } from "../store/features/cart/saveToCart";
import { useCurrency } from "../utils/CurrencyProvider";
import { formatMoney } from "../utils/nairaFormat";
import "./admin/descriptionEditor/editor.css";
import { ProductDescSheet } from "../components/modals/ProductDescSheet";
import { ZoomDialog } from "../components/modals/ZoomDialog";

function truncateHTML(html, maxLength) {
  let div = document.createElement("div");
  div.innerHTML = html;

  let truncated = "";
  let length = 0;

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (length + node.textContent.length > maxLength) {
        truncated += node.textContent.substring(0, maxLength - length);
        length = maxLength;
      } else {
        truncated += node.textContent;
        length += node.textContent.length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      truncated += `<${node.nodeName.toLowerCase()}`;
      for (let attr of node.attributes) {
        truncated += ` ${attr.name}="${attr.value}"`;
      }
      truncated += ">";

      for (let child of node.childNodes) {
        if (length >= maxLength) break;
        traverse(child);
      }

      truncated += `</${node.nodeName.toLowerCase()}>`;
    }
  }

  traverse(div);

  return `${truncated}...`;
}

export const ProductDetails = () => {
  const { id } = useParams();
  const { currency, conversionRate } = useCurrency();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [isZoomed, setIsZoomed] = React.useState(false);

  usePageTitle(`${capitalize(product?.name) ?? "Payment Details"} | Amaraé`);
  const dispatch = useDispatch();

  const [imageIndex, setImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(null);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(
        product.variations ? product.variations?.[0]?.colors[0] : null
      );
    }
  }, [product]);

  const addProductToCart = () => {
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
  };

  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper className="flex flex-col gap-10">
          <div className="text-xs text-[#515655] flex items-center gap-2">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <p>/</p>
            <Link className="hover:underline" to="/shop">
              Shop
            </Link>
            <p>/</p>
            {isLoading ? (
              <RiLoader4Line className="animate-spin text-base text-rebel-ruby-100" />
            ) : (
              <span className="text-rebel-ruby-100">
                {product ? capitalize(product?.name) : ""}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center w-full items-center gap-2">
              <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
              <span>Loading...</span>
            </div>
          ) : isError ? (
            <div className="flex flex-col w-80 mx-auto text-center items-center col-span-full justify-center lg:justify-start gap-2">
              <h2 className="text-xl font-abril">Error Getting product</h2>
              <p className="text-sm">
                We are encountering an issue fetching this product or it does
                not exists. Refresh this page to try again.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-7">
              <div
                data-aos="fade-in"
                className="col-span-4 lg:sticky lg:top-0 lg:self-start flex flex-col gap-4"
              >
                <img
                  alt={product.name}
                  onClick={() => setIsZoomed(true)}
                  className="w-full h-full cursor-zoom-in rounded-lg object-cover object-top"
                  src={product.images[imageIndex]}
                  fetchPriority="high"
                />

                <div className="grid grid-cols-4 gap-1.5 md:gap-2.5">
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
                            className="w-full max-h-48 rounded-md object-cover object-center"
                            src={url}
                          />
                        </button>
                      ))
                    : null}
                </div>
              </div>

              <div
                data-aos="fade-in"
                data-aos-delay="200"
                className="col-span-3 flex flex-col gap-6 lg:px-10 py-6"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-abril font-normal">
                    {capitalize(product?.name)}
                  </h2>
                  <p className="font-bold text-2xl">
                    {formatMoney(product.price, currency, conversionRate)}
                  </p>
                </div>

                <div className="py-3 flex flex-col gap-6 items-start border-b border-b-neutral-300 pt-10">
                  <p className="leading-relaxed">
                    <div
                      className="editor-content"
                      dangerouslySetInnerHTML={{
                        __html: truncateHTML(product.desc, 250),
                      }}
                    />
                  </p>
                  <ProductDescSheet desc={product.desc} />
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
                  <Button type="button" onClick={addProductToCart}>
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

      {product ? (
        <ZoomDialog
          src={product.images[imageIndex]}
          open={isZoomed}
          setOpen={setIsZoomed}
          alt=""
        />
      ) : null}
    </WebsiteLayout>
  );
};
