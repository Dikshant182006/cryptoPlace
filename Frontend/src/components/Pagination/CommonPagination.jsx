import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

const CommonPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage = 6,
  light = false,
  scrollToTop = false,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startItem =
    totalItems !== undefined
      ? (currentPage - 1) * itemsPerPage + 1
      : null;
  const endItem =
    totalItems !== undefined
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  const borderClass = light ? "border-black/10" : "border-white/10";
  const bgGlass = light
    ? "bg-black/[0.02] backdrop-blur-md"
    : "bg-white/[0.02] backdrop-blur-md";
  const textMuted = light ? "text-gray-500" : "text-gray-400";
  const textPrimary = light ? "text-gray-900" : "text-white";

  const navBtnBase = `flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border select-none`;
  const navBtnDefault = light
    ? "bg-black/5 hover:bg-black/10 text-gray-700 border-black/10 active:scale-95"
    : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:text-white active:scale-95 hover:border-white/20";
  const navBtnDisabled = "opacity-30 cursor-not-allowed pointer-events-none";

  const pageBtnBase = `min-w-[34px] h-[34px] flex items-center justify-center rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border select-none`;
  const pageBtnDefault = light
    ? "bg-black/5 text-gray-700 border-black/10 hover:bg-black/10 hover:text-black active:scale-95"
    : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/15 hover:text-white hover:border-white/20 active:scale-95";
  const pageBtnActive =
    "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold border-orange-400/60 shadow-[0_0_15px_rgba(249,115,22,0.35)] scale-105 pointer-events-none";

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t ${borderClass} ${bgGlass} rounded-b-2xl text-xs select-none`}
    >
      {/* Left: Summary info Badge */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${borderClass} ${
            light ? "bg-black/5" : "bg-white/5"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <div className={`font-medium ${textMuted}`}>
            {totalItems !== undefined ? (
              <span>
                Showing{" "}
                <span className={`font-semibold ${textPrimary}`}>
                  {startItem}–{endItem}
                </span>{" "}
                of{" "}
                <span className={`font-semibold ${textPrimary}`}>
                  {totalItems}
                </span>{" "}
                coins
              </span>
            ) : (
              <span>
                Page{" "}
                <span className={`font-semibold ${textPrimary}`}>
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className={`font-semibold ${textPrimary}`}>
                  {totalPages}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Pagination Controls */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* First Page */}
        {totalPages > 5 && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= 1}
            title="First Page"
            aria-label="First Page"
            className={`${navBtnBase} ${
              currentPage <= 1 ? navBtnDisabled : navBtnDefault
            } px-2`}
          >
            <FiChevronsLeft className="text-sm" />
          </button>
        )}

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous Page"
          className={`${navBtnBase} ${
            currentPage <= 1 ? navBtnDisabled : navBtnDefault
          }`}
        >
          <FiChevronLeft className="text-sm" />
          <span className="hidden xs:inline">Prev</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className={`w-7 text-center font-bold tracking-widest ${textMuted}`}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                className={`${pageBtnBase} ${
                  currentPage === page ? pageBtnActive : pageBtnDefault
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
          className={`${navBtnBase} ${
            currentPage >= totalPages ? navBtnDisabled : navBtnDefault
          }`}
        >
          <span className="hidden xs:inline">Next</span>
          <FiChevronRight className="text-sm" />
        </button>

        {/* Last Page */}
        {totalPages > 5 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            title="Last Page"
            aria-label="Last Page"
            className={`${navBtnBase} ${
              currentPage >= totalPages ? navBtnDisabled : navBtnDefault
            } px-2`}
          >
            <FiChevronsRight className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommonPagination;
