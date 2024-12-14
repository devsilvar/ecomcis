import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Input from "../components/admin/form/Input";


function Support(){
    return <div>
        <Header />
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                    <div className="w-full lg:w-1/2 mx-auto">
                        <div className="lg:max-w-xl">
                            <div className="mb-5 lg:mb-5 flex justify-center">
                                <h2 className="font-voga text-4xl text-center font-bold text-gray-900 lg:text-left">
                                    HOW CAN WE HELP YOU?
                                </h2>
                            </div>
                            <div className="accordion-group" data-accordion="default-accordion">
                            <form action="https://formsubmit.co/Buyamarae@gmail.com" method="POST">
                                <Input 
                                    topText="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                />
                                <Input 
                                    topText="Email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                />
                                <div>
                                <p className="text-[0.875rem]">Message</p>
                                    <textarea
                                        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[76px] w-[100%] rounded-[8px] px-[16px]"
                                        placeholder="Enter your message"
                                        name="message"
                                        required={true}
                                    ></textarea>
                                </div>
                                <br/>
                                <button className="bg-[#4E0240] text-[#fff] px-5 py-2 rounded mb-5">Submit</button>
                             </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                                                    
        <Footer />
    </div>
}

export default Support  