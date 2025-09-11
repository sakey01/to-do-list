import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

const ToggleTheme = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
 
  return (
    <button
      onClick={() => setIsDarkTheme((prev) => !prev)}
      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors border border-gray-700"
      aria-label="Toggle theme"
    >
      {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ToggleTheme;