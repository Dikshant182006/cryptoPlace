import { useState, useEffect } from "react";
import { useFearGreedIndex } from "../../hooks/UseFearAndGreed";

function describeArc(cx, cy, r, startAngle, endAngle) {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = (cx + r * Math.cos(startRad)).toFixed(2);
  const y1 = (cy - r * Math.sin(startRad)).toFixed(2);
  const x2 = (cx + r * Math.cos(endRad)).toFixed(2);
  const y2 = (cy - r * Math.sin(endRad)).toFixed(2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

const SEGMENTS = [
  { start: 176, end: 148, color: "#ef4444", label: "Extreme Fear" },
  { start: 140, end: 112, color: "#f97316", label: "Fear" },
  { start: 104, end: 76, color: "#eab308", label: "Neutral" },
  { start: 68, end: 40, color: "#84cc16", label: "Greed" },
  { start: 32, end: 4, color: "#10b981", label: "Extreme Greed" },
];

const getSentimentColor = (cls) => {
  const lower = (cls || "").toLowerCase();
  if (lower.includes("extreme greed")) return "text-emerald-400";
  if (lower.includes("greed")) return "text-emerald-400";
  if (lower.includes("extreme fear")) return "text-red-400";
  if (lower.includes("fear")) return "text-orange-400";
  return "text-yellow-400";
};

const FearGreedIndex = ({ light = false, initialValue = 59, initialClassification = "Greed" }) => {

  const {
    data: fngData,
  } = useFearGreedIndex();

  const data = fngData ?? {
    value: initialValue,
    classification: initialClassification,
    historical: {
      yesterday: 55,
      lastWeek: 48,
      lastMonth: 32,
    },
  };

  const historical = data.historical;
  const [showTooltip, setShowTooltip] = useState(false);

  const cx = 125;
  const cy = 115;
  const r = 85;

  // Map value (0 - 100) to arc angle (176° down to 4°)
  const clampedVal = Math.min(Math.max(data.value, 0), 100);
  const fraction = clampedVal / 100;
  const indicatorAngle = 176 - fraction * (176 - 4);
  const indicatorRad = (indicatorAngle * Math.PI) / 180;
  const knobX = cx + r * Math.cos(indicatorRad);
  const knobY = cy - r * Math.sin(indicatorRad);

  return (
    <div
      className={`relative rounded-3xl p-5 sm:p-5.5 transition-all duration-300 w-full max-w-[360px] sm:w-[350px] select-none group hover:-translate-y-1 ${light
        ? "bg-white/90 border border-black/10 shadow-xl hover:shadow-2xl hover:border-black/20"
        : "bg-gradient-to-b from-[#14172a]/95 via-[#101322]/95 to-[#0b0c16]/98 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:border-purple-500/30 hover:shadow-purple-500/5"
        }`}
    >
      {/* Subtle top hairline accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none rounded-t-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3
            className={`font-bold text-base sm:text-[17px] tracking-tight ${light ? "text-gray-900" : "text-white"
              }`}
          >
            Fear and Greed Index
          </h3>
          <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip((prev) => !prev)}
          >
            <svg
              className={`w-4 h-4 transition-colors ${light
                ? "text-gray-400 hover:text-gray-700"
                : "text-gray-400 hover:text-white"
                }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>

            {/* Tooltip */}
            {showTooltip && (
              <div
                className={`absolute top-full mt-2 left-0 sm:left-1/2 sm:-translate-x-1/2 w-64 p-3 rounded-2xl text-xs leading-relaxed z-[100] shadow-2xl backdrop-blur-xl border transition-all ${light
                  ? "bg-white/95 text-gray-800 border-gray-200 shadow-gray-400/20"
                  : "bg-[#181b2f]/98 text-gray-200 border-white/15 shadow-black/80"
                  }`}
              >
                <div className="font-semibold mb-1 text-orange-400">Fear &amp; Greed Index</div>
                The crypto Fear &amp; Greed Index analyzes multi-factor market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed).
              </div>
            )}
          </div>
        </div>

        {/* Live status dot */}
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live
        </span>
      </div>

      {/* Semicircle Gauge */}
      <div className="relative flex flex-col items-center justify-center pt-1 pb-1">
        <svg
          viewBox="0 0 250 145"
          className="w-full h-auto overflow-visible"
        >
          {/* Segments */}
          {SEGMENTS.map((seg, idx) => (
            <path
              key={idx}
              d={describeArc(cx, cy, r, seg.start, seg.end)}
              fill="none"
              stroke={seg.color}
              strokeWidth="11"
              strokeLinecap="round"
            />
          ))}

          {/* White Indicator Dot with drop shadow */}
          <circle
            cx={knobX}
            cy={knobY}
            r="7"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
            style={{
              transition: "cx 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </svg>

        {/* Value and Classification in Center */}
        <div className="absolute bottom-2 flex flex-col items-center justify-center pointer-events-none">
          <span
            className={`text-4xl sm:text-[44px] font-black leading-tight tracking-tight ${light ? "text-gray-900" : "text-white"
              }`}
          >
            {data.value}
          </span>
          <span className={`text-xs sm:text-sm font-semibold tracking-wide capitalize mt-0.5 ${getSentimentColor(data.classification)}`}>
            {data.classification}
          </span>
        </div>
      </div>

      {/* Contextual Historical Markers */}
      <div
        className={`mt-3 pt-3 border-t w-full grid grid-cols-3 gap-2 text-center ${light ? "border-gray-200" : "border-white/[0.08]"
          }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
            Yesterday
          </span>
          <span
            className={`text-xs font-black mt-0.5 ${getSentimentColor(
              historical.yesterday >= 55 ? "Greed" : historical.yesterday <= 45 ? "Fear" : "Neutral"
            )}`}
          >
            {historical.yesterday}
          </span>
        </div>
        <div
          className={`flex flex-col items-center border-x ${light ? "border-gray-200" : "border-white/[0.08]"
            }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
            Last Week
          </span>
          <span
            className={`text-xs font-black mt-0.5 ${getSentimentColor(
              historical.lastWeek >= 55 ? "Greed" : historical.lastWeek <= 45 ? "Fear" : "Neutral"
            )}`}
          >
            {historical.lastWeek}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
            Last Month
          </span>
          <span
            className={`text-xs font-black mt-0.5 ${getSentimentColor(
              historical.lastMonth >= 55 ? "Greed" : historical.lastMonth <= 45 ? "Fear" : "Neutral"
            )}`}
          >
            {historical.lastMonth}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FearGreedIndex;
