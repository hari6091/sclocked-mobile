import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { screens } from "../constants";
import { RootStackParamList } from "./types";
import { Login } from "../screens";
import { useAuth } from "../hooks";
import MainTabScreen from "./MainTabScreen";

export const MainStack = createStackNavigator<RootStackParamList>();

export const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <MainStack.Navigator>
      {token ? (
        <MainStack.Group>
          <MainStack.Screen
            name={screens.MAIN}
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen
            name={screens.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
};
