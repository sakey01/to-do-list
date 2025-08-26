import { Moon, Sun } from "lucide-react";


const ToggleTheme = ({ isDarkTheme, setIsDarkTheme }) => {
  const handleToggle = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors border border-gray-700"
      aria-label="Toggle theme"
    >
      {isDarkTheme? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ToggleTheme;