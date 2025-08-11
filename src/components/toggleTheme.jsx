import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(false);

  return (
    <button
      onClick={() => {
        setTheme(!theme);
      }}
      className="cursor-pointer bg-gray-800 rounded-xl p-2 hover:bg-gray-900"
    >
      <DarkModeIcon />
    </button>
  );
};

export default ToggleTheme;
