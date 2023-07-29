import React from "react";
import UserHeader from "./UserHeader";
import { render } from "../../test/test-utils";

jest.mock("../../hooks", () => ({
  useProfile: jest.fn(() => ({
    profile: {
      name: "John Doe",
      matricula: "12345",
    },
  })),
}));

describe("UserHeader", () => {
  it("renders without errors", () => {
    const tree = render(<UserHeader />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("displays profile name correctly", () => {
    const { getByTestId, getByText } = render(<UserHeader />);
    const nameElement = getByTestId("username");
    const nameElementText = getByText("John Doe");

    expect(nameElement).toBeTruthy();
    expect(nameElementText).toBeTruthy();
  });

  it("displays profile matricula correctly", () => {
    const { getByTestId, getByText } = render(<UserHeader />);
    const matriculaElement = getByTestId("matricula");
    const matriculaElementText = getByText("12345");

    expect(matriculaElement).toBeTruthy();
    expect(matriculaElementText).toBeTruthy();
  });
});
