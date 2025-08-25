import { Search } from "lucide-react";
import { useRef } from "react";

const SearchBox = ({
  type = "text",
  placeholder,
  isDarkTheme = "true",
  searchClasses = "true",
  query,
  setQuery,
}) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className={`relative flex-1 mr-12 sm:mr-0 min-w-[90px] sm:min-w-[140px] md:min-w-[200px] max-w-[400px] ${searchClasses}`}
    >
      <Search
        onClick={focusInput}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 cursor-pointer ${
          isDarkTheme ? "text-gray-500" : "text-gray-400"
        }`}
      />
      <input
        name={placeholder}
        type={type}
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setQuery("");
        }}
        placeholder={placeholder}
        className="w-full pl-10 md:pl-14 pr-3 md:pr-4 py-2 md:py-3 bg-transparent focus:outline-none focus:ring-1 text-sm md:text-base"
      />
    </div>
  );
};

export default SearchBox;
