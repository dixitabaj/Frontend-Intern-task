import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "./TaskList";
import type { Task } from "../../types";

const mockTasks: Task[] = [
  {
    id: 1,
    userId: 1,
    title: "Write unit tests",
    status: "pending",
    priority: "High",
    source: "remote",
  },
  {
    id: 2,
    userId: 1,
    title: "Ship the dashboard",
    status: "completed",
    priority: "Medium",
    source: "remote",
  },
];

const noop = () => {};

describe("TaskList", () => {
  it("renders the empty state when there are no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        page={1}
        totalPages={1}
        onPageChange={noop}
        onSelect={noop}
        onEdit={noop}
        onDelete={noop}
      />
    );
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  it("renders a row for each task with its title", () => {
    render(
      <TaskList
        tasks={mockTasks}
        page={1}
        totalPages={1}
        onPageChange={noop}
        onSelect={noop}
        onEdit={noop}
        onDelete={noop}
      />
    );
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
    expect(screen.getByText("Ship the dashboard")).toBeInTheDocument();
  });

  it("shows Completed/Pending status badges correctly", () => {
    render(
      <TaskList
        tasks={mockTasks}
        page={1}
        totalPages={1}
        onPageChange={noop}
        onSelect={noop}
        onEdit={noop}
        onDelete={noop}
      />
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("calls onSelect when the View button is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        page={1}
        totalPages={1}
        onPageChange={noop}
        onSelect={onSelect}
        onEdit={noop}
        onDelete={noop}
      />
    );

    const viewButtons = screen.getAllByText(/view/i);
    await user.click(viewButtons[0]);

    expect(onSelect).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onDelete when the Delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        page={1}
        totalPages={1}
        onPageChange={noop}
        onSelect={noop}
        onEdit={noop}
        onDelete={onDelete}
      />
    );

    const deleteButtons = screen.getAllByText(/delete/i);
    await user.click(deleteButtons[1]);

    expect(onDelete).toHaveBeenCalledWith(mockTasks[1]);
  });

  it("disables the previous-page button on page 1", () => {
    render(
      <TaskList
        tasks={mockTasks}
        page={1}
        totalPages={3}
        onPageChange={noop}
        onSelect={noop}
        onEdit={noop}
        onDelete={noop}
      />
    );
  
  });
});
