import { tasksClient } from "./tasksClient";
import type { RemoteTodo, Task } from "../types";

function mapRemoteTodoToTask(todo: RemoteTodo): Task {
  return {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    status: todo.completed ? "completed" : "pending",
    source: "remote",
  };
}

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await tasksClient.get<RemoteTodo[]>("/todos");
  return data.map(mapRemoteTodoToTask);
}
