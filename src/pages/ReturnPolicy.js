import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import usePageTitle from "../hook/usePageTitle";

export const ReturnPolicy = () => {
  usePageTitle("Return Policy | Amaraé");

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper>
          <h1 className="text-xl font-abril font-bold">Return Policy</h1>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
