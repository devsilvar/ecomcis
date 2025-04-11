import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiLoader4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";
import usePageTitle from "../hook/usePageTitle";
import { useLoginMutation } from "../services/api";

export const UserLogin = () => {
  usePageTitle("Login | Amaraé");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      if (err.data.detail) {
        toast.error(err.data.detail);
        return;
      }

      toast.error("An unknown error occurred");
    }
  };

  if (token) {
    navigate("/");
  }

  return (
    <main className="bg-rebel-ruby-100 bg-image-mono bg-cover bg-no-repeat bg-top h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-8 w-96 border-b-2 border-b-rebel-ruby-100 flex flex-col gap-6 rounded-md border border-neutral-200"
      >
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-5xl ">Login</h1>
          <p className="text-neutral-500 text-sm">
            Not yet with us?{" "}
            <Link
              to="/register"
              className="text-rebel-ruby-100 hover:underline transition-all"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <TextInput
            control={control}
            name="username"
            type="email"
            label="Email Address"
            required
          />
          <div className="flex flex-col gap-2">
            <TextInput
              control={control}
              name="password"
              type="password"
              label="Password"
              required
            />
            <Link
              to="/forgot-password"
              className="text-rebel-ruby-100 text-xs hover:underline transition-all"
            >
              Forgot Password?
            </Link>
          </div>

          <Button disabled={isLoading} type="submit" className="bg-black">
            {isLoading ? (
              <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="text-xl" />
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};
