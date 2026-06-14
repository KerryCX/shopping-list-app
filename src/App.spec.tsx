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

  it("reorders items when move up/down buttons are clicked", async () => {
    const existingItems = [
      { id: "1", name: "Apples", checked: false },
      { id: "2", name: "Bread", checked: false },
      { id: "3", name: "Carrots", checked: false },
    ];
    localStorage.setItem("shopping-list", JSON.stringify(existingItems));

    const user = userEvent.setup();
    render(<App />);

    // Move "Bread" (second item) up — should swap with "Apples"
    const upButtons = screen.getAllByTestId("move-up-button");
    await user.click(upButtons[1]);

    let items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Bread");
    expect(items[1]).toHaveTextContent("Apples");
    expect(items[2]).toHaveTextContent("Carrots");

    // Move "Apples" (now at index 1) back up — should swap with "Bread"
    const upButtonsAfter = screen.getAllByTestId("move-up-button");
    await user.click(upButtonsAfter[1]);

    items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Apples");
    expect(items[1]).toHaveTextContent("Bread");
    expect(items[2]).toHaveTextContent("Carrots");
  });

  it("persists the new order to localStorage after reordering", async () => {
    const existingItems = [
      { id: "1", name: "Apples", checked: false },
      { id: "2", name: "Bread", checked: false },
    ];
    localStorage.setItem("shopping-list", JSON.stringify(existingItems));

    const user = userEvent.setup();
    render(<App />);

    const upButtons = screen.getAllByTestId("move-up-button");
    await user.click(upButtons[1]);

    const stored = JSON.parse(localStorage.getItem("shopping-list") || "[]");
    expect(stored[0].name).toBe("Bread");
    expect(stored[1].name).toBe("Apples");
  });
});
