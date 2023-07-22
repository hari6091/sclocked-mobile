import React from "react";
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./src/contexts";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
