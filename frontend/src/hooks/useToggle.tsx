import { useEffect, useState } from "react"

/**
 * Provides a way to hold boolean state and toggle that state
 * @param initialState
 * @returns state, toggle function, set false function, set true function
 */
export const useToggle = (
  initialState = false
): [boolean, VoidFunction, VoidFunction, VoidFunction] => {
  const [state, setState] = useState(initialState)
  const toggleState = () => setState((state) => !state)
  const setStateFalse = () => setState(false)
  const setStateTrue = () => setState(true)
  return [state, toggleState, setStateFalse, setStateTrue]
}
