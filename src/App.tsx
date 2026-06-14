import type { ShoppingItem } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AddItem } from "./components/AddItem";
import { ShoppingList } from "./components/ShoppingList";
import "./App.css";

function App() {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>(
    "shopping-list",
    [],
  );

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

  const moveItem = (id: string, direction: "up" | "down") => {
    setItems((prev) => {
      // Find the current position of the item being moved
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev; // item not found, nothing to do

      // Work out where it should end up
      const newIndex = direction === "up" ? index - 1 : index + 1;

      // If moving up from the top, or down from the bottom, do nothing
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      // Copy the array so we don't mutate state directly
      const newItems = [...prev];

      // Remove the item from its current position
      // splice(index, 1) removes 1 element starting at `index`
      // and returns it as an array, so we destructure it out
      const [movedItem] = newItems.splice(index, 1);

      // Insert the item back into the array at its new position
      // splice(newIndex, 0, movedItem) inserts without removing anything
      newItems.splice(newIndex, 0, movedItem);

      return newItems;
    });
  };

  return (
    <div className='app'>
      <h1>Shopping List</h1>
      <AddItem onAdd={addItem} existingItems={items} />
      <ShoppingList
        items={items}
        onDelete={deleteItem}
        onToggle={toggleItem}
        onMove={moveItem}
      />
    </div>
  );
}

export default App;
