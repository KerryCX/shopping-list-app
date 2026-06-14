import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddItem } from "./AddItem";

describe("<AddItem />", () => {
  it("calls onAdd with the trimmed item name when valid", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();

    render(<AddItem onAdd={onAdd} existingItems={[]} />);

    const input = screen.getByTestId("input");
    await user.type(input, "  apples  ");
    await user.click(screen.getByTestId("add-item-button"));

    expect(onAdd).toHaveBeenCalledWith("apples");
    expect(input).toHaveValue("");
  });

  it("shows an error and does not call onAdd when input is empty", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();

    render(<AddItem onAdd={onAdd} existingItems={[]} />);

    await user.click(screen.getByTestId("add-item-button"));

    expect(screen.getByText("Please enter an item")).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("shows an error and does not call onAdd for a duplicate item (case-insensitive)", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();

    render(
      <AddItem
        onAdd={onAdd}
        existingItems={[{ id: "1", name: "Apples", checked: false }]}
      />,
    );

    const input = screen.getByTestId("input");
    await user.type(input, "apples");
    await user.click(screen.getByTestId("add-item-button"));

    expect(
      screen.getByText("apples is already on your list"),
    ).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });
});
