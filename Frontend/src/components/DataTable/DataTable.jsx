import React from "react";
import { Link } from "react-router-dom";

const DataTable = ({
  columns = [],
  data = [],
  light = false,
  rowKey = "id",
  selectable = false,
  onSelect,
  isSelected,
  getRowLink,
  onRowClick,
  emptyState,
  footer,
  containerClassName = "",
  minWidth = "min-w-[700px]",
}) => {
  const textHeader = light ? "text-black/70" : "text-white/60";
  const textRow = light ? "text-black/80" : "text-white/70";

  // Build dynamic grid template columns from column definitions
  const gridTemplateColumns = columns
    .map((col) => col.width || "1fr")
    .join(" ");

  const getRowKey = (row, index) => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (row && row[rowKey] !== undefined) return row[rowKey];
    return index;
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden shadow-xl transition-colors ${
        light
          ? "bg-white/80 border-black/10"
          : "bg-[#090909] border-white/10"
      } ${containerClassName}`}
    >
      <div className="overflow-x-auto hide-scrollbar-x p-5">
        {/* Header */}
        <div
          style={{ gridTemplateColumns }}
          className={`grid ${minWidth} gap-4 pb-4 border-b ${
            light ? "border-black/10" : "border-white/10"
          } text-right font-medium text-xs sm:text-sm ${textHeader}`}
        >
          {columns.map((column, colIdx) => (
            <div
              key={column.key || colIdx}
              className={column.headerClassName || ""}
            >
              {column.header}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="py-16 text-center">
            {emptyState || (
              <p className={`text-sm ${light ? "text-black/50" : "text-white/50"}`}>
                No data available
              </p>
            )}
          </div>
        ) : (
          /* Rows */
          data.map((row, rowIndex) => {
            const rowClasses = `grid ${minWidth} text-right gap-4 py-3.5 items-center border-b ${
              light
                ? "border-black/5 hover:bg-black/5"
                : "border-white/5 hover:bg-white/5"
            } transition-colors rounded-lg px-1 text-xs sm:text-sm ${textRow} ${
              onRowClick || getRowLink ? "cursor-pointer" : ""
            }`;

            const rowContent = columns.map((column, colIndex) => (
              <div
                key={column.key || colIndex}
                className={column.cellClassName || ""}
              >
                {colIndex === 0 && selectable ? (
                  <div className="flex items-center gap-2.5">
                    <input
                      onChange={() => onSelect?.(row)}
                      type="checkbox"
                      checked={isSelected?.(row) ?? false}
                      className="cursor-pointer accent-orange-500 rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {column.render
                      ? column.render(row, rowIndex)
                      : row[column.key]}
                  </div>
                ) : column.render ? (
                  column.render(row, rowIndex)
                ) : (
                  row[column.key]
                )}
              </div>
            ));

            const key = getRowKey(row, rowIndex);

            if (getRowLink) {
              return (
                <Link
                  key={key}
                  to={getRowLink(row)}
                  style={{ gridTemplateColumns }}
                  className={rowClasses}
                >
                  {rowContent}
                </Link>
              );
            }

            return (
              <div
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{ gridTemplateColumns }}
                className={rowClasses}
              >
                {rowContent}
              </div>
            );
          })
        )}
      </div>

      {footer && <div className="border-t border-inherit">{footer}</div>}
    </div>
  );
};

export default DataTable;
