import type { ShoppingItem as ShoppingItemType } from "../types";

type Props = {
  item: ShoppingItemType;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export const ShoppingItem = ({ item, onDelete, onToggle }: Props) => {
  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={item.checked}
          onChange={() => onToggle(item.id)}
          data-testid='toggle-item-checkbox'
        />
        <span
          style={{ textDecoration: item.checked ? "line-through" : "none" }}
        >
          {item.name}
        </span>
      </label>
      <button
        onClick={() => onDelete(item.id)}
        data-testid='delete-item-button'
      >
        Delete
      </button>
    </li>
  );
};
