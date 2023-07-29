import React from "react";
import Profile from "./Profile";
import { render, fireEvent, act } from "../../test/test-utils";
import { ProfileScreenProps } from "./types";
import { useAuth, useProfile } from "../../hooks";
import { screens } from "../../constants";

jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useProfile");

describe("Profile screen", () => {
  const navigation = {
    setOptions: jest.fn(),
    navigate: jest.fn(),
  } as unknown as ProfileScreenProps["navigation"];

  const route = {
    params: undefined,
  } as unknown as ProfileScreenProps["route"];

  beforeAll(() => {
    const logoutMock = jest.fn();
    const mockProfile = {
      name: "John Doe",
      disciplinaOUcargo: "Professor",
      role: "admin",
      createdAt: "2023-07-29T12:34:56",
    };

    (useAuth as jest.Mock).mockReturnValue({
      logout: logoutMock,
    });

    (useProfile as jest.Mock).mockReturnValue({
      profile: mockProfile,
    });
  });

  it("renders screen, and email and password fields correctly", () => {
    const { getByTestId, toJSON } = render(
      <Profile navigation={navigation} route={route} />
    );

    expect(getByTestId("profile-username")).toBeTruthy();
    expect(getByTestId("profile-cargo")).toBeTruthy();

    expect(getByTestId("profile-data-criado")).toBeTruthy();
    expect(getByTestId("profile-logout-button")).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders user's name correctly", () => {
    const { getByTestId } = render(
      <Profile navigation={navigation} route={route} />
    );
    expect(getByTestId("profile-username")).toHaveTextContent("John Doe");
  });

  it("renders user's role correctly", () => {
    const { getByTestId } = render(
      <Profile navigation={navigation} route={route} />
    );
    expect(getByTestId("profile-cargo")).toHaveTextContent(
      "Professor / Administrador"
    );
  });

  it("renders user's creation date correctly", () => {
    const { getByTestId } = render(
      <Profile navigation={navigation} route={route} />
    );
    expect(getByTestId("profile-data-criado")).toHaveTextContent("29/07/2023");
  });

  it("calls logout function when 'Sair' button is pressed", () => {
    const { getByTestId } = render(
      <Profile navigation={navigation} route={route} />
    );

    const logoutButton = getByTestId("profile-logout-button");

    fireEvent.press(logoutButton);

    expect(useAuth().logout).toHaveBeenCalledTimes(1);
  });
});
