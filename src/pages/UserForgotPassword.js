import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";

export const UserForgotPassword = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <main className="bg-rebel-ruby-100 h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-8 w-96 flex flex-col gap-6 rounded-md border border-neutral-200"
      >
        <h1 className="text-2xl md:text-5xl">Forgot Password</h1>

        <div className="flex flex-col gap-6">
          <TextInput
            control={control}
            name="email"
            type="email"
            label="Email Address"
            required
            placeholder="Enter your email"
          />

          <Button className="bg-black" type="button">
            <span>Submit</span>
            <ArrowRight className="text-xl" />
          </Button>
        </div>
      </form>
    </main>
  );
};
