import { useState } from "react";
import type { ShoppingItem } from "./types";
import { AddItem } from "./components/AddItem";
import { ShoppingList } from "./components/ShoppingList";

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = (name: string) => {
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name,
      checked: false,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <div className='app'>
      <h1>Shopping List</h1>
      <AddItem onAdd={addItem} existingItems={items} />
      <ShoppingList items={items} onDelete={deleteItem} onToggle={toggleItem} />
    </div>
  );
}

export default App;
