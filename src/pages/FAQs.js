import React, {useState} from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";


function FAQs(){
    const [openIndex, setOpenIndex] = useState(null);
    const toggleAnswer = (index) => {
        // If the same question is clicked, close it; otherwise, open the new one
        setOpenIndex(openIndex === index ? null : index);
    };
    const questions = [
        {
            "question": "What payment methods do you accept?",
            "answer": "We accept all major credit cards (Visa, MasterCard, WallX)."
        },
        {
            "question": "How can I track my order?",
            "answer": "Once your order is shipped, you will receive an email with a tracking number and a link to track your package."
        },
        {
            "question": "Do you ship internationally?",
            "answer":"Yes, we offer international shipping. Shipping costs and delivery times will vary depending on your location."
        },
        {
            "question": "How long will it take to receive my order?",
            "answer":"Orders are typically processed within 1-3 business days. Delivery times vary based on your location and the shipping method selected at checkout."
        },
        {
            "question": "Can I change or cancel my order after it has been placed?",
            "answer":"Orders can be changed or canceled within 24 hours of placing the order. Please contact our customer service team as soon as possible."
        },
        {
            "question": "What should I do if I receive a damaged or incorrect item?",
            "answer":"If you receive a damaged or incorrect item, please contact our customer service team within 7 days of receiving your order. We will arrange for a replacement or refund."
        },
        {
            "question": "How do I care for my clothing?",
            "answer":"Each item comes with specific care instructions on the label. Generally, we recommend washing your clothing in cold water and laying it flat to dry."
        },
        {
            "question": "Do you offer gift cards?",
            "answer":"Yes, we offer gift cards in various amounts. You can purchase them on our website."
        },
        {
            "question": "How can I contact customer service?",
            "answer": `You can contact our customer service team via email at support@amarae.io or by phone at ${<Link to="tel:1-800-123-4567">1-800-123-4567</Link>}.`
        },
        {
            "question": "Do you have physical stores?",
            "answer": "Currently, we operate exclusively online. Subscribe to our newsletter for updates on potential pop-up shops and events."
        },
    ]
    return <div>
        <Header />
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                    <div className="w-full lg:w-1/2 mx-auto">
                        <div className="lg:max-w-xl">
                            <div className="mb-6 lg:mb-16">
                                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">Looking for answers?</h2>
                            </div>
                            <div className="accordion-group" data-accordion="default-accordion">
                                {questions.map((item, index) =>(

                                    <div key={index} className="accordion pb-8 border-b border-solid border-gray-200 active" id="basic-heading-one-with-arrow-always-open">
                                        <button  onClick={() => toggleAnswer(index)} className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:font-medium always-open" aria-controls="basic-collapse-one-with-arrow-always-open">
                                            <p className="text-bold" >{item.question}</p>
                                                <svg
                                                    className="text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180"
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 22 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                                                        stroke="currentColor"
                                                        stroke-width="1.6"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                        </button>
                                        <div
                                            className="accordion-content w-full px-0 overflow-hidden pr-4 active"
                                            aria-labelledby="basic-heading-one-with-arrow-always-open"
                                            >
                                                {openIndex === index && (
                                                    <div className="bg-white p-4 mt-2 rounded-lg border border-gray-200">
                                                        {item.answer}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                                                    
        <Footer />
    </div>
}

export default FAQs