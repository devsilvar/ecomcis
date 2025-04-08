import React from "react";
import { PiMailbox, PiPhone, PiWarning } from "react-icons/pi";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/common/TextInput";
import { Textarea } from "../components/common/Textarea";
import Button from "../components/common/Button";
import { ArrowRight } from "../assets/icons/ArrowRight";
import usePageTitle from "../hook/usePageTitle";

export const ReportScam = () => {
  usePageTitle("Report Scam | Amaraé");
  const { control, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WebsiteLayout>
      <section className="py-20">
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
                label="Your Full Name"
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
                label="Give a Detailed Description of The Scam Here"
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
};
