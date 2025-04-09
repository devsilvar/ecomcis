import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
import Button from "../components/common/Button";
import { ArrowRight } from "../assets/icons/ArrowRight";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-abril font-bold">Page Not Found!</h1>
            <p>The page you are looking for does not exists.</p>

            <Button onClick={() => navigate("/")} className="bg-black mt-6">
              <span>Go back Home</span>
              <ArrowRight className="text-xl" />
            </Button>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};

export default NotFound;
