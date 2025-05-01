import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CartTotal } from "../components/common/CartTotal";
import { Select, SelectItem } from "../components/common/Select";
import { TextInput } from "../components/common/TextInput";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import {
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
} from "../services/api";
import * as React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import usePageTitle from "../hook/usePageTitle";
import { RiLoader4Line } from "react-icons/ri";
import { countries } from "../libs/constants";

function hasAllValues(obj) {
  return Object.values(obj).every(
    (value) => value !== undefined && value !== null && value !== ""
  );
}

export const Checkout = () => {
  usePageTitle("Checkout | Amaraé");
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { data: shippingAddress, isLoading } = useGetShippingAddressQuery();
  const { user } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    values: {
      full_name: user?.full_name ?? "",
      email: user?.email ?? "",
      city: shippingAddress?.city ?? "",
      country: shippingAddress?.country ?? "",
      postal_code: shippingAddress?.postal_code ?? "",
      street_address: shippingAddress?.street_address ?? "",
    },
  });

  const [addShippingAddress, { isLoading: isPending }] =
    useAddShippingAddressMutation();
  const onSubmit = async (data) => {
    if (hasAllValues(data) && !isDirty) {
      navigate("/payment");
      return;
    }

    try {
      await addShippingAddress({
        ...data,
        apartment_address: data.street_address,
        default: true,
        address_type: "S",
      }).unwrap();
      toast.success("Shipping address added successfully!");
      navigate("/payment");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("You must be logged in to checkout!");
    }
  }, [token]);

  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper>
          <div className="text-xs text-[#515655] flex items-center gap-2">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <p>/</p>
            <Link className="hover:underline" to="/shop">
              Shop
            </Link>
            {/* <p>/</p>
            <Link className="hover:underline" to="/cart">
              View Cart
            </Link> */}
            <p>/</p>
            <p className="text-rebel-ruby-100">Checkout</p>
          </div>

          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-6 md:gap-10 pt-10">
            {isLoading ? (
              <div className="flex col-span-2 items-center gap-2 justify-center">
                <RiLoader4Line className="animate-spin text-lg text-rebel-ruby-100" />
                <p className="font-medium">Loading...</p>
              </div>
            ) : (
              <form
                id="form"
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 justify-between">
                  <h2 className="font-bold text-lg font-abril">
                    Your Information
                  </h2>

                  {/* <button
                 type="button"
                 onClick={() => setOpen(false)}
                 className="text-xs text-[#515655] underline"
               >
                 Update Shipping Address
               </button> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TextInput
                    control={control}
                    name="full_name"
                    type="text"
                    label="Full Name"
                    required
                    disabled
                  />
                  <TextInput
                    control={control}
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    disabled
                  />
                  <Select
                    control={control}
                    name="country"
                    label="Choose Country/Region"
                  >
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <TextInput
                    control={control}
                    name="city"
                    type="text"
                    label="Enter State/Province"
                    required
                    // disabled={open}
                  />
                  <TextInput
                    control={control}
                    name="street_address"
                    type="text"
                    label="Enter Street Address"
                    required
                    // disabled={open}
                  />
                  <TextInput
                    control={control}
                    name="postal_code"
                    type="text"
                    label="Enter Postal Code"
                    required
                    // disabled={open}
                  />
                </div>
              </form>
            )}

            <CartTotal isPending={isPending} btnText="Proceed to Payment" />
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
