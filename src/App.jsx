import "./App.css";
import ToggleTheme from "./components/toggleTheme";
import { useState, useEffect, useRef } from "react";

import { Check, Edit2, Trash2, Search } from "lucide-react";

function App() {
  const [query, setQuery] = useState("");
  const [task, setTask] = useState("");
  const [isIncluded, setIsIncluded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tasks, setTasks] = useState(() => {
    // Load tasks on from local storage
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const inputRef = useRef(null);

  // Focus task input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // blinking effect
  useEffect(() => {
    const blink = setInterval(() => {
      setVisible((v) => !v);
    }, 1200);

    return () => clearInterval(blink);
  }, []);

  // Save items whenever 'tasks' changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Create new task list
  const addTask = () => {
    if (!task) return;
    if (tasks.includes(task)) {
      setIsIncluded(true);
      return;
    } else setIsIncluded(false);
    setTasks([...tasks, task]);
    setTask("");
  };

  // Handles tasks search
  const filteredTasks = tasks.filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200">
      <header>
        {/* Navigation */}
        <nav className="flex items-center justify-between w-full p-6 shadow-lg bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800">
          {/* Brand + link */}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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

            {/* Toggle dark/light theme */}
            <ToggleTheme />
          </div>
        </nav>
      </header>

      <main className="mt-16 flex flex-col justify-center items-center text-center gap-8">
        {/* Quote */}
        <h2 className="text-[3.2rem] font-bold text-gray-100">
          It doesn&apos;t have to be pretty.
          <span
            className={`transition-opacity duration-1000 ${
              visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            |
          </span>
        </h2>

        {/* Task input bar */}
        <div className="flex border border-gray-800 rounded-full w-full max-w-xl p-2 gap-2 bg-gray-900/80 backdrop-blur-sm shadow-xl ">
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

        {isIncluded && <p>Error, tasks already contains task</p>}

        {/* Task List */}
        <h3 className="text-xl font-semibold">Task List</h3>
        {tasks && (
          <ul className="last:mb-16">
            {filteredTasks.map((task) => {
              const isChecked = tasks.includes(!task);
              return (
                <li
                  key={task}
                  className="flex justify-between items-center gap-6 p-4 rounded-full hover:bg-gray-800"
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
                    <button aria-label={`Edit2 task "${task}"`} className="p-1 hover:text-blue-400">
                      <Edit2 size={20} />
                    </button>
                    <button
                      aria-label={`Delete task "${task}"`}
                      className="p-1 hover:text-red-400"
                      onClick={() => {
                        setTasks(tasks.filter((i) => i !== task));
                      }}
                    >
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
