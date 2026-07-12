import React, { useState } from "react";
import plus from "../../src/assets/plus.svg";

const HelpCenter = ({light}) => {
  const [active, setActive] = useState(null);

  const handleData = (index) => {
    setActive(active === index ? null : index);
  };

  const faqData = [
    {
      question: "What is CryptoPlace?",
      answer:
        "CryptoPlace is a crypto tracking platform that helps users explore live cryptocurrency prices, market trends, and key coin data in one place.",
    },
    {
      question: "How can I track crypto prices?",
      answer:
        "You can easily track cryptocurrency prices on CryptoPlace by using the search feature or browsing the available list of coins on the platform. Simply enter the name of any cryptocurrency to view its real-time price, market capitalization, trading volume, and recent price changes. The platform fetches live data from reliable sources, ensuring that you always see up-to-date market information. You can also explore detailed coin pages to get deeper insights into price movements, trends, and overall market performance.",
    },
    {
      question: "How often is data updated?",
      answer:
        "The data on CryptoPlace is updated in near real-time to ensure you always have access to the latest cryptocurrency market information. The platform uses reliable external APIs to fetch live data, including price changes, market capitalization, trading volume, and other key metrics. Whenever there is a change in the market, the data is refreshed automatically so users can stay informed about the most recent trends and movements. This allows you to monitor price fluctuations, compare different cryptocurrencies, and make better decisions based on up-to-date information.",
    },
    {
      question: "What features does this platform offer?",
      answer:
        "CryptoPlace provides a range of features designed to help you explore and understand the cryptocurrency market with ease. You can search for any cryptocurrency and view real-time data such as current price, market capitalization, trading volume, and recent price changes. The platform also includes a detailed coin view where you can access deeper insights about each cryptocurrency, helping you better understand its performance and market trends. In addition, the dashboard displays global market statistics, giving you an overview of the overall crypto market in one place.",
    },
    {
      question: "Can I connect my wallet?",
      answer:
        "Currently, CryptoPlace does not support direct wallet or exchange connections. The platform is designed to help users explore and track cryptocurrency data such as prices, market trends, and coin details in a simple and user-friendly way. While you cannot connect your wallet at the moment, you can still use CryptoPlace to monitor market movements, search for specific coins, and stay updated with real-time crypto information. The goal is to provide a smooth and informative experience without requiring any account setup or external integration.",
    },
     {
    question: "Is CryptoPlace free to use?",
    answer: "Yes, CryptoPlace is completely free to use and does not require any signup."
  },
  {
    question: "Can I use it on mobile?",
    answer: "Yes, the platform is fully responsive and works smoothly on mobile devices."
  }
  ];

  const textMain = light? "text-black/70": "text-white/60";
  const textSub = light? "text-black" : "text-white";

  return (
    <div className="h-screen my-30 mx-20">
      <div className="flex flex-col gap-30 sm:flex-row">
        <div>
          <h2 className="text-4xl leading-11 font-bold">
            Get the Answers to All Your <br /> Questions
          </h2>
          <p className="mt-5">
            Have questions about features or how to use the platform? <br />
            We’ve got you covered!
          </p>
        </div>

        <div>
          {faqData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleData(index)}
                className="border-b cursor-pointer py-3"
              >
                <div className="flex justify-between items-center md:w-[30vw]">
                  <span
                    className={
                      active === index
                        ? "text-xl"
                        : "text-xl"
                    }
                  >
                    {item.question}
                  </span>

                  <img src={plus} alt="plus" className="invert" />
                </div>

                {active === index && (
                  <p className={`mt-2 md:w-[30vw] ${textMain}`}>{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;