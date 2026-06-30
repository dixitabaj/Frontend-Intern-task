import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CreateTaskInput } from "../../types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["High", "Medium", "Low"]),
});

interface Props {
  onClose: () => void;
  onCreate: (input: CreateTaskInput) => void;
  isPending: boolean;
}

export default function CreateTaskModal({ onClose, onCreate, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", dueDate: "", priority: "Medium" },
  });

  const onSubmit = (values: CreateTaskInput) => {
    onCreate(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.title && <p className="mt-1 text-sm text-danger-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-danger-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-danger-600">{errors.dueDate.message}</p>
              )}
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
              {isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
