import { renderHook, act } from "@testing-library/react-hooks";
import { ProvideAuth, useAuth } from "../useAuth";

describe("useAuth hook tests", () => {
  let wrapper: React.FC;
  beforeAll(() => {
    wrapper = ({ children }) => <ProvideAuth>{children}</ProvideAuth>;
  });

  it("should be logged out by default", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBe(false);
  });

  it("should login a user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.signIn("billy", "abcd");
    });
    expect(result.current.user).toStrictEqual({
      username: "Billy",
      id: 1,
    });
  });

  it("should register a user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.register("billy", "abcd");
    });
    expect(result.current.user).toStrictEqual({
      username: "Bob",
      id: 2,
    });
  });

  it("should logout a user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.signOut();
    });
    expect(result.current.user).toBe(false);
  });
});
