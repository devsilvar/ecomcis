import { PiQuotesFill } from "react-icons/pi";
import { Quote } from "../../assets/icons/Quote";
import { Wrapper } from "../common/Wrapper";
import Image009 from "../../assets/images/image-009.webp";
import Image004 from "../../assets/images/image-004.webp";
import Image010 from "../../assets/images/image-010.webp";

const testimonials = [
  {
    id: 1,
    name: "Emily Watson",
    desc: "The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!",
  },
  {
    id: 2,
    name: "Emily Watson",
    desc: "The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!",
  },
  {
    id: 3,
    name: "Emily Watson",
    desc: "The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!",
  },
];

export const Others = () => {
  return (
    <>
      <section className="pt-20 md:pt-0">
        <Wrapper>
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto"
          >
            Styled & Loved by All
          </h2>

          <ul className="grid md:grid-cols-3 gap-6 pt-10">
            {testimonials.map((testimonial, index) => (
              <li
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                key={testimonial.id}
                className="p-6 border flex flex-col gap-6 border-neutral-200 bg-neutral-100 rounded-md"
              >
                <Quote className="text-3xl" />
                <p className="text-xl font-bold">{testimonial.name}</p>
                <p className="text-[#6F6F6F]">{testimonial.desc}</p>
              </li>
            ))}
          </ul>
        </Wrapper>
      </section>

      <section className="pt-10">
        <Wrapper>
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto"
          >
            Styled by you, Celebrated by us.
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-lg max-w-[450px] mx-auto text-base text-center pt-2"
          >
            Tag us on instagram{" "}
            <a
              href="https://www.instagram.com/amaraebrand?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              @amaraebrand
            </a>{" "}
            and on Tiktok{" "}
            <a
              href="https://www.tiktok.com/@amarae.io?_t=ZN-8v0LgegdrK2&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @amarae.io
            </a>{" "}
            let's see how you make it yours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-10">
            <img
              alt=""
              data-aos="fade-up"
              data-aos-delay="200"
              className="w-full rounded h-full object-cover object-top"
              src={Image009}
            />
            <img
              alt=""
              data-aos="fade-up"
              data-aos-delay="300"
              className="w-full hidden md:block rounded h-full object-cover object-top"
              src={Image004}
            />
            <img
              alt=""
              data-aos="fade-up"
              data-aos-delay="400"
              className="w-full rounded hidden md:block h-full object-cover object-top"
              src={Image010}
            />
          </div>
        </Wrapper>
      </section>
    </>
  );
};
