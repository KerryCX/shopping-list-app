import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShoppingList } from "./ShoppingList";

describe("<ShoppingList />", () => {
  it("renders a list of items", () => {
    render(
      <ShoppingList
        items={[
          { id: "1", name: "Apples", checked: false },
          { id: "2", name: "Bread", checked: false },
        ]}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
  });

  it("shows a message when the list is empty", () => {
    render(<ShoppingList items={[]} onDelete={() => {}} />);

    expect(screen.getByText("Your list is empty.")).toBeInTheDocument();
  });

  it("calls onDelete with the correct id when delete is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <ShoppingList
        items={[{ id: "1", name: "Apples", checked: false }]}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByTestId("delete-item-button"));

    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
