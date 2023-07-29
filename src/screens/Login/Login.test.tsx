import React from "react";
import Login from "./Login";
import { act, fireEvent, render } from "../../test/test-utils";
import { LoginScreenProps } from "./types";
import * as auth from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  useAuth: jest.fn(() => ({
    signIn: jest.fn(),
    logout: jest.fn(),
  })),
}));

describe("Login screen", () => {
  const navigation = {
    setOptions: jest.fn(),
  } as unknown as LoginScreenProps["navigation"];

  const route = {
    params: undefined,
  } as unknown as LoginScreenProps["route"];

  const signInMocked = jest.fn();
  const logoutMocked = jest.fn();

  beforeEach(() => {
    jest.spyOn(auth, "useAuth").mockReturnValue({
      signIn: signInMocked,
      logout: logoutMocked,
    });
  });

  afterEach(() => {
    signInMocked.mockReset();
  });

  it("renders screen, and email and password fields correctly", () => {
    const { getByTestId, toJSON } = render(
      <Login navigation={navigation} route={route} />
    );

    expect(getByTestId("email-label")).toBeTruthy();
    expect(getByTestId("email-input")).toBeTruthy();

    expect(getByTestId("password-label")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it("should prevent sign in if it has an invalid field", async () => {
    const { getByTestId } = render(
      <Login navigation={navigation} route={route} />
    );

    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });

    expect(signInMocked).toHaveBeenCalledTimes(0);
  });

  it("should sign in", async () => {
    const { getByTestId, getByText } = render(
      <Login navigation={navigation} route={route} />
    );

    fireEvent.changeText(getByTestId("email-input"), "admin@admin.com");
    fireEvent.changeText(getByTestId("password-input"), "qwe123");

    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
    });

    expect(signInMocked).toHaveBeenCalledTimes(1);
    expect(signInMocked).toHaveBeenNthCalledWith(1, {
      email: "admin@admin.com",
      password: "qwe123",
    });
  });
});
