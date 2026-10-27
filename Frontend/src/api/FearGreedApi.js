export const fetchFearGreedIndex = async () => {
  const res = await fetch(
    "https://api.alternative.me/fng/?limit=31"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Fear & Greed Index");
  }

  const json = await res.json();

  if (!json?.data?.length) {
    throw new Error("No Fear & Greed data available");
  }

  const entries = json.data;

  return {
    value: Number(entries[0].value),
    classification:
      entries[0].value_classification || "Neutral",
    historical: {
      yesterday: Number(entries[1]?.value ?? 55),
      lastWeek: Number(entries[7]?.value ?? 48),
      lastMonth: Number(entries[30]?.value ?? 32),
    },
  };
};
