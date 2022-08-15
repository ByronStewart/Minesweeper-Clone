import { renderHook, act } from "@testing-library/react-hooks";
import { json } from "stream/consumers";
import { ProvideAuth, useAuth } from "./useAuth";

// @ts-ignore
// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve({
//     access: "sdfdsf",
//     refresh: "sdfsdf"
//   }),
//   ok: true
// }))

describe("useAuth tests", () => {
  let wrapper: React.FC;
  beforeAll(() => {
    wrapper = ({ children }) => <ProvideAuth>{children}</ProvideAuth>;
  });

  afterEach(()=> {
    jest.resetAllMocks()
  })

  it("should be logged out by default", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBe(false);
  });

  // need mock api
  it.only("should login a user", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper,
    });

    result.current.signIn("bob9@test.com", "bob9", () => {});

    const user = {
      email: "test@gmail.com",
      password: "test"
    }
    // expected response
    const response = {refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…zdCJ9.V90pZR3iCAt0hjlu3M3modCNeuJNamicXo1YaFnBBBo', access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…N0In0.PKUxtzZLmDFDyKpISQa5PrewmucJ9p51bK9EZFnRLEg'}

    await waitForNextUpdate({
      timeout: 100,
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

    // expected response
    const user = {
      username: "test",
      email: "test@gmail.com",
      password: "test"
    }
    const response = {refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…zdCJ9.29gYJZwIB9OwxoUXELZtnqdRZeH2KmNFUa9WEAyezmg', access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…N0In0.MSJHeiku0h9sVCVxlchrSKygQuBvoECYg4GKFT9JV5U'}
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
