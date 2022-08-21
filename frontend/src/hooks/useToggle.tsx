import { useState } from "react";

/**
 * Provides a way to hold boolean state and toggle that state
 * @param initialState a boolean value which defaults to false
 * @returns {Array} the state, a toggle function, a set false function, a set true function
 */
export const useToggle = (
  initialState = false
): {
  state: boolean;
  toggleState: VoidFunction;
  setStateFalse: VoidFunction;
  setStateTrue: VoidFunction;
} => {
  const [state, setState] = useState(initialState);
  const toggleState = () => setState((state) => !state);
  const setStateFalse = () => setState(false);
  const setStateTrue = () => setState(true);
  return { state, toggleState, setStateFalse, setStateTrue };
};
