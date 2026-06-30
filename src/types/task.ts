/**
 * Raw shape returned by JSONPlaceholder's /todos endpoint.
 * https://jsonplaceholder.typicode.com/todos
 */
export interface RemoteTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type TaskStatus = "completed" | "pending";

export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  userId: number;
  title: string;
  status: TaskStatus;
  description?: string;
  dueDate?: string; // ISO date string, e.g. "2026-07-01"
  priority?: TaskPriority;
  source: "remote" | "local";
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
}

export interface EditTaskInput {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export type TaskFilter = "all" | "completed" | "pending";
