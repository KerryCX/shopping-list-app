import type { ShoppingItem as ShoppingItemType } from "../types";
import { ShoppingItem } from "./ShoppingItem";

type Props = {
  items: ShoppingItemType[];
  onDelete: (id: string) => void;
};

export const ShoppingList = ({ items, onDelete }: Props) => {
  if (items.length === 0) {
    return <p>Your list is empty.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <ShoppingItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
};
