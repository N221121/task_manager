import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Study",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    dueDate: "",
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await API.put(`/tasks/${formData._id}`, formData);
        toast.success("Task Updated Successfully");
        setEditing(false);
      } else {
        await API.post("/tasks", formData);
        toast.success("Task Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
        category: "Study",
        priority: "Medium",
        status: "Pending",
        progress: 0,
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Operation Failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Task");
    }
  };

  const editTask = (task) => {
    setEditing(true);

    setFormData({
      ...task,
      dueDate: task.dueDate
        ? task.dueDate.split("T")[0]
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "progress") {
    const progress = Number(value);

    setFormData({
      ...formData,
      progress,
      status:
        progress === 100
          ? "Completed"
          : progress > 0
          ? "In Progress"
          : "Pending",
    });

    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });
};
  const inputStyle =
    "border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 rounded-xl p-4 transition-all duration-300 outline-none hover:border-indigo-300 w-full";

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              TaskFlow Pro 🚀
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Organize. Track. Complete.
            </p>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="mt-4 md:mt-0 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition-all"
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={createTask}
          className={`p-8 rounded-3xl shadow-xl border mb-10 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white/90 border-indigo-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-5">
            {editing
              ? "✏️ Update Task"
              : "➕ Create Task"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="title"
              placeholder="✨ Task Title"
              value={formData.title}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={inputStyle}
            />

            <textarea
              rows="4"
              name="description"
              placeholder="📝 Task Description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputStyle} md:col-span-2`}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputStyle}
            >
              <option>Study</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Health</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={inputStyle}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
                <div className="md:col-span-2">
  <label className="block mb-2 font-medium">
    Progress: {formData.progress}%
  </label>

  <input
    type="range"
    min="0"
    max="100"
    step="10"
    name="progress"
    value={formData.progress}
    onChange={handleChange}
    className="w-full accent-indigo-600"
  />
</div>
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] shadow-lg transition-all"
            >
              {editing
                ? "Update Task"
                : "Add Task"}
            </button>

          </div>
        </form>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">

          {[
            {
              title: "Total",
              value: tasks.length,
            },
            {
              title: "Completed",
              value: tasks.filter(
                (t) =>
                  t.status === "Completed"
              ).length,
            },
            {
              title: "Pending",
              value: tasks.filter(
                (t) =>
                  t.status === "Pending"
              ).length,
            },
            {
              title: "High Priority",
              value: tasks.filter(
                (t) =>
                  t.priority === "High" ||
                  t.priority === "Urgent"
              ).length,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-3xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            >
              <p className="text-gray-500">
                {item.title}
              </p>
              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div
          className={`p-4 rounded-3xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="🔍 Search Tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border-2 border-cyan-100 rounded-xl p-4 focus:ring-4 focus:ring-cyan-200 outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border-2 border-indigo-100 rounded-xl p-4"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        
        {/* Task Cards */}
        <div className="grid md:grid-cols-3 gap-5">

          {tasks
            .filter((task) =>
              task.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((task) =>
              statusFilter === "All"
                ? true
                : task.status === statusFilter
            )
            .map((task) => (
              <div
                key={task._id}
                className={`rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              >
                <h2 className="font-bold text-xl mb-2">
                  {task.title}
                </h2>

                <p className="text-gray-500 mb-4">
                  {task.description}
                </p>

                <div className="flex justify-between mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {task.priority}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {task.status}
                  </span>
                </div>

                <p className="mb-2">
                  📂 {task.category}
                </p>

                <p className="mb-4">
                  📅{" "}
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full"
                    style={{
                      width: `${task.progress}%`,
                    }}
                  />
                </div>

                <p className="text-sm mt-2">
                  {task.progress}% Complete
                </p>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() =>
                      editTask(task)
                    }
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl hover:scale-105 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 text-white py-2 rounded-xl hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;