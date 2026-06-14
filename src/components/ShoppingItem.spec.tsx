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
        onMove={() => {}}
        isFirst={false}
        isLast={false}
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
        onMove={() => {}}
        isFirst={false}
        isLast={false}
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
        onMove={() => {}}
        isFirst={false}
        isLast={false}
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
        onMove={() => {}}
        isFirst={false}
        isLast={false}
      />,
    );

    const checkbox = screen.getByTestId("toggle-item-checkbox");
    expect(checkbox).toBeChecked();
  });

  it('calls onMove with "up" when the move up button is clicked', async () => {
    const onMove = vi.fn();
    const user = userEvent.setup();

    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={() => {}}
        onMove={onMove}
        isFirst={false}
        isLast={false}
      />,
    );

    await user.click(screen.getByTestId("move-up-button"));

    expect(onMove).toHaveBeenCalledWith("1", "up");
  });

  it('calls onMove with "down" when the move down button is clicked', async () => {
    const onMove = vi.fn();
    const user = userEvent.setup();

    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={() => {}}
        onMove={onMove}
        isFirst={false}
        isLast={false}
      />,
    );

    await user.click(screen.getByTestId("move-down-button"));

    expect(onMove).toHaveBeenCalledWith("1", "down");
  });

  it("disables the move up button when isFirst is true", () => {
    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={() => {}}
        onMove={() => {}}
        isFirst={true}
        isLast={false}
      />,
    );

    expect(screen.getByTestId("move-up-button")).toBeDisabled();
  });

  it("disables the move down button when isLast is true", () => {
    render(
      <ShoppingItem
        item={{ id: "1", name: "Apples", checked: false }}
        onDelete={() => {}}
        onToggle={() => {}}
        onMove={() => {}}
        isFirst={false}
        isLast={true}
      />,
    );

    expect(screen.getByTestId("move-down-button")).toBeDisabled();
  });
});
