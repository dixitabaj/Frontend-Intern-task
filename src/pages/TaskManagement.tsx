import { useState } from "react";
import { useTasks } from "../features/tasks/useTasks";
import TaskFilters from "../features/tasks/TaskFilters";
import TaskList from "../features/tasks/TaskList";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import EditTaskModal from "../features/tasks/EditTaskModal";
import TaskDetailModal from "../features/tasks/TaskDetailModal";
import DeleteConfirmModal from "../features/tasks/DeleteConfirmModal";
import Sidebar from "../components/Sidebar";
import TaskSkeleton from "../features/tasks/TaskSkeleton";
import type { Task } from "../types";

export default function TasksPage() {
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Tasks</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage and track your work</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            + New task
          </button>
        </div>

        {/* Filters */}
        <TaskFilters
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Table card */}
        <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-xl overflow-hidden">

          {/* States */}
          {isLoading && <TaskSkeleton />}

          {isError && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-sm">Failed to load tasks.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Retry
              </button>
            </div>
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
        </div>
      </main>

      {/* Modals */}
      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreate={(input) => createTask.mutate(input)}
          isPending={createTask.isPending}
        />
      )}

      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
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