import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useTasks } from "../features/tasks/useTasks";
import TaskFilters from "../features/tasks/TaskFilters";
import TaskList from "../features/tasks/TaskList";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import EditTaskModal from "../features/tasks/EditTaskModal";
import TaskDetailModal from "../features/tasks/TaskDetailModal";
import DeleteConfirmModal from "../features/tasks/DeleteConfirmModal";
import { TaskChart } from "../features/tasks/components/TaskChart";
import type { Task } from "../types";

export default function DashboardPage() {
  const { logout } = useAuth();
  const {
    tasks,
    isLoading,
    isError,
    search,
    setSearch,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    createTask,
    editTask,
    deleteTask,
  } = useTasks();

  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Task Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg"
          >
            + New Task
          </button>
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{tasks.length}</p>
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

      {/* Chart */}
      {!isLoading && !isError && (
        <div className="mb-6">
          <TaskChart completed={completed} pending={pending} />
        </div>
      )}

      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      {isLoading && (
        <p className="text-gray-400 text-center py-12">Loading tasks...</p>
      )}
      {isError && (
        <p className="text-red-600 text-center py-12">
          Failed to load tasks. Please try again.
        </p>
      )}

      {!isLoading && !isError && (
        <TaskList
          tasks={tasks}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelect={setSelectedTask}
          onEdit={setEditingTask}
          onDelete={setDeletingTask}
        />
      )}

      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreate={(input) => createTask.mutate(input)}
          isPending={createTask.isPending}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(id, input) => editTask.mutate({ id, input })}
          isPending={editTask.isPending}
        />
      )}

      {deletingTask && (
        <DeleteConfirmModal
          title={deletingTask.title}
          onClose={() => setDeletingTask(null)}
          onConfirm={() => {
            deleteTask.mutate(deletingTask.id);
            setDeletingTask(null);
          }}
          isPending={deleteTask.isPending}
        />
      )}
    </div>
  );
}
