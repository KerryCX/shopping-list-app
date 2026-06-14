import type { ShoppingItem as ShoppingItemType } from "../types";
import { ShoppingItem } from "./ShoppingItem";
import "./ShoppingList.css";

type Props = {
  items: ShoppingItemType[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

export const ShoppingList = ({ items, onDelete, onToggle, onMove }: Props) => {
  if (items.length === 0) {
    return <p className='shopping-list-empty'>Your list is empty.</p>;
  }

  return (
    <ul className='shopping-list'>
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
