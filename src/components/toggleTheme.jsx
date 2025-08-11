import {Sun, Moon} from 'lucide-react'
import { useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState();

  return (
    <button
      onClick={() => {
        setTheme(() => {setTheme(theme === "dark" ? "light" : "dark")});
      }}
      className="cursor-pointer bg-gray-800 rounded-xl p-2 transition-all duration-500 ease-in-out hover:bg-gray-900 transform hover:rotate-360"
    >
      <Sun />
    </button>
  );
};

export default ToggleTheme;
