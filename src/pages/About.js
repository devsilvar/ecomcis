import React from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { Textarea } from "../components/common/Textarea";
import { TextInput } from "../components/common/TextInput";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import usePageTitle from "../hook/usePageTitle";
import ImageMono from "../assets/images/image-mono.webp";

const About = () => {
  usePageTitle("About | Amaraé");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper>
          <div className="flex flex-col gap-2 text-center max-w-[400px] mx-auto">
            <h1 className="text-4xl md:text-5xl">Our Purpose and Promise</h1>
            <p>
              Empowering women through stylish, accessible fashion that
              celebrates individuality and confidence
            </p>
          </div>
        </Wrapper>
      </section>

      <section className="pb-20">
        <Wrapper className="lg:grid lg:grid-cols-2 flex flex-col-reverse items-center gap-10">
          <article className="flex md:text-xl w-full flex-col gap-6">
            <h2 className="text-left text-5xl">Our Story</h2>

            <p className="leading-relaxed">
              At Amaraé, we believe in the power of fashion to transform and
              empower. Our brand is dedicated to providing stylish, high-quality
              clothing that is accessible to women from all walks of life.
              Founded on the principles of inclusivity and empowerment, we
              celebrate individuality and confidence, offering a diverse range
              of designs that empower women to express their unique identities.
            </p>

            <p className="leading-relaxed">
              Our collections are thoughtfully curated to reflect a diverse
              range of styles and preferences, ensuring that every woman can
              find something that resonates with her unique sense of style. At
              the heart of Amaraé is a commitment to our customers, prioritizing
              their needs and experiences in everything we do.
            </p>

            <p className="leading-relaxed">
              We invite you to explore our collections and join us in
              celebrating the beauty of individuality through fashion
            </p>
          </article>

          <img
            src={ImageMono}
            alt="Our Story"
            className="w-full object-cover object-top h-[700px]"
          />
        </Wrapper>
      </section>

      <section className="py-20 bg-neutral-200 mb-10">
        <Wrapper>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col border border-neutral-100 md:w-[70%] lg:w-1/2 gap-10 py-8 px-5 md:px-8 bg-white rounded-md"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xl text-rebel-ruby-100 font-bold">
                Got Questions?
              </p>
              <h3 className="text-2xl lg:text-5xl">Send us an email</h3>
            </div>

            <div className="flex flex-col gap-6">
              <TextInput
                control={control}
                name="full_name"
                type="text"
                label="Full Name"
                required
              />
              <Textarea
                control={control}
                name="message"
                label="Message"
                rows={6}
                placeholder="Type your message here..."
                required
              />

              <Button type="submit">
                <span>Send Question</span>
                <ArrowRight className="text-xl" />
              </Button>
            </div>
          </form>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};

export default About;
