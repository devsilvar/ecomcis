import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import { Heart } from "../../assets/icons/Heart";
import { HeartFill } from "../../assets/icons/HeartFill";
import { saveToCart } from "../../store/features/cart/saveToCart";
import {
  removeFromWishlist,
  saveToWishlist,
} from "../../store/features/cart/saveToWishlist";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { useState } from "react";
import { capitalize } from "../../libs/utils";

export const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { currency, conversionRate } = useCurrency();
  const [image, setImage] = useState(product.images[0]);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  return (
    <Link
      key={product.id}
      onMouseEnter={() => {
        if (product.images.length > 1) {
          setImage(product.images[1]);
        }
      }}
      onMouseLeave={() => {
        setImage(product.images[0]);
      }}
      to={`/shop/product/${product.id}`}
      className="flex flex-col gap-3"
    >
      <div className="relative">
        <img
          alt={product.name}
          className="w-full h-72 md:h-96 rounded-md object-cover object-top"
          src={image}
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
        <p className="text-xs">{capitalize(product.desc)}</p>
        <p className="pt-1">
          {formatMoney(product.price, currency, conversionRate)}
        </p>
      </div>
    </Link>
  );
};
