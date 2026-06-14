import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShoppingItem } from "./ShoppingItem";

describe("<ShoppingItem />", () => {
  it("renders the item name", () => {
    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={() => {}}
      />,
    );

    expect(screen.getByText("Apples")).toBeInTheDocument();
  });

  it("calls onDelete with the item id when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={onDelete}
        onToggle={() => {}}
      />,
    );

    await user.click(screen.getByTestId("delete-item-button"));

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("calls onToggle with the item id when checkbox is clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={onToggle}
      />,
    );

    await user.click(screen.getByTestId("toggle-item-checkbox"));

    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("reflects the checked state of the item", () => {
    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: true }}
        onDelete={() => {}}
        onToggle={() => {}}
      />,
    );

    const checkbox = screen.getByTestId("toggle-item-checkbox");
    expect(checkbox).toBeChecked();
  });
});
