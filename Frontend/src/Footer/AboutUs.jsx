import React from "react";
import { Link } from "react-router-dom";

const AboutUs = ({light}) => {
  const textMain = light? "text-black/70": "text-white/60";
  const textSub = light? "text-black" : "text-white";
  return (
    <div className="min-h-screen">
      <div className="mt-30 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-center">
          About CryptoPlace & Brand Details
        </h2>
        <p className={`max-w-3xl mx-auto text-center mt-6 leading-8 ${textMain}`}>
          CryptoPlace is a modern cryptocurrency tracking platform that helps
          users explore live crypto prices, market trends, and detailed coin
          information in one place. It is designed with a clean interface to
          make crypto research simple and user-friendly.
        </p>
        <div className="mt-16 text-center">
          <h3 className={`text-3xl font-bold ${textSub}`}>Our Mission</h3>
          <p className={`max-w-2xl mx-5 mt-4 leading-8 ${textMain}`}>
            Our goal is to simplify cryptocurrency tracking and provide users
            with accurate, real-time data through a fast, clean, and responsive
            experience.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-16 px-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h4 className="text-white text-xl font-semibold">
              Real-Time Prices
            </h4>
            <p className="text-white/60 mt-3">
              Track live cryptocurrency prices with updated market information.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h4 className="text-white text-xl font-semibold">Market Trends</h4>
            <p className="text-white/60 mt-3">
              Explore trends, price changes, and overall market performance.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10">
            <h4 className="text-white text-xl font-semibold">Coin Details</h4>
            <p className="text-white/60 mt-3">
              View deeper insights for each cryptocurrency in a simple format.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center pb-16">
          <h3 className={`text-3xl font-bold ${textSub}`}>Why CryptoPlace?</h3>
          <p className={`max-w-2xl mx-auto mt-4 leading-8 ${textMain}`}>
            CryptoPlace combines clean UI, fast performance, and useful data to
            help users stay updated with the crypto market in an easy and
            accessible way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
