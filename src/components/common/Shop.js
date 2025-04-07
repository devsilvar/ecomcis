import { RiLoader4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import { Heart } from "../../assets/icons/Heart";
import { HeartFill } from "../../assets/icons/HeartFill";
import usePageTitle from "../../hook/usePageTitle";
import { useGetProductsQuery } from "../../services/api";
import { saveToCart } from "../../store/features/cart/saveToCart";
import {
  removeFromWishlist,
  saveToWishlist,
} from "../../store/features/cart/saveToWishlist";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { WebsiteLayout } from "./WebsiteLayout";
import { Wrapper } from "./Wrapper";

export const Shop = () => {
  usePageTitle("Shop | Amaraé");
  const dispatch = useDispatch();
  const { currency, conversionRate } = useCurrency();
  const { data: products, isLoading } = useGetProductsQuery();

  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);
  // const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper className="flex flex-col gap-10">
          <header className="flex flex-col gap-1">
            <h1 className="text-4xl text-rebel-ruby-100">
              Yves: Crafted for the Bold, Worn by the Fearless
            </h1>
            <p>Shop now and wear your confidence like never before</p>
          </header>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
                <span>Getting products...</span>
              </div>
            ) : products.results.length ? (
              products.results.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/product/${product.id}`}
                  className="flex hover:scale-[1.025] transition-all flex-col gap-3"
                >
                  <div className="relative">
                    <img
                      alt={product.name}
                      className="w-full h-96 rounded-md object-cover object-top"
                      src={product.images[0]}
                    />

                    <div className="absolute z-50 right-4 h-full top-0 py-4 flex flex-col justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInWishlist(product.id)) {
                            dispatch(removeFromWishlist({ id: product.id }));
                            return;
                          }

                          dispatch(saveToWishlist(product));
                        }}
                        className={`size-7 grid place-items-center rounded-full ${
                          isInWishlist(product.id) ? "bg-red-100" : "bg-white"
                        }`}
                      >
                        {isInWishlist(product.id) ? (
                          <HeartFill className="text-error" />
                        ) : (
                          <Heart />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            saveToCart({
                              ...product,
                              quantity: 1,
                              color: product.variations[0].colors[0],
                              size: product.variations[0].colors[0].sizes[0],
                            })
                          );
                        }}
                        className="size-7 bg-white grid place-items-center rounded-full"
                      >
                        <Cart />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-xs">{product.desc}</p>
                    <p className="pt-1">
                      {formatMoney(product.price, currency, conversionRate)}
                    </p>
                  </div>
                </Link>
              ))
            ) : null}
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
