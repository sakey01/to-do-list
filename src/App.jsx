import "./App.css";
import { useState, useEffect, useRef } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import { Check, Edit3, Trash2 } from "lucide-react";

function App() {
  const [theme, setTheme] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef(null);

  // Focus task input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedQuery(query);
    }, 600);

    return clearTimeout(debounce);
  });

  // Create new task list
  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  // Handles tasks search
  const filteredTasks = tasks.filter((t) => t.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200">
      <header>
        {/* Navigation */}
        <nav className="flex items-center justify-between w-full p-6 shadow-lg bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800">
          {/* Logo + href*/}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/sakey01/to-do-list"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transform scale-y-150 text-gray-100 hover:text-gray-300 transition-colors"
            >
              &lt;/&gt;
            </a>
            <h1 className="text-lg font-semibold flex-none text-gray-300">Task App</h1>
          </div>

          {/* Search box + toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative w-[300px] rounded-full bg-gray-800/70 backdrop-blur-sm text-gray-200 border border-gray-700 shadow-inner">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setTask("");
                }}
                placeholder="Search Tasks..."
                className="w-full pl-14 pr-4 py-3 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            {/* Toggle dark theme */}
            <button
              onClick={() => setTheme(!theme)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl p-2 border border-gray-700 shadow-md transition-colors"
            >
              <DarkModeIcon />
            </button>
          </div>
        </nav>
      </header>

      <main className="mt-16 flex flex-col justify-center items-center text-center gap-8">
        {/* Quote */}
        <h2 className="text-[3.2rem] font-bold text-gray-100">
          It doesn&apos;t have to be pretty.
        </h2>

        {/* Task input bar */}
        <div className="flex border border-gray-800 rounded-full w-full max-w-xl p-2 gap-2 bg-gray-900/80 backdrop-blur-sm shadow-xl">
          <input
            type="text"
            className="flex-grow rounded-full px-4 py-2 bg-transparent text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Type task..."
            value={task}
            ref={inputRef}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
              if (e.key === "Escape") setTask("");
            }}
          />
          <button
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full border border-gray-700 transition-colors"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {tasks && (
          <ul>
            {filteredTasks.map((task) => {
              const isChecked = tasks.includes(!task);
              return (
                <li
                  key={task}
                  className="flex justify-between items-center gap-3 p-2 rounded hover:bg-gray-800"
                >
                  <span
                    className="capitalize"
                    style={{ textDecoration: isChecked && "line-through" }}
                  >
                    {task}
                  </span>

                  <div className="flex gap-3">
                    <button
                      aria-label={`Mark "${task}" as completed`}
                      className="p-1 hover:text-green-400"
                    >
                      <Check size={20} />
                    </button>
                    <button aria-label={`Edit task "${task}"`} className="p-1 hover:text-blue-400">
                      <Edit3 size={20} />
                    </button>
                    <button aria-label={`Delete task "${task}"`} className="p-1 hover:text-red-400">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
