import { useState } from "react";

export function Button() {
  const [num, setState] = useState(0)

  function Contador() {
    setState(num + 1)
  }
  return (
    <button onClick={Contador}>
      Voce Clicou {num} vezes
    </button>
  );
}