import type { ShoppingItem as ShoppingItemType } from "../types";

type Props = {
  item: ShoppingItemType;
  onDelete: (id: string) => void;
};

export const ShoppingItem = ({ item, onDelete }: Props) => {
  return (
    <li>
      <span>{item.name}</span>
      <button
        onClick={() => onDelete(item.id)}
        data-testid='delete-item-button'
      >
        Delete
      </button>
    </li>
  );
};
