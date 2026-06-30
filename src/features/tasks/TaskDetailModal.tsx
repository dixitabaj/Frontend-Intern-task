import type { Task } from "../../types";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function TaskDetailModal({ task, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h2>
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-4 ${
            task.status === "completed"
              ? "bg-success-50 text-success-600"
              : "bg-warning-50 text-warning-600"
          }`}
        >
          {task.status}
        </span>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Description</dt>
            <dd className="text-gray-900 text-right">{task.description ?? "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Due Date</dt>
            <dd className="text-gray-900">{task.dueDate ?? "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Priority</dt>
            <dd className="text-gray-900">{task.priority ?? "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Source</dt>
            <dd className="text-gray-900 capitalize">{task.source}</dd>
          </div>
        </dl>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
