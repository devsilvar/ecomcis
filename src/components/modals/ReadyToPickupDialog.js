import { Dialog, DialogContent } from "../common/Dialog";
import { useNavigate } from "react-router-dom";
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Textarea } from "../common/Textarea";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { useSelector } from "react-redux";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { useGetCartItemsQuery } from "../../services/api";

export const ReadyToPickupDialog = ({ open, setOpen }) => {
  const { currency, conversionRate } = useCurrency();
  const navigate = useNavigate();
  //const { cart } = useSelector((state) => state.cart);
    const { data: cart, isLoading } = useGetCartItemsQuery()
  

  console.log(cart, "cart items");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md flex flex-col gap-10">
        <div className="flex flex-col gap-2 w-60 md:w-[350px]">
          <p>Welcome Back</p>
          <h2 className="md:text-5xl text-3xl">
            Ready to pick up where you left off?
          </h2>
          <p className="pt-2">
            'Continue shopping and grab your must-haves before they’re gone.'
          </p>
        </div>

        {/* {cart?.length ? (
          <ul className="flex flex-col gap-4">
            {cart?.length &&
              cart.map((item) => (
                <li key={item.id} className="flex items-center gap-2 md:gap-4">
                  <img
                    alt=""
                    className="md:w-32 w-24 rounded-md max-h-20 object-cover object-top"
                    src={item.product.first_image.image}
                  />

                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs">
                          Size:{" "}
                          <span className="font-semibold">
                            {item.size}
                          </span>
                        </p>
                        <p>|</p>
                        <p className="text-xs flex items-center gap-1">
                          Color:{" "}
                          <span
                            style={{ backgroundColor: item.color }}
                            className="size-4 inline-block rounded-full"
                          />
                        </p>
                      </div>

                      <p className="text-xs">
                        Quantity:{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 justify-between">
                    <p className="text-lg font-semibold">
                      {formatMoney(
                        item.product.price * item.quantity,
                        currency,
                        conversionRate
                      )}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        ) : null} */}

        <Button onClick={() => navigate("/cart")}>
          <span>View Cart</span>
          <ArrowRight className="text-xl" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
