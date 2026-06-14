import type { ShoppingItem as ShoppingItemType } from "../types";
import "./ShoppingItem.css";

type Props = {
  item: ShoppingItemType;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
};

export const ShoppingItem = ({
  item,
  onDelete,
  onToggle,
  onMove,
  isFirst,
  isLast,
}: Props) => {
  return (
    <li className='shopping-item'>
      <label className='shopping-item-label'>
        <input
          type='checkbox'
          checked={item.checked}
          onChange={() => onToggle(item.id)}
          data-testid='toggle-item-checkbox'
          className='shopping-item-checkbox'
        />
        <span
          style={{ textDecoration: item.checked ? "line-through" : "none" }}
        >
          {item.name}
        </span>
      </label>
      <button
        onClick={() => onMove(item.id, "up")}
        disabled={isFirst}
        data-testid='move-up-button'
        aria-label={`Move ${item.name} up`}
      >
        ↑
      </button>
      <button
        onClick={() => onMove(item.id, "down")}
        disabled={isLast}
        data-testid='move-down-button'
        aria-label={`Move ${item.name} down`}
      >
        ↓
      </button>
      <button
        onClick={() => onDelete(item.id)}
        data-testid='delete-item-button'
      >
        Delete
      </button>
    </li>
  );
};
