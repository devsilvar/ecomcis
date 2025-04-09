import { useForm } from "react-hook-form";
import { RiLoader4Line } from "react-icons/ri";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { useSubscribeMutation } from "../../hook/useSubscribeMutation";
import { useSubscribeToNewsletterMutation } from "../../services/api";
import Button from "../common/Button";
import { TextInput } from "../common/TextInput";
import { Wrapper } from "../common/Wrapper";

export const Subscribe = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { onSubscribe: subscribe, isLoading } = useSubscribeMutation();
  const onSubscribe = async (data) => {
    try {
      await subscribe(data.email);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="md:p-10 pt-4">
      <Wrapper className="bg-crystal-clear-100 bg-image-mono bg-no-repeat bg-cover bg-top">
        <div className="bg-white/20 ">
          <div className="lg:p-20 py-10 px-5 max-w-[550px] flex flex-col gap-3 mx-auto">
            <h2 className="md:text-5xl text-4xl">Become an Exclusive Member</h2>
            <p>
              Join now and get 10% off your first order as a member of our
              community.
            </p>

            <form
              onSubmit={handleSubmit(onSubscribe)}
              className="flex flex-col gap-4"
            >
              <TextInput control={control} name="email" type="email" required />

              <Button className="bg-black" type="submit">
                {isLoading ? (
                  <RiLoader4Line className="animate-spin text-2xl text-white" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="text-xl" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
