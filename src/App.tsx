import type { ShoppingItem } from "./types";
import { ShoppingList } from "./components/ShoppingList";

const sampleItems: ShoppingItem[] = [
  { id: "1", name: "Apples", checked: false },
  { id: "2", name: "Bread", checked: false },
];

function App() {
  return (
    <div className='app'>
      <h1>Shopping List</h1>
      <ShoppingList items={sampleItems} />
    </div>
  );
}

export default App;
