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

  return (
    <div className='app'>
      <h1>Shopping List</h1>
      <AddItem onAdd={addItem} existingItems={items} />
      <ShoppingList items={items} />
    </div>
  );
}

export default App;
