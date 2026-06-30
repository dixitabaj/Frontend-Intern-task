import { tasksClient } from "./tasksClient";
import type { RemoteTodo, Task } from "../types";

const PRIORITIES = ["low", "medium", "high"] as const;

function mapRemoteTodoToTask(todo: RemoteTodo): Task {
  return {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    status: todo.completed ? "completed" : "pending",
    priority: PRIORITIES[todo.id % 3],
    source: "remote",
  };
}

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await tasksClient.get<RemoteTodo[]>("/todos");
  return data.map(mapRemoteTodoToTask);
}