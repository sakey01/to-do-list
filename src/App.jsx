import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Check, Edit2, Trash2, Search, Moon, Sun } from "lucide-react";

// Toggle Theme Component
const ToggleTheme = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors border border-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [task, setTask] = useState("");
  const [isIncluded, setIsIncluded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks = localStorage.getItem("checkedTasks");
    return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : {};
  });
  const [visible, setVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Changed to track editing state per task index
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const inputRef = useRef(null);

  // Focus task input on render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const blink = setInterval(() => {
      setVisible((v) => !v);
    }, 1200);

    return () => clearInterval(blink);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save checked tasks to localStorage
  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);
  
  useEffect(() => {
    if (isIncluded) {
      const timer = setTimeout(() => {
        setIsIncluded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isIncluded]);

  const toggleCheck = (taskIndex) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskIndex]: !prev[taskIndex],
    }));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Adds tasks to list
  const addTask = () => {
    if (!task.trim()) return;

    const isDuplicate = tasks.some((t) => t.toLowerCase() === task.trim().toLowerCase());
    if (isDuplicate) {
      setIsIncluded(true);
      return;
    }

    setTasks([...tasks, task.trim()]);
    setTask("");
    setQuery(""); // Clear search bar when adding task
    setIsIncluded(false);
  };

  // Start editing a task
  const startEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  // Save edit
  const saveEdit = (index, newText) => {
    if (newText.trim()) {
      const trimmedText = newText.trim();
      const isDuplicate = tasks.some((task, i) => 
        i !== index && task.toLowerCase() === trimmedText.toLowerCase()
      );
      
      if (isDuplicate) {
        setIsIncluded(true);
        return;
      }
      
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = trimmedText;
        return updatedTasks;
      });
    }
    setEditingIndex(null);
    setEditText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((t) => t !== taskToDelete));
    setCheckedTasks({});
  };

  // Handles task search
  const filteredTasks = tasks.filter(
    (t) => typeof t === "string" && t.toLowerCase().includes(query.toLowerCase())
  );


  // Theme values
  const themeClasses = isDarkTheme
    ? "min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200"
    : "min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 text-gray-800";

  const navClasses = isDarkTheme
    ? "bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800"
    : "bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300";

  const searchClasses = isDarkTheme
    ? "bg-gray-800/70 border-gray-700 text-gray-200"
    : "bg-gray-200/70 border-gray-400 text-gray-700";

  const inputClasses = isDarkTheme
    ? "border-gray-800 bg-gray-900/80 text-gray-100 focus:ring-gray-700"
    : "border-gray-300 bg-gray-100/80 text-gray-700 focus:ring-gray-400";

  const buttonClasses = isDarkTheme
    ? "bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700"
    : "bg-gray-300 hover:bg-gray-400 text-gray-700 border-gray-400";

  const taskItemClasses = isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-200";

  return (
    <div className={themeClasses}>
      <header>
        {/* Navigation */}
        <nav
          className={`flex items-center justify-between w-full p-4 md:p-6 shadow-lg ${navClasses}`}
        >
          {/* Brand + link */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <a
              href="https://github.com/sakey01/to-do-list"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold transform scale-y-150 transition-colors ${
                isDarkTheme
                  ? "text-gray-100 hover:text-gray-300"
                  : "text-gray-700 hover:text-gray-500"
              }`}
            >
              &lt;/&gt;
            </a>
            <h1
              className={`text-base md:text-lg font-semibold flex-none ${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <span className="hidden sm:inline">Task App</span>
              <span className="sm:hidden">Tasks</span>
            </h1>
          </div>

          {/* Search box + toggle */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-between min-w-0 ml-4">
            <div
              className={`relative flex-1 min-w-[120px] sm:min-w-[180px] md:min-w-[200px] max-w-[400px] rounded-full backdrop-blur-sm shadow-inner ${searchClasses}`}
            >
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 ${
                  isDarkTheme ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                }}
                placeholder="Search..."
                className="w-full pl-10 md:pl-14 pr-3 md:pr-4 py-2 md:py-3 rounded-full bg-transparent focus:outline-none focus:ring-2 text-sm md:text-base"
              />
            </div>

            {/* Toggle dark/light theme */}
            <div className="flex-shrink-0">
              <ToggleTheme isDark={isDarkTheme} onToggle={toggleTheme} />
            </div>
          </div>
        </nav>
      </header>

      <main className="mt-16 flex flex-col justify-center items-center text-center gap-8 px-4">
        {/* Quote */}
        <h2
          className={`text-[3.2rem] font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}
        >
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
        <div
          className={`flex flex-col sm:flex-row border rounded-full w-full max-w-xl p-2 gap-2 backdrop-blur-sm shadow-xl ${inputClasses}`}
        >
          <input
            type="text"
            className="flex-grow rounded-full px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Type task..."
            value={task}
            ref={inputRef}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
              if (e.key === "Escape") setTask("");
            }}
          />
          <button
            className={`px-6 py-2 rounded-full transition-colors ${buttonClasses} w-full sm:w-auto`}
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {isIncluded && (
          <p className="text-lg text-red-500 font-medium">Error: Task already exists</p>
        )}

        {/* Task List */}
        {tasks.length > 0 && (
          <>
            <h3
              className={`text-xl font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}
            >
              Task List {query && `(${filteredTasks.length} of ${tasks.length})`}
            </h3>
            <ul className="w-full max-w-2xl space-y-2 mb-16">
              {/* Map individual tasks */}
              {filteredTasks.map((taskItem) => {
                const originalIndex = tasks.indexOf(taskItem);
                const isChecked = checkedTasks[originalIndex];
                const isCurrentlyEditing = editingIndex === originalIndex;

                return (
                  <li
                    key={`${taskItem}-${originalIndex}`}
                    className={`flex justify-between items-center gap-6 p-4 rounded-lg transition-colors ${taskItemClasses}`}
                  >
                    {isCurrentlyEditing ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(originalIndex, editText)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEdit(originalIndex, editText);
                          }
                          if (e.key === "Escape") {
                            cancelEdit();
                          }
                        }}
                        autoFocus
                        className={`flex-grow rounded px-2 py-1 ${
                          isDarkTheme 
                            ? "bg-gray-700 text-gray-100 border-gray-600" 
                            : "bg-white text-gray-900 border-gray-300"
                        } border`}
                      />
                    ) : (
                      <span
                        className={`capitalize flex-grow text-left ${
                          isChecked ? "line-through opacity-60" : ""
                        }`}
                      >
                        {taskItem}
                      </span>
                    )}

                    <div className="flex gap-3">
                      <button
                        aria-label={`Mark "${taskItem}" as ${
                          isChecked ? "incomplete" : "completed"
                        }`}
                        className={`p-1 transition-colors ${
                          isChecked
                            ? "text-green-500"
                            : isDarkTheme
                            ? "hover:text-green-400"
                            : "hover:text-green-600"
                        }`}
                        onClick={() => toggleCheck(originalIndex)}
                      >
                        <Check size={20} />
                      </button>

                      <button
                        aria-label={`Edit task "${taskItem}"`}
                        className={`p-1 transition-colors ${
                          isDarkTheme ? "hover:text-blue-400" : "hover:text-blue-600"
                        }`}
                        onClick={() => startEdit(originalIndex, taskItem)}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        aria-label={`Delete task "${taskItem}"`}
                        className={`p-1 transition-colors ${
                          isDarkTheme ? "hover:text-red-400" : "hover:text-red-600"
                        }`}
                        onClick={() => deleteTask(taskItem)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {tasks.length === 0 && (
          <p className={`text-lg ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
            No tasks yet. Add one above to get started!
          </p>
        )}
      </main>
    </div>
  );
}

export default App;