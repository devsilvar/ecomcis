import React, { useState } from "react";
import { PiMailbox, PiPhone } from "react-icons/pi";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/common/TextInput";
import { Textarea } from "../components/common/Textarea";
import Button from "../components/common/Button";
import { ArrowRight } from "../assets/icons/ArrowRight";
import { useSendEmailMutation } from "../hook/useSendEmailMutation";
import { RiLoader4Line, RiMailOpenLine } from "react-icons/ri";
import { FormSuccessDialog } from "../components/modals/FormSuccessDialog";
import usePageTitle from "../hook/usePageTitle";

function Contact() {
  usePageTitle("Contact | Amaraé");
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const { onSendEmail, isLoading } = useSendEmailMutation();
  const onSubmit = async (data) => {
    try {
      await onSendEmail({
        name: data.full_name,
        email: data.email,
        subject: "Website: New Contact Form Submission from " + data.full_name,
        htmlContent: `
         <h1>New Contact Form Submission</h1>
         <p><strong>Name:</strong> ${data.full_name}</p>
         <p><strong>Email:</strong> ${data.email}</p>
         <p><strong>Phone:</strong> ${data.phone}</p>
         <p><strong>Message:</strong> ${data.message}</p>
       `,
      });
      setOpen(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WebsiteLayout>
      <section className="py-10 md:py-20">
        <Wrapper className="flex flex-col lg:gap-10">
          <h1 className="text-xl font-abril font-bold">Contact Us</h1>

          <div className="lg:grid lg:grid-cols-3 flex flex-col-reverse gap-4">
            <div className="col-span-1 bg-rebel-ruby-100 p-8 rounded">
              <div className="flex flex-col gap-4 border-b border-b-neutral-200 pb-8">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-white grid place-items-center">
                    <RiMailOpenLine className="text-2xl text-rebel-ruby-100" />
                  </div>
                  <p className="text-lg text-white font-semibold">Email Us</p>
                </div>

                <div className="flex flex-col gap-1 text-sm text-white">
                  <p>We are available 24/7, 7 days a week.</p>
                  {/* <p>
                    Email:{" "}
                    <a className="hover:underline" href="mailto:info@amarae.io">
                      info@amarae.io
                    </a>
                  </p> */}
                  <p>
                    Email:{" "}
                    <a
                      className="hover:underline"
                      href="mailto:support@amarae.io"
                    >
                      support@amarae.io
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
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-2 flex flex-col lg:grid lg:grid-cols-3 gap-4 py-6 lg:px-8"
            >
              <TextInput
                control={control}
                name="full_name"
                type="text"
                label="Full Name"
                required
              />
              <TextInput
                control={control}
                name="email"
                type="email"
                label="Your Email Address"
                required
              />
              <TextInput
                control={control}
                name="phone"
                type="tel"
                label="Your Phone Number"
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

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-5 bg-black"
              >
                {isLoading ? (
                  <RiLoader4Line className="animate-spin text-2xl text-white" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="text-xl" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </Wrapper>
      </section>

      <FormSuccessDialog
        open={open}
        setOpen={setOpen}
        text="Thank you for reaching out! Your message has been sent successfully. Our team will get back to you within 24 - 48 hours."
      />
    </WebsiteLayout>
  );
}

export default Contact;
