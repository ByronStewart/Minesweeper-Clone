import { renderHook, act } from "@testing-library/react-hooks";
import { ProvideAuth, useAuth } from "./useAuth";

describe.skip("useAuth tests", () => {
  let wrapper: React.FC;
  beforeAll(() => {
    wrapper = ({ children }) => <ProvideAuth>{children}</ProvideAuth>;
  });

  it("should be logged out by default", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBe(false);
  });

  // need mock api
  it("should login a user", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper,
    });

    result.current.signIn("bob9@test.com", "bob9", () => {});

    await waitForNextUpdate({
      timeout: 5000,
    });
    expect(result.current.user).toMatchObject({
      username: "bob9",
    });
  });

  // need mock api
  it("should register a user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.register("billy", "billy@gmail.com", "abcd", () => {});
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
