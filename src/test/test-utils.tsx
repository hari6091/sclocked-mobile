import { NavigationContainer } from "@react-navigation/native";
import { render as rtlRender } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import React from "react";

import { AuthProvider } from "../contexts";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function render(
  ui: React.ReactElement,
  {
    //@ts-ignore
    preloadedState,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <AuthProvider>{children}</AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react-native";
export { render };
