import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchTasks } from "../../api/tasksApi";
import type { Task, TaskFilter, CreateTaskInput, EditTaskInput } from "../../types";
import { toast } from "react-toastify";

// Task data hook for loading, filtering, and mutating tasks in the dashboard.
export const TASKS_QUERY_KEY = ["tasks"] as const;

export function useTasks() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const query = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: fetchTasks,
  });

  const allTasks = query.data ?? [];

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.status === "completed") ||
        (filter === "pending" && task.status === "pending");
      return matchesSearch && matchesFilter;
    });
  }, [allTasks, search, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const paginatedTasks = filteredTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createTask = useMutation({
    mutationFn: async (input: CreateTaskInput): Promise<Task> => {
      await new Promise((r) => setTimeout(r, 400));
      return {
        id: (queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) ?? []).reduce((max, t) => Math.max(max, t.id), 0) + 1,
        userId: 1,
        title: input.title,
        status: "pending",
        description: input.description,
        dueDate: input.dueDate,
        priority: input.priority,
        source: "local",
      };
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old = []) => [newTask, ...old]);
      toast.success("Task created successfully");
    },
    onError: () => toast.error("Failed to create task"),
  });

  const editTask = useMutation({
    mutationFn: async ({ id, input }: { id: number; input: EditTaskInput }) => {
      await new Promise((r) => setTimeout(r, 400));
      return { id, input };
    },
    onSuccess: ({ id, input }) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old = []) =>
        old.map((t) =>
          t.id === id
            ? { ...t, title: input.title, status: input.status, priority: input.priority }
            : t
        )
      );
      toast.success("Task updated successfully");
    },
    onError: () => toast.error("Failed to update task"),
  });

  const deleteTask = useMutation({
    mutationFn: async (id: number) => {
      await new Promise((r) => setTimeout(r, 400));
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (old = []) =>
        old.filter((t) => t.id !== id)
      );
      toast.success("Task deleted");
    },
    onError: () => toast.error("Failed to delete task"),
  });

  const resetPage = () => setPage(1);

  return {
    tasks: paginatedTasks,
    allTasks,
    filteredCount: filteredTasks.length,
    isLoading: query.isLoading,
    isError: query.isError,
    search,
    setSearch: (v: string) => {
      setSearch(v);
      resetPage();
    },
    filter,
    setFilter: (v: TaskFilter) => {
      setFilter(v);
      resetPage();
    },
    page,
    setPage,
    totalPages,
    createTask,
    editTask,
    deleteTask,
  };
}