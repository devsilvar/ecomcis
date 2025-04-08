import React from "react";
import { PiMailbox, PiPhone } from "react-icons/pi";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/common/TextInput";
import { Textarea } from "../components/common/Textarea";
import Button from "../components/common/Button";
import { ArrowRight } from "../assets/icons/ArrowRight";

function Contact() {
  const { control, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper className="flex flex-col gap-10">
          <h1 className="text-xl font-abril font-bold">Contact Us</h1>

          <div className="lg:grid lg:grid-cols-3 flex flex-col-reverse gap-4">
            <div className="col-span-1 bg-rebel-ruby-100 p-8 rounded">
              <div className="flex flex-col gap-4 border-b border-b-neutral-200 pb-8">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-white grid place-items-center">
                    <PiPhone className="text-2xl text-rebel-ruby-100" />
                  </div>
                  <p className="text-lg text-white font-semibold">Call Us</p>
                </div>

                <div className="flex flex-col gap-1 text-sm text-white">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>
                    Phone:{" "}
                    <a className="hover:underline" href="tel:+8801611112222">
                      +8801611112222
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-8">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-white grid place-items-center">
                    <PiMailbox className="text-2xl text-rebel-ruby-100" />
                  </div>
                  <p className="text-lg text-white font-semibold">
                    Write To US
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-sm text-white">
                  <p>
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      className="hover:underline"
                      href="mailto:customer@amarae.com"
                    >
                      customer@amarae.com
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      className="hover:underline"
                      href="mailto:support@amarae.com"
                    >
                      support@amarae.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-2 flex flex-col lg:grid lg:grid-cols-3 gap-4 py-6 px-8"
            >
              <TextInput
                control={control}
                name="first_name"
                type="text"
                label="First Name"
                required
              />
              <TextInput
                control={control}
                name="last_name"
                type="text"
                label="Last  Name"
                required
              />
              <TextInput
                control={control}
                name="phone"
                type="text"
                label="Phone Number"
                required
              />
              <Textarea
                control={control}
                name="message"
                label="Add a Message"
                rows={6}
                placeholder="Type your message here..."
                required
                wrapperClassName="col-span-full"
              />

              <Button type="submit" className="mt-5 bg-black">
                <span>Send Message</span>
                <ArrowRight className="text-xl" />
              </Button>
            </form>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
}

export default Contact;
