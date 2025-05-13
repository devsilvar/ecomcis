import { toast } from "react-hot-toast";
import * as React from 'react'
import { PiMinus, PiPlus } from "react-icons/pi";
import { RiLoader4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { Cart } from "../../assets/icons/Cart";
import { Coupon } from "../../assets/icons/Coupon";
import { Note } from "../../assets/icons/Note";
import { Shipping } from "../../assets/icons/Shipping";
import { useAddToCartMutation, useUpdateQuantityMutation,useGetCartItemsQuery, useDeleteFromCartMutation } from "../../services/api";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/features/cart/saveToCart";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import Button from "./Button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./Sheet";

export const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currency, conversionRate } = useCurrency();

  const { token } = useSelector((state) => state.auth);
//  const { cart } = useSelector((state) => state.cart);
const { data: cart, isLoading:loader, refetch } = useGetCartItemsQuery();

//  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = cart?.reduce((acc, item) => acc + parseInt(item.total_price), 0)
  const [deleteFromCart, { isLoading: isDeleting }] = useDeleteFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation(); 
    const [isUpdating, setIsUpdating] = React.useState(false);

  const [addToCart, { isLoading }] = useAddToCartMutation();
    const handleQuantityChange = async (item,itemId, newQuantity) => {
      if (!item || typeof newQuantity !== 'number') return;
      if (!item) {
        console.warn('Cart item not found!');
        return null;
      }
  
      console.log(item)
      // Update Redux immediately (optional)
      dispatch(
        newQuantity > item.quantity
          ? increaseQuantity({ id: itemId })
          : decreaseQuantity({ id: itemId })
      );
      setIsUpdating(true);
      try {
        await updateQuantity({
          item_id: itemId,
          quantity: newQuantity,
        }).unwrap();
        refetch();
        toast.success('Quantity updated!');
      } catch (err) {
        toast.error('Failed to sync with server.');
        // Optional: rollback redux
      }finally{
        setIsUpdating(false);
      }
    };
    const handleDeleteFromCart = async (productId) => {
      try {
      await deleteFromCart(productId).unwrap();
      toast.success("Product removed from cart!");
      } catch (error) {
      toast.error(error.data.message);
      console.error(error);
      }
    };
  const proceedToCheckout = async () => {
    if (!token) {
      toast("You must be logged in to checkout!");
      navigate("/login");
      return;
    }
    
    try {
      const payload = cart.map((item) => ({
        product_id: item.product.id || item.id,
        quantity: item.quantity,
        size: item?.size|| item?.size.name,
        color: item?.color || item?.color.name,
      }));
      
    //  await addToCart(payload).unwrap();
      setTimeout(() => dispatch(clearCart()), 1000);
      toast.success("Items successfully added to cart.");
      navigate("/checkout");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2">
        <Cart className="text-2xl lg:text-lg" />
        <p className="hidden md:block">Cart</p>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-abril font-normal">My Cart</h2>
          <p className="text-xs px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 w-fit">
            {cart?.length}
          </p>
        </div>

        {cart?.length > 0 ? (
          <>
            <ul className="flex flex-col gap-4">
              {cart?.length &&
                [...cart]?.sort((a, b) => a.id - b.id).map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    {console.log(item, "item")}
                    <img
                      alt=""
                      className="w-32 rounded-md max-h-28 object-cover object-top"
                      src={item.product.first_image.image}
                    />

                    <div className="flex-1 flex flex-col gap-4">
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-xs">
                          Size:{" "}
                          <span className="font-semibold">
                            {item.size}
                          </span>
                        </p>
                        <p className="text-xs flex items-center gap-1">
                          Color:{" "}
                          <span
                            style={{ backgroundColor: item.color }}
                            className="size-4 inline-block rounded-full"
                          />
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>{
                            handleQuantityChange(item,item.id, item.quantity - 1)
                            dispatch(decreaseQuantity({ id: item.id }))
                          }}
                          className="sm:h-9 h-7 w-8 text-sm sm:w-11 hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                          type="button"
                        >
                          <PiMinus />
                        </button>
                        <div className="sm:h-9 h-7 w-8 sm:w-11  border border-crystal-clear-300 rounded grid place-items-center">
                          <p>{item.quantity}</p>
                        </div>
                        <button
                          onClick={() =>{
                            dispatch(increaseQuantity({ id: item.id }))
                            handleQuantityChange(item,item.id, item.quantity +1)
                          }}
                          type="button"
                          className="sm:h-9 h-7 w-8 text-sm sm:w-11  hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                        >
                          <PiPlus />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 justify-between">
                      <p className="text-xl font-semibold">
                        {formatMoney(
                          item.product.price * item.quantity,
                          currency,
                          conversionRate
                        )}
                      </p>

                      <button
                        onClick={() =>{
                          deleteFromCart(item.id)
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      }
                        type="button"
                        className="text-xs text-[#515655] underline"
                      >
                        Remove  
                      </button>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="border-y border-crystal-clear-300 flex items-center gap-4 md:gap-12 py-6">
              <div className="flex items-center gap-2">
                <Note />
                <p className="text-sm text-crystal-clear-400">Order Note</p>
              </div>
              <div className="flex items-center gap-2">
                <Coupon />
                <p className="text-sm text-crystal-clear-400">Coupon</p>
              </div>
              <div className="flex items-center gap-2">
                <Shipping />
                <p className="text-sm text-crystal-clear-400">Shipping</p>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between">
              <div>
                <p className="font-medium">Subtotal</p>
                <p className="text-xs text-neutral-500">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <p className="text-xl font-semibold">
                {formatMoney(total, currency, conversionRate)}
              </p>
            </div>

            <Button
              disabled={isLoading}
              onClick={proceedToCheckout}
              className="mx-auto"
            >
              {isLoading ? (
                <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="text-xl" />
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mx-auto mt-4">
            <p>There are no product in your cart </p>
            <SheetClose asChild>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-black py-3"
              >
                <span>See Suggested Products</span>
                <ArrowRight className="text-xl" />
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
