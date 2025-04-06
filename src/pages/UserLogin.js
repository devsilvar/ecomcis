import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";

export const UserLogin = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <main className="bg-rebel-ruby-100 h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-8 w-96 flex flex-col gap-6 rounded-md border border-neutral-200"
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
            name="email"
            type="email"
            label="Username"
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

          <Button className="bg-black" type="button">
            <span>Login</span>
            <ArrowRight className="text-xl" />
          </Button>
        </div>
      </form>
    </main>
  );
};
