import type { Task } from "../../types";

interface Props {
  tasks: Task[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskList({ tasks, page, totalPages, onPageChange, onSelect, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-lg">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-brand-300 transition-colors"
        >
          <button onClick={() => onSelect(task)} className="text-left flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  task.status === "completed"
                    ? "bg-success-50 text-success-600"
                    : "bg-warning-50 text-warning-600"
                }`}
              >
                {task.status}
              </span>
              {task.priority && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                  {task.priority}
                </span>
              )}
            </div>
          </button>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task)}
              className="text-xs font-medium text-danger-600 hover:text-danger-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-4">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="text-sm font-medium text-gray-600 disabled:text-gray-300 hover:text-gray-900"
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="text-sm font-medium text-gray-600 disabled:text-gray-300 hover:text-gray-900"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
