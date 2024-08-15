import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Input from "../components/admin/form/Input";


function Support(){
    return <div>
        <Header />
        <section class="py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                    <div class="w-full lg:w-1/2 mx-auto">
                        <div class="lg:max-w-xl">
                            <div class="mb-6 lg:mb-16">
                                <h2 class="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">Please submit how we can help you</h2>
                            </div>
                            <div class="accordion-group" data-accordion="default-accordion">
                             <form>
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
                                <p className="text-[0.875rem] mb-[10px]">Complaint</p>
                                    <textarea
                                        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[76px] w-[100%] rounded-[8px] px-[16px]"
                                        placeholder="Enter your complaint"
                                        name="complaint"
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