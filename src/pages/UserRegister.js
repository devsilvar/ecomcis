import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";

export const UserRegister = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <main className="bg-rebel-ruby-100 h-dvh flex items-center justify-center">
      <form className="bg-white px-6 py-8 w-96 flex flex-col gap-6 rounded-md border border-neutral-200">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-5xl ">Register</h1>
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
            name="email"
            type="email"
            label="Username"
            required
          />
          <TextInput
            control={control}
            name="password"
            type="password"
            label="Password"
            required
          />

          <Button className="bg-black" type="button">
            <span>Login</span>
            <ArrowRight className="text-xl" />
          </Button>
        </div>
      </form>
    </main>
  );
};
