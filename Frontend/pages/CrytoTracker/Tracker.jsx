import React from "react";
import rightArrow from "../../src/assets/rightArrow.svg";
import tick from "../../src/assets/tick.svg";

const Tracker = ({light}) => {
  const handleBinance = () => {
    const link = "https://www.binance.com/";
    window.open(link);
  };

  const handleMetaTask = () => {
    const link = "https://metamask.io/";
    window.open(link);
  };

  const handleOkxWallet = () => {
    const link = "https://web3.okx.com/";
    window.open(link);
  };

  const textMain = light? "text-black/70": "text-white/60";
  const textSub = light ? "text-gray-700" : "text-white/60";

  return (
    <div className="mt-40 h-[150%]">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col sm:flex-row text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Your All-in-{" "}
          </h2>
          <h2 className="text-5xl font-bold">One Crypto Portfolio Dashboard</h2>
        </div>
        <p className={`text-center text-2xl mx-5 ${textSub}`}>
          Track prices, monitor performance, and explore the crypto market{" "}
          <br /> from a single dashboard.
        </p>
      </div>

      <div className="boxes flex flex-col sm:flex-row justify-center gap-10 m-5">
        <div
          onClick={handleBinance}
          className="box1 h-[30vh] bg-gradient-to-b from-[#1e2026] to-[#121318] sm:w-[10vw] rounded-lg flex flex-col justify-center items-center pb-5 gap-3 cursor-pointer"
        >
          <img
            src="https://coinstats.app/_next/image/?url=https%3A%2F%2Fstatic.coinstats.app%2Fportfolio_images%2Fbinance_light.png&w=256&q=75"
            alt="BinanceImg"
            className="w-[5vw]"
          />
          <p className="text-white/60 text-sm">Binance</p>
          <div className={`flex ${textSub}`}>
            <p className="font-bold">Open</p>
            <img src={rightArrow} alt="rightArrow" className="invert" />
          </div>
        </div>
        <div
          onClick={handleMetaTask}
          className="box2 h-[30vh] bg-gradient-to-b from-[#1e2026] to-[#121318] sm:w-[10vw] rounded-lg cursor-pointer flex flex-col justify-center items-center pb-5 gap-3"
        >
          <img
            src="https://coinstats.app/_next/image/?url=https%3A%2F%2Fstatic.coinstats.app%2Fportfolio_images%2Fmetamask_light.png&w=256&q=75"
            alt="MetaTaskImg"
            className="w-[5vw]"
          />
          <p className="text-white/60 text-sm">MetaMask</p>
          <div className={`flex ${textSub}`}>
            <p className="font-bold">Open</p>
            <img src={rightArrow} alt="rightArrow" className="invert" />
          </div>
        </div>

        <div
          onClick={handleOkxWallet}
          className="box3 h-[30vh] bg-gradient-to-b from-[#1e2026] to-[#121318] sm:w-[10vw] rounded-lg cursor-pointer flex flex-col justify-center items-center pb-5 gap-3"
        >
          <img
            src="https://coinstats.app/_next/image/?url=https%3A%2F%2Fstatic.coinstats.app%2Fportfolio_images%2Fokx_light.png&w=256&q=75"
            alt="OkxWalletImg"
            className="w-[5vw] rounded-xl"
          />
          <p className="text-white/60 text-sm">OKW Wallet</p>
          <div className={`flex ${textSub}`}>
            <p className="font-bold">Open</p>
            <img src={rightArrow} alt="rightArrow" className="invert" />
          </div>
        </div>
      </div>

     <div className="flex flex-col lg:flex-row my-20 lg:my-40 mx-4 lg:mx-10 gap-10 lg:gap-28">
  {/* Left content */}
  <div className="w-full lg:w-[40vw] flex flex-col gap-5">
    <h2 className="text-3xl lg:text-4xl font-bold">
      What's a crypto portfolio tracker?
    </h2>

    <p className={textSub}>
      A crypto portfolio tracker is a tool that syncs with your wallets,
      exchanges, and blockchains to monitor all of your cryptocurrency
      investments.
    </p>

    <p className={textSub}>
      Crypto portfolio trackers provide real-time updates on the current
      crypto prices, market caps, and other relevant data about cryptocurrencies.
    </p>

    <p className={textSub}>
      Some crypto trackers also offer features such as price alerts,
      portfolio management, and analysis tools that help crypto investors
      make informed decisions.
    </p>

    <p className={textSub}>
      Many crypto trackers allow users to monitor multiple exchanges
      simultaneously, providing a comprehensive overview of the cryptocurrency market.
    </p>
  </div>

  {/* Right content */}
  <div className="w-full lg:w-[40vw]">
    <h2 className="text-3xl lg:text-4xl font-bold">
      What to look for in a good portfolio tracker?
    </h2>

    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-2">
        <img src={tick} alt="tickImg" className="w-6 h-6 invert bg-blue-900 rounded-2xl p-1" />
        <p>Real-time updates</p>
      </div>

      <div className="flex items-center gap-2">
        <img src={tick} alt="tickImg" className="w-6 h-6 invert bg-blue-900 rounded-2xl p-1" />
        <p>Portfolio management</p>
      </div>

      <div className="flex items-center gap-2">
        <img src={tick} alt="tickImg" className="w-6 h-6 invert bg-blue-900 rounded-2xl p-1" />
        <p>Profit & loss tracking</p>
      </div>

      <div className="flex items-center gap-2">
        <img src={tick} alt="tickImg" className="w-6 h-6 invert bg-blue-900 rounded-2xl p-1" />
        <p>Security & privacy</p>
      </div>

      <div className="flex items-center gap-2">
        <img src={tick} alt="tickImg" className="w-6 h-6 invert bg-blue-900 rounded-2xl p-1" />
        <p>Simple user interface</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Tracker;
