import { useState } from "react";
import type { ShoppingItem } from "../types";

type Props = {
  onAdd: (name: string) => void;
  existingItems: ShoppingItem[];
};

export const AddItem = ({ onAdd, existingItems }: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();

    if (trimmed === "") {
      setError("Please enter an item");
      return;
    }

    const isDuplicate = existingItems.some(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
    );

    if (isDuplicate) {
      setError(`${trimmed} is already on your list`);
      return;
    }

    onAdd(trimmed);
    setValue("");
    setError("");
  };

  return (
    <div>
      <input
        type='text'
        placeholder='e.g. bananas'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid='input'
      />
      <button onClick={handleAdd} data-testid='add-item-button'>
        Add
      </button>
      {error && <p data-testid='error-message'>{error}</p>}
    </div>
  );
};
