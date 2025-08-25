
import { useRef } from "react";

const AddTaskBox = ({ inputClasses, buttonClasses, task, setTask, addTask }) => {
  const inputRef = useRef(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={`flex rounded-lg overflow-hidden ${inputClasses}`}>
        <input
          type="text"
          className="flex-grow px-4 py-3 bg-transparent focus:outline-none min-w-0"
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
          className={`px-6 py-3 transition-all duration-200 flex-shrink-0 ${buttonClasses}`}
          onClick={addTask}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTaskBox;