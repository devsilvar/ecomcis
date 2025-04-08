import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiLoader4Line } from "react-icons/ri";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { TextInput } from "../components/common/TextInput";
import usePageTitle from "../hook/usePageTitle";
import { useResetPasswordMutation } from "../services/api";

export const UserResetPassword = () => {
  usePageTitle("Reset Password | Amaraé");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("ref");
  const token = searchParams.get("token");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onSubmit = async (data) => {
    try {
      if (data.new_password !== data.confirm_password) {
        toast.error("Passwords do not match");
        return;
      }
      await resetPassword({
        userId,
        token,
        data,
      }).unwrap();
      toast.success("Password reset successful! Login to continue...");
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
    <main className="bg-rebel-ruby-100 h-dvh flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-8 w-96 flex flex-col gap-6 rounded-md border border-neutral-200"
      >
        <h1 className="text-2xl md:text-5xl">Reset Password</h1>

        <div className="flex flex-col gap-6">
          <TextInput
            control={control}
            name="new_password"
            type="password"
            label="New Password"
            required
          />
          <TextInput
            control={control}
            name="confirm_password"
            type="password"
            label="Confirm New Password"
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
