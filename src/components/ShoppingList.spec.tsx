import { render, screen } from "@testing-library/react";
import { ShoppingList } from "./ShoppingList";
import { describe, it, expect } from "vitest";

describe("<ShoppingList />", () => {
  it("renders a list of items", () => {
    render(
      <ShoppingList
        items={[
          { id: "1", name: "Apples", checked: false },
          { id: "2", name: "Bread", checked: false },
        ]}
      />,
    );

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
  });

  it("shows a message when the list is empty", () => {
    render(<ShoppingList items={[]} />);

    expect(screen.getByText("Your list is empty.")).toBeInTheDocument();
  });
});
