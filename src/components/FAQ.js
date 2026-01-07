import React, { useState } from "react";

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-white/50 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <button
        onClick={toggleOpen}
        className="w-full p-4 lg:p-6 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-poiret text-xl lg:text-2xl text-gray-800 font-semibold pr-4">
            {faq.question}
          </h3>
          <div className="relative w-5 h-5 flex-shrink-0">
            <div
              className={`absolute top-1/2 left-1/2 w-4 h-0.5 rounded-px transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                isOpen ? "rotate-45 bg-pink-300" : "rotate-0 bg-cyan-600"
              }`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 w-4 h-0.5 rounded-px transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                isOpen ? "-rotate-45 bg-pink-300" : "rotate-90 bg-cyan-600"
              }`}
            ></div>
          </div>
        </div>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 lg:px-6 pb-4 lg:pb-6">
          <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ faqs }) => {
  return (
    <section className="py-12 lg:py-20 relative">
      <div className="absolute lg:block hidden w-56 h-96 transform -rotate-12 bg-yellow-200 opacity-50 blur-3xl rounded-full right-10"></div>
      <div className="absolute lg:block hidden w-56 h-64 transform rotate-12 bg-pink-200 opacity-50 blur-3xl rounded-full bottom-20 left-10"></div>
      <h2 className="text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8">
        Часті питання і відповіді
      </h2>
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
          {faqs.map((faq, idx) => (
            <FAQItem key={`faq-${idx}`} faq={faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;