import { useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const LineChart = ({ historicalData }) => {
  const chartRef = useRef(null);

  // Automatically resize when window changes
  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance()?.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const option = useMemo(() => {
    const prices = historicalData?.prices ?? [];

    const firstPrice = prices[0]?.[1] ?? 0;
    const lastPrice = prices[prices.length - 1]?.[1] ?? 0;
    const isUp = lastPrice >= firstPrice;

    const primaryColor = isUp ? "#22c55e" : "#ef4444";
    const gradientColorStart = isUp
      ? "rgba(34, 197, 94, 0.35)"
      : "rgba(239, 68, 68, 0.35)";
    const gradientColorEnd = "rgba(0, 0, 0, 0)";

    return {
      animation: true,
      animationDuration: 900,
      animationEasing: "cubicOut",
      backgroundColor: "transparent",

      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(13, 16, 28, 0.92)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderRadius: 12,
        padding: [10, 14],
        textStyle: { color: "#fff", fontSize: 12 },
        formatter: (params) => {
          const p = params[0];
          if (!p) return "";
          const date = new Date(p.axisValue);
          const dateStr = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const price = Number(p.value[1]).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${primaryColor};margin-right:6px;box-shadow:0 0 6px ${primaryColor}"></span>`;
          return `
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">${dateStr}</div>
            <div style="font-weight:700;font-size:14px">${dot}$${price}</div>
          `;
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "rgba(255,255,255,0.12)",
            width: 1,
            type: "dashed",
          },
        },
      },

      grid: {
        left: "2%",
        right: "2%",
        top: "4%",
        bottom: "6%",
        containLabel: true,
      },

      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: "rgba(255,255,255,0.35)",
          fontSize: 11,
          fontFamily: "inherit",
          margin: 12,
          formatter: (value) => {
            const d = new Date(value);
            return d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          },
        },
      },

      yAxis: {
        type: "value",
        scale: true,
        position: "left",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.05)",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "rgba(255,255,255,0.35)",
          fontSize: 11,
          fontFamily: "inherit",
          formatter: (value) =>
            value >= 1000
              ? `$${(value / 1000).toFixed(1)}k`
              : `$${value.toLocaleString()}`,
        },
      },

      series: [
        {
          name: "Price",
          type: "line",
          smooth: true,
          smoothMonotone: "x",
          showSymbol: false,
          symbol: "circle",
          symbolSize: 6,
          emphasis: {
            scale: true,
            itemStyle: {
              color: primaryColor,
              borderColor: "#fff",
              borderWidth: 2,
              shadowColor: primaryColor,
              shadowBlur: 10,
            },
          },
          data: prices,
          lineStyle: {
            width: 2.5,
            color: primaryColor,
            shadowColor: primaryColor,
            shadowBlur: 8,
          },
          itemStyle: {
            color: primaryColor,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: gradientColorStart },
                { offset: 1, color: gradientColorEnd },
              ],
            },
          },
        },
      ],
    };
  }, [historicalData]);

  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "canvas" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default LineChart;