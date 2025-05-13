import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { WebsiteLayout } from "../../components/common/WebsiteLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/common/Wrapper";


const ThankYou = ()=>{

    const {data} = useSelector((store) => store.getOrder)

    return (
        <div>
          <WebsiteLayout>
                    <section className='py-10'>
                        <Wrapper>
                <div className="flex flex-col p-[50px] justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img src="/images/check.svg" alt="" />
                        <p className="text-[2em]">Thank you for your order!!!</p>
                        <p>We have sent an order confirmation to your mail</p>
                        <Link className="p-3 bg-[#000] text-[#fff] mt-[30px]" to="/account/my-orders">Track your order</Link>
                    </div>
                </div>
                        </Wrapper>
                    </section>
                </WebsiteLayout>

        </div>
    )
}

export default ThankYou