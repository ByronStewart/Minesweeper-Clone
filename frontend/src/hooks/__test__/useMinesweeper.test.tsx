import { store } from "../../store"
import { Provider } from "react-redux"
import { act, renderHook } from "@testing-library/react-hooks"
import { ProvideMinesweeper, useMinesweeper } from "../useMinesweeper"

// describe("useMinesweeper tests", () => {
//   let wrapper: React.FC
//   beforeAll(() => {
//     wrapper = ({ children }) => (
//       <Provider store={store}>
//         <ProvideMinesweeper>{children}</ProvideMinesweeper>
//       </Provider>
//     )
//   })

//   it("works", () => {
//     const { result } = renderHook(() => useMinesweeper(), { wrapper })
//     act(() => {
//       result.current.revealTile(0, 0)
//     })
//   })
// })
