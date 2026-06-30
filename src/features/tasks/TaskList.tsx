import { Check, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-green-50 text-green-600",
};

export default function TaskList({
  tasks,
  page,
  totalPages,
  onPageChange,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-sm">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-y border-gray-100 bg-gray-50 text-left text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-4 py-3 font-medium w-8">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Priority</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">User</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-400 text-xs">{(page - 1) * 10 + index + 1}</td>

                <td className="px-4 py-3 max-w-[200px] sm:max-w-xs">
                  <p
                    className={`truncate ${
                      task.status === "completed" ? " text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      task.status === "completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <Check size={10} strokeWidth={3} />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    )}
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  {task.priority ? (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        PRIORITY_STYLES[task.priority] ?? "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>

                <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
                  User {task.userId}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onSelect(task)}
                      className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      <Eye size={12} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      onClick={() => onEdit(task)}
                      className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      <Pencil size={12} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(task)}
                      className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    >
                      <Trash2 size={12} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`w-7 h-7 text-xs rounded-md border transition-colors ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600 font-medium"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
