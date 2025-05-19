import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiLoader4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";
import { useRegisterMutation } from "../services/api";
import { useSelector , useDispatch } from "react-redux";
import usePageTitle from "../hook/usePageTitle";
import { useCurrency } from "../utils/CurrencyProvider";

export const UserRegister = () => {
  usePageTitle("Register | Amaraé");
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      mobile: "",
      is_active: true,
    },
  });
const dispatch = useDispatch()
  const {countryCode} = useCurrency()

  const [regiser, { isLoading }] = useRegisterMutation();

  // const { data:customerData } = useSelector(state => state.getCustomerContact);
  // const { data: addCustomer } = useSelector(state => state.addCustomerContact);
  // const { data: updateCustomer } = useSelector(state => state.updateCustomerContact);
  const onSubmit = async (data) => {
    try {
      await regiser(data).unwrap();
      toast.success(
        "Registration successful, Welcome to AMARAÉ! Login to continue..."
      );
      

      navigate("/login");
    } catch (err) {
      if (err.data) {
        Object.keys(err.data).forEach((key) => {
          toast.error(`${err.data[key]}`);
        });
        return;
      }

      toast.error("An unknown error occurred");
    }
  };

  return (
    <main
      style={{
        backgroundPositionY: "18%",
      }}
      className="bg-rebel-ruby-100 bg-image-mono bg-cover bg-center bg-no-repeat h-dvh flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-4 md:px-6 py-8 w-96 flex border-t-2 border-t-rebel-ruby-100 flex-col gap-6 md:rounded-md border border-neutral-200"
      >
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl md:text-5xl ">Join AMARAÉ </h1>
          <p className="text-neutral-500 text-sm">
            Already with us?{" "}
            <Link
              to="/login"
              className="text-rebel-ruby-100 hover:underline transition-all"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <TextInput
            control={control}
            name="full_name"
            type="text"
            label="Full name"
            required
          />
          <TextInput
            control={control}
            name="email"
            type="email"
            label="Email address"
            required
          />
          <TextInput
            control={control}
            name="mobile"
            type="text"
            label="Mobile number"
            maxLength={11}
            required
          />
          <TextInput
            control={control}
            name="password"
            type="password"
            label="Password"
            required
          />

          <div className="flex flex-col gap-2">
            <Button disabled={isLoading} type="submit" className="bg-black">
              {isLoading ? (
                <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
              ) : (
                <>
                  <span>Register</span>
                  <ArrowRight className="text-xl" />
                </>
              )}
            </Button>
            <p className="text-xs">
              By signing up, you agree to our{" "}
              <Link to="/legal-privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/legal-privacy" className="underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </form>
    </main>
  );
};
