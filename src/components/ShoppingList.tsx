import type { ShoppingItem } from "../types";

type Props = {
  items: ShoppingItem[];
};

export const ShoppingList = ({ items }: Props) => {
  if (items.length === 0) {
    return <p>Your list is empty.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
