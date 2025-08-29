"use client";
import { useState } from "react";  // React hook to store state

export default function Counter() {
  // useState is like a Python variable that auto-re-renders when it changes
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
