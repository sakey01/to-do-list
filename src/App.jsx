import "./App.css";
import Navbar from "./components/navbar";
import Title from "./components/title";
import AddTaskBox from "./components/addTaskBox";
import { useState, useEffect, useRef } from "react";
import { Check, Edit2, Trash2 } from "lucide-react";
import { ThemeContext } from "./contexts/themeContext";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [query, setQuery] = useState("");
  const [task, setTask] = useState("");
  const [showError, setShowError] = useState(false);
  const [isIncluded, setIsIncluded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks = localStorage.getItem("checkedTasks");
    return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : {};
  });

  const inputRef = useRef(null);

  // Changed to track editing state per task index
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Focus task input on render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (!stored) {
      setTasks([]);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save checked tasks to localStorage
  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  // Show duplicate task error
  useEffect(() => {
    if (!isIncluded) return;

    setShowError(true);

    const timer = setTimeout(() => {
      setShowError(false);
      setIsIncluded(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isIncluded]);

  const toggleCheck = (taskIndex) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskIndex]: !prev[taskIndex],
    }));
  };

  // Adds tasks to list
  const addTask = () => {
    if (!task.trim()) return;

    const isDuplicate = tasks.some(
      (t) => typeof t === "string" && t.toLowerCase() === task.trim().toLowerCase()
    );
    if (isDuplicate) {
      setIsIncluded(true);
      return;
    }

    setTasks([...tasks, task.trim()]);
    setTask("");
    setQuery("");
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
      const isDuplicate = tasks.some(
        (task, i) =>
          i !== index &&
          typeof task === "string" &&
          task.toLowerCase() === trimmedText.toLowerCase()
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

  // Color themes
  const themeClasses = isDarkTheme
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-100"
    : "min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 text-gray-800";

  const navClasses = isDarkTheme
    ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50"
    : "bg-white/95 backdrop-blur-sm border-b border-gray-200/50";

  const searchClasses = isDarkTheme
    ? "bg-gray-800/80 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    : "bg-white/80 border-gray-300 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const inputClasses = isDarkTheme
    ? "border-gray-600 bg-gray-800/90 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    : "border-gray-300 bg-white/90 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const buttonClasses = isDarkTheme
    ? "bg-gray-700 hover:bg-gray-600 text-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-600"
    : "bg-gray-800 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-700";

  const taskItemClasses = isDarkTheme
    ? "bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200"
    : "bg-white/70 hover:bg-white/90 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200";

  return (
    <ThemeContext value={{ isDarkTheme, setIsDarkTheme }}>
      <div className={`${themeClasses} flex flex-col flex-1`}>
        <Navbar navClasses={navClasses} searchProps={{ searchClasses, query, setQuery }} />

        <main className="flex flex-1 flex-col justify-center items-center text-center gap-8 px-4">
          {/* Quote */}
          <Title isDarkTheme={isDarkTheme} />

          {/* Task input bar */}
          <AddTaskBox
            buttonClasses={buttonClasses}
            inputClasses={inputClasses}
            task={task}
            addTask={addTask}
            setTask={setTask}
          />

          {isIncluded && (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ease-out ${
                showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              } ${
                isDarkTheme
                  ? "bg-red-900/20 border-red-800/50 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-red-400" : "bg-red-500"}`}
              ></div>
              <p className="font-medium">Task already exists</p>
            </div>
          )}

          {/* Task List */}
          {tasks.length > 0 && (
            <>
              <h3
                className={`text-xl font-semibold ${
                  isDarkTheme ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Tasks {query && `(${filteredTasks.length} of ${tasks.length})`}
              </h3>
              <ul className="w-full max-w-2xl space-y-3 mb-16">
                {/* Map individual tasks */}
                {filteredTasks.map((taskItem) => {
                  const originalIndex = tasks.indexOf(taskItem);
                  const isChecked = checkedTasks[originalIndex];
                  const isCurrentlyEditing = editingIndex === originalIndex;

                  return (
                    <li
                      key={`${taskItem}-${originalIndex}`}
                      className={`flex justify-between items-center gap-6 p-4 rounded-xl  animate-fade-in duration-300 ${taskItemClasses}`}
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
                          className={`flex-grow rounded-lg px-3 py-2 ${
                            isDarkTheme
                              ? "bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                              : "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          } border transition-colors`}
                        />
                      ) : (
                        <span
                          className={`capitalize flex-grow text-left font-medium ${
                            isChecked ? "line-through opacity-50" : ""
                          }`}
                        >
                          {taskItem}
                        </span>
                      )}

                      <div className="flex gap-2">
                        <button
                          aria-label={`Mark "${taskItem}" as ${
                            isChecked ? "incomplete" : "completed"
                          }`}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isChecked
                              ? "text-green-500 bg-green-100/20"
                              : isDarkTheme
                              ? "hover:text-green-400 hover:bg-green-400/10"
                              : "hover:text-green-600 hover:bg-green-50"
                          }`}
                          onClick={() => toggleCheck(originalIndex)}
                        >
                          <Check size={18} />
                        </button>

                        <button
                          aria-label={`Edit task "${taskItem}"`}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isDarkTheme
                              ? "hover:text-blue-400 hover:bg-blue-400/10"
                              : "hover:text-blue-600 hover:bg-blue-50"
                          }`}
                          onClick={() => startEdit(originalIndex, taskItem)}
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          aria-label={`Delete task "${taskItem}"`}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isDarkTheme
                              ? "hover:text-red-400 hover:bg-red-400/10"
                              : "hover:text-red-600 hover:bg-red-50"
                          }`}
                          onClick={() => deleteTask(taskItem)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {tasks.length === 0 && (
            <div className={`text-center py-12 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
              <p className="text-lg font-medium mb-2">No tasks yet</p>
              <p className="text-sm opacity-75">Add your first task above to get started!</p>
            </div>
          )}
        </main>
      </div>
    </ThemeContext>
  );
}

export default App;
