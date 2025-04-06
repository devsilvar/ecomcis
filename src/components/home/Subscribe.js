import { useForm } from "react-hook-form";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import Button from "../common/Button";
import { TextInput } from "../common/TextInput";
import { Wrapper } from "../common/Wrapper";

export const Subscribe = () => {
  const { control, handleSubmit } = useForm();

  const onSubscribe = (data) => {
    console.log(data);
  };

  return (
    <section className="p-10">
      <Wrapper className="bg-red-200">
        <div className="p-20 max-w-[550px] flex flex-col gap-3 mx-auto">
          <h2 className="md:text-5xl text-2xl">Become an Exclusive Member</h2>
          <p>
            Join now and get 10% off your first order as a member of our
            community.
          </p>

          <form
            onSubmit={handleSubmit(onSubscribe)}
            className="flex flex-col gap-4"
          >
            <TextInput control={control} name="email" type="email" required />

            <Button className="bg-black" type="button">
              <span>Subscribe</span>
              <ArrowRight className="text-xl" />
            </Button>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};
