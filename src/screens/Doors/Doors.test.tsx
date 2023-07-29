import React from "react";
import Doors from "./Doors";
import { fireEvent, render, waitFor } from "../../test/test-utils";
import { DoorsScreenProps } from "./types";

jest.mock("../../hooks/useProfile", () => ({
  useProfile: () => ({
    allUserSalas: jest.fn().mockResolvedValue([
      {
        numero: "101",
        name: "Sala 101",
        status: "ativo",
      },
      {
        numero: "102",
        name: "Sala 102",
        status: "inativo",
      },
    ]),
  }),
}));

jest.mock("../../hooks/useSalaAuth", () => ({
  useSalaAuth: () => ({
    openSala: jest.fn().mockResolvedValue(undefined),
  }),
}));

const navigation = {
  setOptions: jest.fn(),
} as unknown as DoorsScreenProps["navigation"];

const route = {
  params: undefined,
} as unknown as DoorsScreenProps["route"];

describe("Doors screen", () => {
  it("renders the list of salas correctly", async () => {
    const { getByTestId, getByText, toJSON } = render(
      <Doors navigation={navigation} route={route} />
    );

    await waitFor(() => getByTestId("sala-items"));

    expect(getByText("Sala 101 / 101")).toBeTruthy();
    expect(getByText("ATIVO")).toBeTruthy();

    expect(getByText("Sala 102 / 102")).toBeTruthy();
    expect(getByText("INATIVO")).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it("opens the alert when a sala is pressed and handles opening sala", async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Doors navigation={navigation} route={route} />
    );
    await waitFor(() => getByTestId("sala-items"));

    fireEvent.press(getByText("Sala 101 / 101"));

    expect(getByText("Fechar sala 101?")).toBeTruthy();
    expect(
      getByText("Isto vai alterar o estado da sala para fechada")
    ).toBeTruthy();

    fireEvent.press(getByTestId("button-alert"));

    await waitFor(() => expect(queryByTestId("alert")).toBeNull());
  });

  test("opens the alert when a sala is pressed and handles closing sala", async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Doors navigation={navigation} route={route} />
    );

    await waitFor(() => getByTestId("sala-items"));

    fireEvent.press(getByText("Sala 102 / 102"));

    expect(getByText("Abrir sala 102?")).toBeTruthy();
    expect(
      getByText("Isto vai alterar o estado da sala para aberta")
    ).toBeTruthy();

    fireEvent.press(getByTestId("button-alert"));

    await waitFor(() => expect(queryByTestId("alert")).toBeNull());
  });
});
