import { renderHook, act } from "@testing-library/react-hooks";
import { ProvideAuth, useAuth } from "./useAuth";
import { api } from "../services/api/api";
import jwt_decode from "jwt-decode";
import React from "react";

jest.mock("jwt-decode");

jest.mock("../services/api/api");

describe("useAuth tests", () => {
  jest.spyOn(React, "useEffect").mockImplementation(() => {});
  let wrapper: React.FC;
  beforeAll(() => {
    wrapper = ({ children }) => <ProvideAuth>{children}</ProvideAuth>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be logged out by default", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBe(false);
  });

  it("should login a user", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper,
    });
    const response = {
      data: {
        refresh:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…zdCJ9.V90pZR3iCAt0hjlu3M3modCNeuJNamicXo1YaFnBBBo",
        access:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…N0In0.PKUxtzZLmDFDyKpISQa5PrewmucJ9p51bK9EZFnRLEg",
      },
    };
    // @ts-ignore
    api.post.mockResolvedValue(response);
    // @ts-ignore
    jwt_decode.mockReturnValue({
      username: "test",
      user_id: 1,
      exp: Date.now() / 1000 + 100,
    });

    const user = {
      email: "test@gmail.com",
      password: "test",
    };

    result.current.signIn(user.email, user.password, () => {});

    await waitForNextUpdate();

    expect(result.current.user).toMatchObject({
      username: "test",
    });
  });

  it("should register a user", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper,
    });
    // expected response
    const user = {
      username: "test",
      email: "test@gmail.com",
      password: "test",
    };
    const response = {
      data: {
        refresh:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…zdCJ9.29gYJZwIB9OwxoUXELZtnqdRZeH2KmNFUa9WEAyezmg",
        access:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…N0In0.MSJHeiku0h9sVCVxlchrSKygQuBvoECYg4GKFT9JV5U",
      },
    };
    // @ts-ignore
    api.post.mockResolvedValue(response);
    // @ts-ignore
    jwt_decode.mockReturnValue({
      username: "test",
      user_id: 1,
      exp: Date.now() / 1000 + 100,
    });

    result.current.register(user.username, user.email, user.password, () => {});

    await waitForNextUpdate();

    expect(result.current.user).toMatchObject({
      username: "test",
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
