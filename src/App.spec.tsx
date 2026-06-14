import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("<App />", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the heading", () => {
    render(<App />);
    expect(screen.getByText("Shopping List")).toBeInTheDocument();
  });

  it("shows the empty state when there are no items", () => {
    render(<App />);
    expect(screen.getByText("Your list is empty.")).toBeInTheDocument();
  });

  it("adds an item and displays it in the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByTestId("input");
    await user.type(input, "apples");
    await user.click(screen.getByTestId("add-item-button"));

    expect(screen.getByText("apples")).toBeInTheDocument();
  });

  it("persists items to localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByTestId("input");
    await user.type(input, "bread");
    await user.click(screen.getByTestId("add-item-button"));

    const stored = JSON.parse(localStorage.getItem("shopping-list") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("bread");
  });

  it("loads items from localStorage on mount", () => {
    const existingItems = [{ id: "1", name: "Bananas", checked: false }];
    localStorage.setItem("shopping-list", JSON.stringify(existingItems));

    render(<App />);

    expect(screen.getByText("Bananas")).toBeInTheDocument();
  });

  it("deletes an item and removes it from localStorage", async () => {
    const existingItems = [{ id: "1", name: "Bananas", checked: false }];
    localStorage.setItem("shopping-list", JSON.stringify(existingItems));

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByTestId("delete-item-button"));

    expect(screen.queryByText("Bananas")).not.toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem("shopping-list") || "[]");
    expect(stored).toHaveLength(0);
  });
});
