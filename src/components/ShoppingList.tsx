import type { ShoppingItem as ShoppingItemType } from "../types";
import { ShoppingItem } from "./ShoppingItem";

type Props = {
  items: ShoppingItemType[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

export const ShoppingList = ({ items, onDelete, onToggle, onMove }: Props) => {
  if (items.length === 0) {
    return <p>Your list is empty.</p>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <ShoppingItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
          onMove={onMove}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </ul>
  );
};
