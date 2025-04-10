import React, { useState } from "react";
import { PiMailbox, PiPhone, PiWarning } from "react-icons/pi";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/common/TextInput";
import { Textarea } from "../components/common/Textarea";
import Button from "../components/common/Button";
import { ArrowRight } from "../assets/icons/ArrowRight";
import usePageTitle from "../hook/usePageTitle";
import { useSendEmailMutation } from "../hook/useSendEmailMutation";
import { RiLoader4Line } from "react-icons/ri";
import { FormSuccessDialog } from "../components/modals/FormSuccessDialog";

export const ReportScam = () => {
  usePageTitle("Report Scam | Amaraé");
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
        subject:
          "Website: New Report Scam Form Submission from " + data.full_name,
        htmlContent: `
         <h1>New Report Scam Form Submission</h1>
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
        <Wrapper className="flex flex-col gap-10">
          <h1 className="text-xl font-abril font-bold">Report a Scam</h1>

          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-4">
            <div className="col-span-1 bg-rebel-ruby-100 p-4 md:p-8 flex flex-col gap-4 text-white items-center rounded">
              <PiWarning className="text-6xl" />
              <p className="font-bold text-xl">
                Help us keep Amarae safe for everyone by reporting suspicious
                activities.
              </p>
              <p className="leading-relaxed">
                We take scams seriously. If you suspect any fraudulent activity
                related to Amarae, please report it immediately. Your report
                helps us maintain a secure and trustworthy shopping platform.
              </p>
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
};
