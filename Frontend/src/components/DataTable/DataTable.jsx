const DataTable = ({
  columns,
  data,
  light = false,
  rowKey,
  selectable = false,
  onSelect,
  isSelected,
}) => {
  const textMain = light ? "text-gray-700" : "text-gray-300";

  const gridColumns = columns
    .map((column) => column.width || "1fr")
    .join(" ");

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-xl ${
        light
          ? "bg-white/80 border-black/10"
          : "bg-[#090909] border-white/10"
      }`}
    >
      <div className="overflow-x-auto hide-scrollbar-x p-5">

        {/* Header */}
        <div
          className={`grid min-w-[700px] gap-4 pb-4 border-b ${
            light ? "border-black/10" : "border-white/10"
          } text-right font-medium text-xs sm:text-sm ${textMain}`}
          style={{ gridTemplateColumns: gridColumns }}
        >
          {columns.map((column) => (
            <p
              key={column.key}
              className={column.headerClassName}
            >
              {column.header}
            </p>
          ))}
        </div>

        {/* Body */}
        {data.map((row) => (
          <div
            key={rowKey(row)}
            className={`grid min-w-[700px] gap-4 py-3.5 items-center border-b ${
              light
                ? "border-black/5 hover:bg-black/5"
                : "border-white/5 hover:bg-white/5"
            } transition-colors rounded-lg px-1 text-xs sm:text-sm ${textMain}`}
            style={{ gridTemplateColumns: gridColumns }}
          >
            {columns.map((column, index) => (
              <div
                key={column.key}
                className={column.cellClassName}
              >
                {index === 0 && selectable ? (
                  <div className="flex justify-between items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected?.(row) ?? false}
                      onChange={() => onSelect?.(row)}
                      className="cursor-pointer accent-orange-500 rounded"
                    />

                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </div>
                ) : (
                  column.render
                    ? column.render(row)
                    : row[column.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
