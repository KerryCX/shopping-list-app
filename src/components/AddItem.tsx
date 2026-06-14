import { useState } from "react";
import type { ShoppingItem } from "../types";
import "./AddItem.css";

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
    <div className='add-item'>
      <div className='add-item-row'>
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
      </div>
      {error && (
        <p className='add-item-error' data-testid='error-message'>
          {error}
        </p>
      )}
    </div>
  );
};
