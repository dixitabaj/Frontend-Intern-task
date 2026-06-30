import { useTasks } from "../features/tasks/useTasks";
import { TaskChart } from "../components/TaskChart";
import Sidebar from "../components/Sidebar";

// Dashboard page that shows task summary metrics and progress charts.
export default function DashboardPage() {
  const { allTasks, isLoading, isError } = useTasks();

  const completed = allTasks.filter((t) => t.status === "completed").length;
  const pending = allTasks.filter((t) => t.status === "pending").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{allTasks.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-500 mt-1">{completed}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-orange-500 mt-1">{pending}</p>
          </div>
        </div>

        {!isLoading && !isError && <TaskChart completed={completed} pending={pending} />}

        {isLoading && <p className="text-gray-400 text-center py-12">Loading tasks...</p>}
        {isError && (
          <p className="text-red-600 text-center py-12">Failed to load tasks. Please try again.</p>
        )}
      </main>
    </div>
  );
}