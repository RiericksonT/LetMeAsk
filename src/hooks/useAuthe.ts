import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuthe() {
  const value = useContext(AuthContext)

  return value;
}