import { PiQuotesFill } from "react-icons/pi";
import { Quote } from "../../assets/icons/Quote";
import { Wrapper } from "../common/Wrapper";
import Image003 from "../../assets/images/image-003.webp";
import Image004 from "../../assets/images/image-004.webp";
import Image005 from "../../assets/images/image-005.webp";

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

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const Others = () => {
  return (
    <>
      <section className="pt-20 md:pt-0">
        <Wrapper>
          <h2 className="text-3xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto">
            Styled & Loved by All
          </h2>

          <ul className="grid md:grid-cols-3 gap-6 pt-10">
            {testimonials.map((testimonial) => (
              <li
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

      <section className="py-20">
        <Wrapper>
          <h2 className="text-3xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto">
            Styled by you, Celebrated by us.
          </h2>
          <p className="md:text-lg text-base text-center pt-2">
            Tag us @amarae.io let's see how you make it yours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-10">
            <img
              alt=""
              className="w-full rounded h-full object-cover object-top"
              src={Image003}
            />
            <img
              alt=""
              className="w-full hidden md:block rounded h-full object-cover object-top"
              src={Image004}
            />
            <img
              alt=""
              className="w-full rounded hidden md:block h-full object-cover object-top"
              src={Image005}
            />
          </div>
        </Wrapper>
      </section>
    </>
  );
};
