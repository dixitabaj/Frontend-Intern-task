import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Task, EditTaskInput } from "../../types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["completed", "pending"]),
  priority: z.enum(["High", "Medium", "Low"]),
});

interface Props {
  task: Task;
  onClose: () => void;
  onSave: (id: number, input: EditTaskInput) => void;
  isPending: boolean;
}

export default function EditTaskModal({ task, onClose, onSave, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      status: task.status,
      priority: task.priority ?? "Medium",
    },
  });

  const onSubmit = (values: EditTaskInput) => {
    onSave(task.id, values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.title && <p className="mt-1 text-sm text-danger-600">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                {...register("priority")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-60 rounded-lg"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
