import { useLocation } from "react-router-dom";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import usePageTitle from "../hook/usePageTitle";

const links = [
  "return-conditions",
  "how-to-return-an-item",
  "refunds",
  "damaged-or-defective-items",
  "contact-information",
];

export const ReturnPolicy = () => {
  usePageTitle("Legal & Privacy | Amaraé");
  const { hash } = useLocation();

  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper className="flex flex-col lg:gap-10">
          <h1 className="text-xl font-abril font-bold">Return Policy</h1>

          <div className="md:grid md:grid-cols-3 flex flex-col gap-4">
            <div className="md:col-span-1 text-white h-fit hidden md:flex flex-col gap-4 sticky top-2 left-0 bg-rebel-ruby-100 p-8 rounded">
              <p className="font-medium">Table of Contents</p>

              <ul className="pl-4 text-sm flex flex-col gap-3 py-1 border-l border-l-[#D45B7A]">
                {links.map((link) => (
                  <li
                    key={link}
                    className={`capitalize relative ${
                      hash === `#${link}`
                        ? "font-bold after:w-[3px] after:h-full after:bg-white after:absolute after:-left-[18px] after:top-0"
                        : ""
                    }`}
                  >
                    <a href={`#${link}`}>{link.replaceAll("-", " ")}</a>
                  </li>
                ))}
              </ul>
            </div>

            <article className="md:col-span-2 flex flex-col leading-relaxed gap-4 py-6 lg:px-8">
              <p>
                We want you to love your purchase! If you are not completely
                satisfied, you may return your items within 7 days of receiving
                your order for a full refund.
              </p>
              <ol className="list-decimal flex flex-col gap-2 list-inside">
                <li id="return-conditions">
                  <strong>Return Conditions:</strong>

                  <ul className="list-disc flex flex-col gap-2 list-outside pl-8">
                    <li>
                      Items must be unworn, unwashed, and in their original
                      condition with tags attached.
                    </li>
                    <li>Sale items are final sale and cannot be returned.</li>
                    <li>
                      Items returned after 7 days will not be accepted, and
                      refunds may take up to 30 business days to process.
                    </li>
                  </ul>
                </li>

                <li id="how-to-return-an-item">
                  <strong>How to Return an Item:</strong>

                  <ol className="list-decimal flex flex-col gap-2 list-outside pl-8">
                    <li>
                      Contact our customer service team at{" "}
                      <a
                        className="hover:text-rebel-ruby-100 underline transition-colors"
                        href="mailto:support@amarae.io"
                      >
                        support@amarae.io
                      </a>{" "}
                      to initiate the return process.
                    </li>
                    <li>
                      You will receive a return authorization number and
                      instructions on how to return your item(s).
                    </li>
                    <li>
                      Pack the item(s) securely in the original packaging, if
                      possible.
                    </li>
                    <li>
                      Ship the return package to the address provided by our
                      customer service team.
                    </li>
                  </ol>
                </li>

                <li id="refunds">
                  <strong>Refunds:</strong>

                  <ul className="list-disc flex flex-col gap-2 list-outside pl-8">
                    <li>
                      Refunds will be processed within 30 business days of
                      receiving the returned item(s).
                    </li>
                    <li>
                      Refunds will be issued to the original form of payment.
                    </li>
                    <li>Original shipping charges are non-refundable.</li>
                  </ul>
                </li>

                <li id="damaged-or-defective-items">
                  <strong>Damaged or Defective Items:</strong>

                  <ul className="list-disc flex flex-col gap-2 list-outside pl-8">
                    <li>
                      If you receive a damaged or defective item, please contact
                      our customer service team within 7 days of receipt.
                    </li>
                    <li>We will arrange for a replacement or refund.</li>
                  </ul>
                </li>

                <li id="contact-information">
                  <strong>Contact Information:</strong>

                  <p>
                    For any questions or concerns regarding returns, please
                    contact us at{" "}
                    <a
                      className="hover:text-rebel-ruby-100 underline transition-colors"
                      href="mailto:support@amarae.io"
                    >
                      support@amarae.io
                    </a>
                  </p>
                </li>
              </ol>

              <p>
                If you have any questions about this Privacy Policy, the
                practices, or your dealing with our Sites, please contact us at{" "}
                <a
                  className="hover:text-rebel-ruby-100 underline transition-colors"
                  href="mailto:support@amarae.io"
                >
                  support@amarae.io
                </a>{" "}
                and your inquiry will be dealt with as soon as possible.{" "}
              </p>
            </article>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
