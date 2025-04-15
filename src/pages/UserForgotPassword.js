import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiLoader4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";
import { useForgotPasswordMutation } from "../services/api";
import usePageTitle from "../hook/usePageTitle";

export const UserForgotPassword = () => {
  usePageTitle("Forgot Password | Amaraé");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onSubmit = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success(
        "Password reset email sent successfully. Please check your email."
      );
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
        <h1 className="text-3xl md:text-5xl">Forgot Password</h1>

        <div className="flex flex-col gap-6">
          <TextInput
            control={control}
            name="email"
            type="email"
            label="Email Address"
            required
          />

          <Button disabled={isLoading} type="submit" className="bg-black">
            {isLoading ? (
              <RiLoader4Line className="animate-spin text-2xl text-rebel-ruby-100" />
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight className="text-xl" />
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};
